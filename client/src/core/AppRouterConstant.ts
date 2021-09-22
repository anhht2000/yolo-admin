import Login from "../screens/AdminScreens/Login";
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
  // admin
  {
    name: "login",
    path: "/admin/login",
    component: Login,
    exact: true,
    type: ETYPE.ADMIN,
  },
];
