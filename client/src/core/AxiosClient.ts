import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const AxiosClientConfig = {
  BASE_URL: 'http://localhost:4000',
  AUTH_TYPES: 'bearer',
  CONTENT_TYPE: "application/json"
}

const AxiosClient = axios.create({
  baseURL: AxiosClientConfig.BASE_URL,
  headers: {
    "Content-type": AxiosClientConfig.CONTENT_TYPE
  }
})

AxiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if(!config.headers.authorization) {
      const token = localStorage.getItem('app_token');
      if(token) {
        config.headers.authorization = `${AxiosClientConfig.AUTH_TYPES} ${token}`;
      }
    }
  return config;
  },
  (error) => {

  }
)

AxiosClient.interceptors.response.use(
  (axiosResponse: AxiosResponse<any>)=> {
    return axiosResponse;
  },
  (error) => {

  }
)

export default AxiosClient;
