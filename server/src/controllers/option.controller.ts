import { NextFunction, Request, Response } from "express";

class Option {
  public getAllOption(req: Request, res: Response, next: NextFunction) {}
  public getOneOption(req: Request, res: Response, next: NextFunction) {}
  public deleteOption(req: Request, res: Response, next: NextFunction) {}
  public updateOption(req: Request, res: Response, next: NextFunction) {}

}

const OptionController = new Option();
export default OptionController;
