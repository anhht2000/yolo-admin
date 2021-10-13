import express from 'express';
import { Application, json, Request, urlencoded } from 'express';
import { RouterConstant } from '../constant/router';
import cors from 'cors';
import path from 'path';
export class ExpressConfig {
  constructor(app: Application) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.static(path.resolve(__dirname, '../../', 'public')))
    RouterConstant.forEach((element) => {
      app.use(element.path, element.router);
    });
  }
}
