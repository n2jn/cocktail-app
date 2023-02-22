import axios from "axios";

const apiClient = () => {
  const {APP_API_URL} = process.env;

  const axiosInstance = axios.create({
    baseURL: APP_API_URL,
    responseType: 'json'
  })
  
  return axiosInstance;
}

export default apiClient