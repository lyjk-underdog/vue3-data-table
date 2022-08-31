import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class Service {
    instance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config);

        // 请求拦截
        this.instance.interceptors.request.use(
            (config) => {
                return config
            },
            (err) => {
                return Promise.reject(err)
            }
        )

        // 响应拦截
        this.instance.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (err) => {
                return Promise.reject(err)
            }
        )
    }

    /**
     * @interface T 请求参数的interface
     * @interface U 响应结构的interface
     * @param {RequestConfig} config 
     * @returns {Promise}
    */
    request<T , U>(config: AxiosRequestConfig<T>): Promise<U> {
        return this.instance.request(config);
    }
}

let service = new Service({
    url: import.meta.env.VITE_APP_BASE_URL,
    timeout: 15000,
});

export default service;