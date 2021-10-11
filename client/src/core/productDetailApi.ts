import AxiosClient from './AxiosClient';

const productDetailApi = {
  getProduct: (id: string) => {
    const url = `/product/client/${id}`;
    return AxiosClient.get(url);
  },
  getCardContent: () => {
    const url = '/product/sort';
    const loadProduct = 8;
    const desc = 0;
    return AxiosClient.get(url, {
      params: { sortBy: 'name', order: desc, limit: loadProduct },
    });
  },
};
export default productDetailApi;
