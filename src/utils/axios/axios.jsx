import axios from "axios";

// Your Bearer token (optional)
const authToken = sessionStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "https://jaiye.axle-cartage.com/api/",
  timeout: 10000,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// A function that adds the Bearer token if provided
axiosInstance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const addBearerToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log(token);
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

addBearerToken(authToken);

export default axiosInstance;
