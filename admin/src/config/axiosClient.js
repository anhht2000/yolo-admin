import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
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
