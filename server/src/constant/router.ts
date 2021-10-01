import { Router } from 'express';
import { homeRouter, optionRouter, productRouter, userRouter } from '../router';

interface IRouterConstant {
  path: string;
  router: Router;
}
export const RouterConstant: IRouterConstant[] = [
  { path: '/user', router: userRouter },
  { path: '/option', router: optionRouter },
  { path: '/product', router: productRouter },
  { path: '/home', router: homeRouter },
];
