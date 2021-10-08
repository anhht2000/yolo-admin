import AxiosClient from './AxiosClient';

const homeApi = {
  getTopNew: () => {
    const url = '/product/sort';
    return AxiosClient.get(url, {
      params: { sortBy: 'createDate', order: 1, limit: 8 },
    });
  },
  getTopPopular: () => {
    const url = '/product/sort';
    return AxiosClient.get(url, {
      params: { sortBy: 'name', order: 0, limit: 4 },
    });
  },
  getTopSell: () => {
    const url = '/product/sort';
    return AxiosClient.get(url, {
      params: { sortBy: 'name', order: 1, limit: 4 },
    });
  },
};
export default homeApi;
