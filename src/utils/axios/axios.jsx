import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jaiye.axle-cartage.com/api/",
  timeout: 10000,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
