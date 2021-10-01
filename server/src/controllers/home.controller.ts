import { CommonConfig } from '.';

import { getConnection, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
class HomeController {
  public get() {}
}
const homeController = new HomeController();
export default homeController;
