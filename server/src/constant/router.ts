import { Router } from "express";
import { productRouter, userRouter,optionRouter } from "../router";

interface IRouterConstant {
  path: string;
  router: Router;
}
export const RouterConstant: IRouterConstant[] = [
  { path: "/user", router: userRouter },
  { path: '/option', router: optionRouter},
  { path: "/product", router: productRouter },
];
