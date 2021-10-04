import AxiosClient from './axiosClient'
const productApi = {
  getAll: (page) => {
    const url = 'product/'
    return AxiosClient.get(url, { params: { page: page || 1 } })
  },
  getOne: (id) => {
    const url = 'product/' + id
    return AxiosClient.get(url)
  },
}
export default productApi
