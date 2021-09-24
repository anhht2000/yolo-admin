import ForgetPass from "../screens/AdminScreens/ForgetPass";
import Login from "../screens/AdminScreens/Login";
import SignUp from "../screens/AdminScreens/SignUp";
import ForgotPasswordEndUser from "../screens/UserScreens/ForgotPassword";
import LoginEndUser from "../screens/UserScreens/Login";
import ProductPage from "../screens/UserScreens/ProductPage";
import ResigterEndUser from "../screens/UserScreens/Resigter";
enum ETYPE {
  ADMIN = "ADMIN",
  USER = "USER",
}

interface IAppRouterConfig {
  name: string;
  path?: string;
  exact?: boolean;
  component?: React.FC<any> | React.FunctionComponent<any>;
  type?: ETYPE;
}
// name => path => component => exact => type
export const AppRouterConfig: IAppRouterConfig[] = [
  {
    name: "HOME",
    path: "/home",
    component: ProductPage,
    exact: true,
    type: ETYPE.USER,
  },
  {
    name: "login",
    path: "/login",
    component: LoginEndUser,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: "resigter",
    path: "/resigter",
    component: ResigterEndUser,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: "forgotpass",
    path: "/forgotpass",
    component: ForgotPasswordEndUser,
    exact: false,
    type: ETYPE.USER,
  },

  // admin

  {
    name: "Forget password",
    path: "/admin/forget-password",
    component: ForgetPass,
    exact: true,
    type: ETYPE.ADMIN,
  },
  {
    name: "login",
    path: "/admin/login",
    component: Login,
    exact: true,
    type: ETYPE.ADMIN,
  },
  {
    name: "Sign Up",
    path: "/admin/sign-up",
    component: SignUp,
    exact: true,
    type: ETYPE.ADMIN,
  },
];
