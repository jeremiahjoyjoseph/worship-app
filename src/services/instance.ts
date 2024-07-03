import axios, { AxiosInstance } from "axios";
import { getBaseURL } from "../config/index";

const baseURL = getBaseURL();

// Create Axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
