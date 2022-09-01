import service from "@/utils/request";
import type { ResultData, ResPage, ReqPage } from './types';

export namespace GetList {
    export type Item = {
        id: string,
        name: string | null,
        address: string | null
    }

    export type Req = Item & ReqPage
    export type Res = ResultData<ResPage<Item>>
}
function getList(params: GetList.Req) {
    return service.request<GetList.Req, GetList.Res>({
        url: '/table/data/list',
        method: 'get',
        params
    })
}

export namespace Remove {
    export type Req = string;
    export type Res = ResultData<void>
}
function remove(id: Remove.Req) {
    return service.request<Remove.Req, Remove.Res>({
        url: `/table/data/${id}`,
        method: 'delete'
    })
}

export namespace GetInfo {
    export type Req = string;
    export type Res = ResultData<GetList.Item>
}
function getInfo(id: GetInfo.Req) {
    return service.request<GetInfo.Req, GetInfo.Res>({
        url: `/table/data/${id}`,
        method: 'get'
    })
}

export namespace Create {
    export type Req = Record<string, any>;
    export type Res = ResultData<void>;
}
function create(form: Update.Req) {
    return service.request<Create.Req, Create.Res>({
        url: `/table/data`,
        method: 'post',
        data: form
    })
}

export namespace Update {
    export type Req = Record<string, any>;
    export type Res = ResultData<void>;
}
function update(form: Update.Req) {
    return service.request<Update.Req, Update.Res>({
        url: `/table/data`,
        method: 'put',
        data: form
    })
}

export default {
    getList,
    getInfo,
    remove,
    create,
    update
}