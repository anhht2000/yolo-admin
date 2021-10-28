import AxiosClient from './AxiosClient';

const receiptApi = {
  getReceiptUser: (param: any) => {
    const url = '/receipts';

    return AxiosClient.get(url, { params: { all: process.env.REACT_APP_ALL_PARAM, ...param } });
  },
};

export default receiptApi;
