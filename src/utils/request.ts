import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 拦截器接口
interface RequestInterceptors<T> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
    requestInterceptorCatch?: (err: unknown) => Promise<unknown>,
    responseInterceptor?: (response: AxiosResponse) => T,
    responseInterceptorCatch?: (err: unknown) => Promise<unknown>
}

// service 配置接口
interface ServiceConfig<T> extends AxiosRequestConfig {
    interceptors?: RequestInterceptors<T>,
}

// 请求配置接口
interface RequestConfig<T> extends AxiosRequestConfig {
    data?: T,
    params?: T
}

// 后端返回格式接口
export interface Response<T> {
    code: number,
    message: string,
    data: T
}

class Service<T> {
    instance: AxiosInstance;

    constructor(config: ServiceConfig<T>) {
        this.instance = axios.create(config);

        // 默认拦截器
        const requestInterceptor: RequestInterceptors<T>['requestInterceptor'] = config.interceptors?.requestInterceptor || (config => config);
        const requestInterceptorCatch: RequestInterceptors<T>['requestInterceptorCatch'] = config.interceptors?.requestInterceptorCatch || (err => Promise.reject(err));
        const responseInterceptor: RequestInterceptors<T>['responseInterceptor'] = config.interceptors?.responseInterceptor || (response => response.data);
        const responseInterceptorCatch: RequestInterceptors<T>['responseInterceptorCatch'] = config.interceptors?.responseInterceptorCatch || (err => Promise.reject(err));

        // 请求拦截
        this.instance.interceptors.request.use(
            requestInterceptor,
            requestInterceptorCatch
        )

        // 响应拦截
        this.instance.interceptors.response.use(
            responseInterceptor,
            responseInterceptorCatch
        )
    }

    /**
     * @interface U 请求参数的interface
     * @interface V 响应结构的intercept
     * @param {RequestConfig} config 
     * @returns {Promise}
    */
    request<U, V extends T>(config: RequestConfig<U>): Promise<V> {
        return this.instance.request(config);
    }
}

let service = new Service<Response<unknown>>({
    url: import.meta.env.VITE_APP_BASE_URL,
    timeout: 15000,
});

export default service;

