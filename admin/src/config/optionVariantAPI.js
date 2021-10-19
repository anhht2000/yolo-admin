import axiosClient from './axiosClient'

export const createOptionVariant = async (name, OptionId) => {
  const data = await axiosClient.post(`/options/${OptionId}/variant`, { name: name })

  return data
}

export const deleteOptionVariant = async (Optionid, VariantId) => {
  const data = await axiosClient.delete(`/options/${Optionid}/variant/${VariantId}`)

  return data
}

export const updateOptionVariant = async (name, OptionId, VariantId) => {
  const data = await axiosClient.put(`/options/${OptionId}/variant/${VariantId}`, { name: name })

  return data
}
