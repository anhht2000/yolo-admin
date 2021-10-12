import { Router } from 'express';
import { homeRouter, optionRouter, productRouter, receiptRouter, userRouter } from '../router';

interface IRouterConstant {
  path: string;
  router: Router;
}
export const RouterConstant: IRouterConstant[] = [
<<<<<<< HEAD
  { path: '/users', router: userRouter },
  { path: '/options', router: optionRouter },
  { path: '/products', router: productRouter },
  { path: '/homes', router: homeRouter },
=======
  { path: '/user', router: userRouter },
  { path: '/option', router: optionRouter },
  { path: '/product', router: productRouter },
  { path: '/home', router: homeRouter },
  { path: '/receipt', router: receiptRouter },
>>>>>>> develop
];
