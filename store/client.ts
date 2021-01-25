import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === "debug") {
      console.info("Request:");

      console.info(config);
    }
    return config;
  },
  (error) => {
    if (true) {
      console.info(error);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === "debug") {
      console.info("Response:");
      console.info(response);
    }
    return response;
  },
  (error) => {
    if (true) {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export default axios;
