import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

axiosClient.interceptors.request.use((config) => {
  if (!config.headers.authorization) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.authorization = `bearer ${token}`
    }
  }
  return config
})

axiosClient.interceptors.response.use((response) => {
  return response
})

export default axiosClient
