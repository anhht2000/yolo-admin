import axiosClient from './axiosClient'

export const getAllProductOption = async (page = 1, search = '', limit = '') => {
  const data = await axiosClient.get(`/options?page=${page}`)

  return data
}

export const getProductOption = async () => {
  const data = await axiosClient.get(`/admin/option`)

  return data
}

export const createProductOption = async ({ name, meta }) => {
  const data = await axiosClient.post('/options', { name: name, meta: meta })

  return data
}

export const deleteProductOption = async (id) => {
  console.log('api', id)

  const data = await axiosClient.delete(`/options/${id}`)

  return data
}

export const updateProductOption = async (name, meta, id) => {
  const data = await axiosClient.put(`/options/${id}`, { name: name, meta: meta })

  return data
}

export const getAllOption = async () => {
  const data = await axiosClient.get('/options/all')

  return data
}
