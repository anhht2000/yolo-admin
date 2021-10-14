import AxiosClient from './AxiosClient';

const productApi = {
  getAllProduct: (page: number = 1) => {
    const url = '/products';

    return AxiosClient.get(url, {
      params: { page: page, limit: process.env.REACT_APP_LIMIT },
    });
  },
  getAllOption: () => {
    const url = '/options';

    return AxiosClient.get(url);
  },
  filterProduct: (filter: string) => {
    const url = '/products/search';

    if (filter.length <= 1) {
      return AxiosClient.get(url, {
        params: { search: '', limit: process.env.REACT_APP_LIMIT },
      });
    }
    return AxiosClient.get(url, {
      params: { filter, limit: process.env.REACT_APP_LIMIT },
    });
  },
};
export default productApi;
