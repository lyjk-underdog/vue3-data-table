import type { Component } from 'vue';
import type { FormItemRule, FormItemProp } from 'element-plus';

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

export namespace FormRendererTypes {
    export interface Field {
        type: 'input' | 'select' | Component;
        label: string;
        prop: FormItemProp;
        options?: { label: string, value: any }[],
        attrs?: Record<string, any>,
        rules?: FormItemRule | FormItemRule[]
    }

    export type Model = Record<string, any>;
}

export namespace DialogFormTypes {
    export const enum Mode {
        Create = 'create',
        Update = 'update'
    }

    export type Field = FormRendererTypes.Field;
    export type Model = FormRendererTypes.Model;

    export type ReadApi = (...params: any[]) => Promise<ResultData<any>>;
}

export namespace TableDataTypes {

    export interface Apis {
        list: (...params: any[]) => Promise<ResultData<ResPage<any>>>;
        create?: (...params: any[]) => Promise<any>;
        read?: DialogFormTypes.ReadApi;
        update?: (...params: any[]) => Promise<any>;
        remove?: (...params: any[]) => Promise<any>
    }

    export interface Column {
        label: string;
        prop: string,
        formatter?: (row: any) => JSX.Element,
        search?: Pick<FormRendererTypes.Field, 'type' | 'options' | 'attrs'> & { default?: any }
    }

    export interface Editor {
        model: DialogFormTypes.Model;
        fields: DialogFormTypes.Field[];
    }

}
