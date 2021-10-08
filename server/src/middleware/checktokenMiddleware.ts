import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader: string = req.headers['authorization'] as string;
  const token = authHeader?.split(' ')[1];
  try {
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "You can't access to server because no token",
      });
    }
    await jwt.verify(token, String(process.env.SCREET_KEY));
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error['message'],
    });
  }
}
