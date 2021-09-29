import Dashboard from "../screens/AdminScreens/Dashboard";
import ForgetPass from "../screens/AdminScreens/ForgetPass";
import Login from "../screens/AdminScreens/Login";
import SignUp from "../screens/AdminScreens/SignUp";
import ForgotPasswordEndUser from "../screens/UserScreens/Auth/ForgotPassword";
import LandingPage from "../screens/UserScreens/Home/LandingPage";
import LoginEndUser from "../screens/UserScreens/Auth/Login";
import ProductDetailsPage from "../screens/UserScreens/Product/ProductDetailsPage";
import ProductPage from "../screens/UserScreens/Product/ProductPage";
import ResigterEndUser from "../screens/UserScreens/Auth/Resigter";
import ListProdcutAddCart from '../screens/UserScreens/Product/ListProdcutAddCart';
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
    name: "Landing Pages",
    path: "/",
    component: LandingPage,
    exact: true,
    type: ETYPE.USER,
  },
  {
    name: "Product Page",
    path: "/product",
    component: ProductPage,
    exact: true,
    type: ETYPE.USER,
  },
  {
    name: "Product Detail Page",
    path: "/product/:id",
    component: ProductDetailsPage,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: "List Product add cart",
    path: "/list_product_add",
    component: ListProdcutAddCart,
    exact: false,
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
  {
    name: "admin",
    path: '/admin',
    exact: true,
    component: Dashboard,
    type: ETYPE.ADMIN
  }
];
