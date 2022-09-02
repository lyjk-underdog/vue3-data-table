import service from "@/utils/request";
import type { Table } from './types';

const list: Table.List = function (params) {
    return service.request({
        url: '/table/data/list',
        method: 'get',
        params
    })
}

const remove: Table.Remove = function (targetId) {
    console.log(targetId);
    
    return service.request({
        url: `/table/data/${targetId}`,
        method: 'delete'
    })
}


const info: Table.Info = function (targetId) {
    return service.request({
        url: `/table/data/${targetId}`,
        method: 'get'
    })
}

const create: Table.Create = function (form) {
    return service.request({
        url: `/table/data`,
        method: 'post',
        data: form
    })
}

const update: Table.Update = function (form) {
    return service.request({
        url: `/table/data`,
        method: 'put',
        data: form
    })
}

export default {
    list,
    info,
    remove,
    create,
    update
}