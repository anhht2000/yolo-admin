import { Application, json, urlencoded } from 'express';
import { RouterConstant } from '../constant/router';

export class ExpressConfig {
  constructor(app: Application) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
    RouterConstant.forEach((element) => {
      app.use(element.path, element.router);
    });
  }
}
