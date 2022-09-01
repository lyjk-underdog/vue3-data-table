import type { Component } from 'vue';
import type { FormItemRule } from 'element-plus';

// 后端返回格式接口
interface ResultData<T> {
    code: number;
    message: string;
    data: T;
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

export namespace EditeForm {
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
        list: (...params: any[]) => Promise<ResultData<ResPage<any>>>;
        create: (...params: any[]) => Promise<any>;
        read: (...params: any[]) => Promise<ResultData<any>>;
        update: (...params: any[]) => Promise<any>;
        remove: (...params: any[]) => Promise<any>
    }

    export type Columns = {
        label: string;
        prop: string,
        formatter?: (row: any) => JSX.Element,
        search?: Pick<FormRenderer.Fields[number], 'type' | 'options' | 'attrs'> & { default?: any }
    }[]

    export type EditFields = (FormRenderer.Fields[number] & { default?: any })[]
    export type Id = string;
}
