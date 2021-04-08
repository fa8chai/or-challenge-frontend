import axios from 'axios';
export const djangoUrl ='https://or-challenge.herokuapp.com'

const axiosApi = axios.create({
  baseURL: djangoUrl,
});

axios.defaults.withCredentials = true;

export default axiosApi;
