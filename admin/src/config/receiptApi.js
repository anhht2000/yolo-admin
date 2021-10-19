import axiosClient from './axiosClient'

const receiptApi = {
  getReceipts: () => {
    const url = '/receipts'
    return axiosClient.get(url)
  },
}
export default receiptApi
