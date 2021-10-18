import ChangePass from '../screens/UserScreens/Auth/ChangePass';
import ForgotPasswordEndUser from '../screens/UserScreens/Auth/ForgotPassword';
import ResigterEndUser from '../screens/UserScreens/Auth/Resigter';
import Login from '../screens/UserScreens/Authen/Login';
import LandingPage from '../screens/UserScreens/Home/LandingPage';
import ListPayProduct from '../screens/UserScreens/Product/ListPayProduct';
import ListProdcutAddCart from '../screens/UserScreens/Product/ListProdcutAddCart';
import ProductDetailsPage from '../screens/UserScreens/Product/ProductDetailsPage';
import ProductPage from '../screens/UserScreens/Product/ProductPage';
enum ETYPE {
  ADMIN = 'ADMIN',
  USER = 'USER',
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
    name: 'Landing Pages',
    path: '/',
    component: LandingPage,
    exact: true,
    type: ETYPE.USER,
  },
  {
    name: 'Product Page',
    path: '/product',
    component: ProductPage,
    exact: true,
    type: ETYPE.USER,
  },
  {
    name: 'Product Detail Page',
    path: '/product/:id',
    component: ProductDetailsPage,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: 'List Product add cart',
    path: '/list_product_add',
    component: ListProdcutAddCart,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: 'List Pay Product',
    path: '/list_pay_product',
    component: ListPayProduct,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: 'resigter',
    path: '/resigter',
    component: ResigterEndUser,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: 'forgotpass',
    path: '/forgot-pass',
    component: ForgotPasswordEndUser,
    exact: false,
    type: ETYPE.USER,
  },
  {
    name: 'Change pasword',
    path: '/change-pass/:token',
    component: ChangePass,
    exact: false,
    type: ETYPE.USER,
  },
];
