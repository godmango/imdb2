import axios from "axios";
// import { toast } from "react-toastify";
const MyApi = process.env.REACT_APP_APIKEY;

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: MyApi,
    language: "en-US",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  function (request) {
    // Do something before request is sent
    console.log("Starting request", request);
    return request;
  },
  function (error) {
    // Do something with request error
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Response", response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("RESPONSE ERROR", error);
    // toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export default api;
