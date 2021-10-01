import { Receipt } from './../models/receipt.entity';
import { CommonConfig } from '.';
import { User } from './../models/user.entity';
import { getConnection, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
class UserController {
  public async getAllUser(req: Request, res: Response, next: NextFunction) {
    const { page, limit } = req.query;
    const _page = Number(page) || CommonConfig.DEFAUT_PAGE;
    const _limit = Number(limit) || CommonConfig.DEFAUT_PERPAGE;
    try {
      const count = await getRepository(User).createQueryBuilder('user').getCount();
      const _total = Math.ceil(count / _limit);
      const userList = await getRepository(User)
        .createQueryBuilder('user')
        .skip((_page - 1) * _limit)
        .take(_limit)
        .getMany();

      return res.status(200).json({
        data: userList,
        page: {
          totalPage: _total,
          perPage: _limit,
          currentPage: _page,
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, address, phone } = req.body;
      var hash = await bcrypt.hash(password, CommonConfig.DEFAUTL_SALT);
      const user = await getRepository(User)
        .createQueryBuilder('user')
        .insert()
        .into(User)
        .values({ username, password: hash, address, phone })
        .execute();

      return res.status(200).json({
        success: true,
        message: 'Add successfully',
        data: { username, password, address, phone, ...user.generatedMaps[0] },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Add Fail' });
    }
  }
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      const { username, password, address, phone } = req.body;
      var hash = await bcrypt.hash(password, CommonConfig.DEFAUTL_SALT);
      await getRepository(User)
        .createQueryBuilder('user')
        .update(User)
        .set({ username, password: hash, address, phone })
        .where('id = :id', { id: userId })
        .execute();
      const user = await getRepository(User)
        .createQueryBuilder()
        .where('id = :userId', { userId: userId })
        .getOne();

      return res.status(200).json({
        success: true,
        message: 'Update successfully',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Update Fail' });
    }
  }
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const queryRunner = getConnection().createQueryRunner();
    queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Receipt, { user: userId });
      await queryRunner.manager.delete(User, { id: userId });
      queryRunner.commitTransaction();

      res.json({ success: true, message: 'Delete successfully' });
    } catch (error) {
      queryRunner.rollbackTransaction();
      res.json({ success: false, message: 'Delete fail' });
    } finally {
      queryRunner.release();
      return;
    }
  }
  public async searchUser(req: Request, res: Response, next: NextFunction) {
    const { page, limit, search } = req.query;
    const _page = Number(page) || CommonConfig.DEFAUT_PAGE;
    const _limit = Number(limit) || CommonConfig.DEFAUT_PERPAGE;
    const _search = String(search) || CommonConfig.DEFAUT_SEARCH;
    try {
      const count = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.address like :address', { address: `%${_search}%` })
        .getCount();
      const _total = Math.ceil(count / _limit);
      const userList = await getRepository(User)
        .createQueryBuilder('user')
        .skip((_page - 1) * _limit)
        .take(_limit)
        .where('user.address like :address', { address: `%${_search}%` })
        .getMany();

      return res.status(200).json({
        success: true,
        message: 'Search successfully',
        data: userList,
        page: {
          totalPage: _total,
          perPage: _limit,
          currentPage: _page,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  }
}
const userController = new UserController();
export default userController;
