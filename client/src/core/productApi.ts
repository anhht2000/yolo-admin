import AxiosClient from './AxiosClient';

const productApi = {
  getAllProduct: (page: number = 1) => {
    const url = '/products';
    return AxiosClient.get(url, {
      params: { page: page },
    });
  },
  getAllOption: () => {
    const url = '/options';
    return AxiosClient.get(url);
  },
  filterProduct: (filter: string) => {
    const url = '/products/search';
    return AxiosClient.get(url, {
      params: { filter },
    });
  },
};
export default productApi;
