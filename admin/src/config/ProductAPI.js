import axiosClient from './axiosClient'

export const getProductOption = async (page = 1, search = '', limit = '') => {
  const data = await axiosClient.get(`/option?page=${page}`)
  return data
}

export const createProductOption = async (option) => {
  const data = await axiosClient.get('/option', option)
  return data
}

export const deleteProductOption = async (id) => {
  const data = await axiosClient.get(`/option/${id}`)
  return data
}

export const updateProductOption = async (option, id) => {
  const data = await axiosClient.update(`/option/${id}`, option)
  return data
}
