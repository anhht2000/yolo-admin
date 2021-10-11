import AxiosClient from './AxiosClient';

const productApi = {
  getAllProduct: (page: number = 1) => {
    const url = '/product';
    return AxiosClient.get(url, {
      params: { page: page },
    });
  },
  getAllOption: () => {
    const url = '/option';
    return AxiosClient.get(url);
  },
  filterProduct: (filter: string) => {
    const url = 'product/search';
    return AxiosClient.get(url, {
      params: { filter },
    });
  },
};
export default productApi;
