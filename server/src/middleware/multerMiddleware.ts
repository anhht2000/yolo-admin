import { Request } from 'express';
import path from 'path';
import multer from 'multer';

const storeMulter = multer.diskStorage({
  destination: (req: Request,file: Express.Multer.File, cb) => {
    cb(null, './public')
  },
  filename: (req: Request,file: Express.Multer.File, cb) => {
    const { originalname } = file;
   const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
   cb(null, `${file.fieldname}${Date.now()}${fileExtension}`);
  }
})

export const upload = multer({ storage: storeMulter });
