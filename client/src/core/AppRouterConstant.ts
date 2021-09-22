import Homepage from "../screens/UserScreens/Homepage";
import Login from "../screens/UserScreens/Login";
import Resigter from "../screens/UserScreens/Resigter";
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
    name: "home",
    path: "/home",
    component: Homepage,
    exact: true,
    type: ETYPE.USER,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: "resigter",
    path: "/resigter",
    component: Resigter,
    exact: false,
    type: ETYPE.USER,
  },
];
