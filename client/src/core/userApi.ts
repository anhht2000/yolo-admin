import AxiosClient from './AxiosClient';

interface ISignUp {
  username: string;
  password: string;
  address: string;
  confirm: string;
  phone: string;
}

const userApi = {
  signUp: (data: ISignUp) => {
    const url = '/user/sign-up';
    return AxiosClient.post(url, data);
  },
};
export default userApi;
