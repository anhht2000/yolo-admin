import AxiosClient from './AxiosClient';

export interface ISignUp {
  username: string;
  password: string;
  address: string;
  confirm: string;
  phone: string;
}
export interface ISignIn {
  username: string;
  password: string;
}

const userApi = {
  signUp: (data: ISignUp) => {
    const url = '/user/sign-up';
    return AxiosClient.post(url, data);
  },
  signIn: (data: ISignIn) => {
    const url = '/user/log-in';
    return AxiosClient.post(url, data);
  },
};
export default userApi;
