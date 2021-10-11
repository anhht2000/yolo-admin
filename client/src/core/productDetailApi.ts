import AxiosClient from './AxiosClient';

const productDetailApi = {
  getProduct: (id: string) => {
    const url = `/product/client/${id}`;
    return AxiosClient.get(url);
  },
  getCardContent: () => {
    const url = '/product/sort';
    return AxiosClient.get(url, {
      params: { sortBy: 'name', order: 0, limit: 8 },
    });
  },
};
export default productDetailApi;
