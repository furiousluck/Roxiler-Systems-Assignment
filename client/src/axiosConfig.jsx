import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://roxiler-systems-assignment-3hdv.onrender.com', // Replace with your actual base URL
});

export default axiosInstance;
