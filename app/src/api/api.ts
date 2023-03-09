import axios from 'axios';

const base_url = 'https://www.thecocktaildb.com/api/json/v1/1';

const api = () => {
  const axiosInstance = axios.create({
    baseURL: base_url,
    responseType: 'json',
  });

  return axiosInstance;
};

export default api;
