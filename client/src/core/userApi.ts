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
export interface IForget {
  username: string;
}
export interface IChangePass {
  confirm: string;
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
  forget: (data: IForget) => {
    const url = '/user/forget-pass';
    return AxiosClient.post(url, data);
  },
  changePass: (data: IChangePass, token: string) => {
    const url = '/user/change-pass';
    return AxiosClient.post(url, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};
export default userApi;
