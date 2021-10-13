import { Router } from 'express';
import { homeRouter, optionRouter, productRouter, userRouter } from '../router';

interface IRouterConstant {
  path: string;
  router: Router;
}
export const RouterConstant: IRouterConstant[] = [
  { path: '/users', router: userRouter },
  { path: '/options', router: optionRouter },
  { path: '/products', router: productRouter },
  { path: '/home', router: homeRouter },
];
