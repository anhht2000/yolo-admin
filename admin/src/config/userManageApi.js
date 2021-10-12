import axiosClient from './axiosClient'

export const getAllUser = async (page = 1, search = '', limit = '') => {
  const data = await axiosClient.get(`/user?page=${page}&search=${search}`)

  return data
}
