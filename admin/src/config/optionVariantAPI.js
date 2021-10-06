import axiosClient from './axiosClient'

export const createOptionVariant = async (name, OptionId) => {
  const data = await axiosClient.post(`/option/${OptionId}/variant`, { name: name })

  return data
}

export const deleteOptionVariant = async (Optionid, VariantId) => {
  const data = await axiosClient.delete(`/option/${Optionid}/variant/${VariantId}`)

  return data
}

export const updateOptionVariant = async (name, OptionId, VariantId) => {
  const data = await axiosClient.put(`/option/${OptionId}/variant/${VariantId}`, { name: name })

  return data
}
