import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual base URL
});

export default axiosInstance;
