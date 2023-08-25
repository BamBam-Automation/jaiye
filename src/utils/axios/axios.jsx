import axios from "axios";

const axios = axios.create({
  baseURL: "https://jaiye.axle-cartage.com/api/",
  Headers: {
    accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axios;
