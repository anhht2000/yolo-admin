import AxiosClient from './axiosClient'

const productApi = {
  getAll: (page) => {
    const url = 'admin/product'

    return AxiosClient.get(url, { params: { page: page || 1 } })
  },
  getOne: (id) => {
    const url = 'admin/product/' + id

    return AxiosClient.get(url)
  },
  createProduct: (data) => {
    const url = 'admin/product'

    return AxiosClient.post(url, data)
  },
  updateProduct: (id, data) => {
    const url = 'admin/product/' + id

    return AxiosClient.put(url, data)
  },
  deleteProduct: (id) => {
    const url = 'admin/product/' + id

    return AxiosClient.delete(url)
  },
  searchProduct: (value) => {
    const url = 'products/search'
    return AxiosClient.get(url, { params: { search: `${value}` } })
  },
  sortProduct: (by, order) => {
    const url = 'products/sort'
    return AxiosClient.get(url, { params: { sortBy: `${by}`, order: `${order}` } })
  },
}
export default productApi
