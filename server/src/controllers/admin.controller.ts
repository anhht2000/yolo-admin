import { CommonConfig } from './index';
import { Admin } from './../models/admin.entity';
import { getManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

class AdminController {
  async logIn(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    try {
      const admin = await getManager().findOne(Admin, {
        select: ['username', 'password'],
        where: { username: username },
      });
      if (!admin) {
        return res.status(500).json({
          success: false,
          message: "Account don't exist",
        });
      }

      const checkPass = await bcrypt.compare(password, admin.password);
      if (!checkPass) {
        return res.status(500).json({
          success: false,
          message: 'Invalid password',
        });
      }
      const token = await jwt.sign(
        {
          iss: 'Tuan Anh',
          sub: admin.username,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getHours() + 3),
        },
        String(process.env.SCREET_KEY)
      );

      return res.status(200).json({
        success: true,
        message: 'Login successfully',
        data: token,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Login Fail' });
    }
  }
  async forgetPass(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.body;
      const admin = await getManager().findOne(Admin, { where: { username: username } });

      if (!admin) {
        return res.status(500).json({
          success: false,
          message: 'Gửi mail thất bại',
        });
      }
      var transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.USER_MAILTRAP,
          pass: process.env.PASS_MAILTRAP,
        },
      });
      const token = await jwt.sign(
        {
          iss: 'Tuan Anh',
          sub: username,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getHours() + 3),
        },
        String(process.env.SCREET_KEY)
      );

      await transporter.sendMail({
        from: `"Admin System 👻"${process.env.USER_GMAIL}`,
        to: `${username}`,
        subject: 'Confirm forget password ✔',
        text: `Click this link to change password: ${process.env.HOST}/change-pass/${token}`,
      });
      return res.status(200).json({
        success: true,
        message: 'Gửi mail thành công',
        data: token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Gửi mail thất bại',
      });
    }
  }
}
const adminController = new AdminController();
export default adminController;
