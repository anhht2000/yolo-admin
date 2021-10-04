import axiosClient from './axiosClient'

export const GetProductOption = async () => {
  const data = await axiosClient.get('/option')
  return data
}

export const CreateProductOption = async (option) => {
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
