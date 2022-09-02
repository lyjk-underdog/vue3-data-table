/**
 * api通用接口
 */

// 后端返回格式接口
export interface ResultData<T> {
    code: number;
    message: string;
    data: T;
}

// 分页请求参数
export interface ReqPage {
    pageNum: number;
    pageSize: number;
}

// 分页响应参数
export interface ResPage<T> {
    rows: T[];
    total: number;
}

/**
 * 模块api类型
 */


export namespace Table {

    type Item = {
        id: string,
        name: string | null,
        address: string | null
    }

    export type List = {
        (params: Item & ReqPage): Promise<ResultData<ResPage<Item>>>;
    }

    export type Remove = {
        (targetId: string | string[]): Promise<ResultData<void>>;
    }

    export type Info = {
        (targetId: string): Promise<ResultData<Item>>;
    }

    export type Create = {
        (form: Item): Promise<ResultData<void>>;
    }

    export type Update = {
        (form: Item): Promise<ResultData<void>>;
    }

}