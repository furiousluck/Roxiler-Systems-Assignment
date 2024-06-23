import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://roxiler-systems-assignment-backend-blue.vercel.app', // Replace with your actual base URL
});

export default axiosInstance;
