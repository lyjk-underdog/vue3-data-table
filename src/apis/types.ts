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