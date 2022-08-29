import service from "@/utils/request";
import type { Response } from '@/utils/request';

interface Apis {
    'getList': {
        req: {
            name: string | null,
            address: string | null,
            pageNum: number,
            pageSize: number
        },
        res: Response<{
            rows: ({
                name: string | null,
                address: string | null
            })[],
            total: number,
        }>
    }
}
function getList(params: Apis['getList']['req']) {
    return service.request<Apis['getList']['req'], Apis['getList']['res']>({
        url: '/table/list',
        method: 'get',
        params
    })
}

export default {
    getList
}