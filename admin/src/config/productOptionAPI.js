import axiosClient from './axiosClient'

export const getProductOption = async (page = 1, search = '', limit = '') => {
  const data = await axiosClient.get(`/option?page=${page}`)

  return data
}

export const createProductOption = async ({ name, meta }) => {
  const data = await axiosClient.post('/option', { name: name, meta: meta })

  return data
}

export const deleteProductOption = async (id) => {
  const data = await axiosClient.delete(`/option/${id}`)

  return data
}

export const updateProductOption = async ({ name, meta }, id) => {
  const data = await axiosClient.put(`/option/${id}`, { name: name, meta: meta })

  return data
}
