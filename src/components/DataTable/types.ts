import type { Component } from 'vue';
import type { FormItemRule } from 'element-plus';

// 后端返回格式接口
interface ResultData<T> {
    code: number;
    message: string;
    data: T;
}

//分页请求参数
interface ReqPage {
    pageNum: number,
    pageSize: number
}

// 分页响应参数
interface ResPage<T> {
    rows: T[];
    total: number;
}

export namespace FormRenderer {
    export type Fields = {
        type: 'input' | 'select' | Component;
        label: string;
        prop: string;
        options?: { label: string, value: any }[],
        attrs?: Record<string, any>,
        rules?: FormItemRule | FormItemRule[]
    }[]
    export type Model = Record<string, any>;
    export type Inline = boolean;
    export type Disabled = boolean;
}

export namespace SearchForm {
    export type Fields = FormRenderer.Fields;
    export type Model = FormRenderer.Model;
}

export namespace EditForm {
    export const enum Mode {
        Create = 'create',
        Update = 'update',
        View = 'view'
    }
    export type Fields = FormRenderer.Fields;
    export type Model = FormRenderer.Model;
    export type Visible = boolean;
    export type Loading = boolean;

    export type Events = {
        'update:visible': boolean,
        'submit': () => void
    }
}

export namespace DataTable {

    export type Apis = {
        list: (params: Record<string , any> & ReqPage) => Promise<ResultData<ResPage<any>>>;
        create?: (form: Record<string, any>) => Promise<any>;
        read?: (targetId: string) => Promise<ResultData<any>>;
        update?: (form: Record<string, any>) => Promise<any>;
        remove?: (idOrIds: string | string[]) => Promise<any>
    }

    export type Columns = {
        label: string;
        prop: string,
        formatter?: (row: any) => JSX.Element,
        search?: Pick<FormRenderer.Fields[number], 'type' | 'options' | 'attrs'> & { default?: any }
    }[]

    export type EditFields = (FormRenderer.Fields[number] & { default?: any })[]
    export type Id = string;
    export type HasDelete = boolean;
    export type HasEdit = boolean;
    export type HasNew = boolean;
    export type HasView = boolean;
    export type HasOperation = boolean;
    export type HasPagination = boolean;
    export type PageSize = number;
}
