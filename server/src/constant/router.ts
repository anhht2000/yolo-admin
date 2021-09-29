import { Router } from "express";
import { optionRouter, userRouter } from "../router";

interface IRouterConstant {
  path: string,
  router: Router
}
export const RouterConstant: IRouterConstant[] = [
  { path: '/user', router: userRouter },
  { path: '/option', router: optionRouter}
]
