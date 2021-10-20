import axiosClient from './axiosClient'

const receiptApi = {
  getReceipts: (page = 1) => {
    const url = '/receipts'
    return axiosClient.get(url, { params: { page: page } })
  },
  changeStatusReceipts: (id, status) => {
    const url = '/receipts/status/' + id
    return axiosClient.get(url, { params: { status: status } })
  },
}
export default receiptApi
