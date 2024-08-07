import axios from "axios";
import axiosRetry from "axios-retry";

const clientAxios = axios.create({
    baseURL: import.meta.env.VITE_SPLITPAY_SERVER
})

axiosRetry(clientAxios,{
    retries: 10,
    retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 5000)
})

export {clientAxios};