import AxiosClient from './AxiosClient';

const productDetailApi = {
  getProduct: (id: string) => {
    const url = `/products/client/${id}`;
    return AxiosClient.get(url);
  },
  getCardContent: () => {
    const url = '/products/sort';
    const loadProduct = 8;
    const desc = 0;
    return AxiosClient.get(url, {
      params: { sortBy: 'name', order: desc, limit: loadProduct },
    });
  },
};
export default productDetailApi;
