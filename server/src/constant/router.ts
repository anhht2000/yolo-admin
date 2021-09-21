import { Router } from "express";
import { userRouter } from "../router";

interface IRouterConstant {
  path: string,
  router: Router
}
export const RouterConstant: IRouterConstant[] = [
  { path:'/user',router: userRouter },
]
