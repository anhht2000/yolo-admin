import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const ValidateData = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  console.log('err', error, req.body);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  next();
};
