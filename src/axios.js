import axios from 'axios';
export const djangoUrl =''

const axiosApi = axios.create({
  baseURL: djangoUrl,
});

axios.defaults.withCredentials = true;

export default axiosApi;
