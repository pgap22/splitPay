import axios from "axios";
import axiosRetry from "axios-retry";

const clientAxios = axios.create({
  baseURL: import.meta.env.VITE_SPLITPAY_SERVER,
});

clientAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete clientAxios.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

axiosRetry(clientAxios, {
  retries: 10,
  retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 5000),
});

export { clientAxios };
