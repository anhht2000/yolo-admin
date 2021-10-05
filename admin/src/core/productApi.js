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
  createProduct: (data) => {
    const url = 'product/add/'

    return AxiosClient.post(url, data)
  },
  updateProduct: (id, data) => {
    const url = 'product/edit/' + id

    return AxiosClient.put(url, data)
  },
  deleteProduct: (id) => {
    const url = 'product/delete/' + id

    return AxiosClient.delete(url)
  },
  searchProduct: (value) => {
    const url = 'product/search'

    return AxiosClient.get(url, { params: { search: `${value}` } })
  },
  sortProduct: (by, order) => {
    const url = 'product/sort'

    return AxiosClient.get(url, { params: { sortBy: `${by}`, order: `${order}` } })
  },
}
export default productApi
