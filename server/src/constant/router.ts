import { Router } from "express";
import { productRouter, userRouter } from "../router";

interface IRouterConstant {
  path: string;
  router: Router;
}
export const RouterConstant: IRouterConstant[] = [
  { path: "/user", router: userRouter },
  { path: "/product", router: productRouter },
];
