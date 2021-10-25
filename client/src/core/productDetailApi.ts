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
  postAddToCart: (data:any) => {
    const url = '/receipts';
    return AxiosClient.post(url, {
      params: data,
    });
  },

};
export default productDetailApi;
