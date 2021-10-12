import AxiosClient from './AxiosClient';

interface IsignUp {
  username: string;
  password: string;
  address: string;
  confirm: string;
  phone: string;
}

const userApi = {
  signUp: (data: IsignUp) => {
    const url = '/user/sign-up';
    return AxiosClient.post(url, data);
  },
};
export default userApi;
