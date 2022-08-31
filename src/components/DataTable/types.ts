import type { Component } from 'vue';
import type { FormItemRule, FormItemProp } from 'element-plus';

export namespace FormRendererTypes {
    export interface Field {
        type: 'input' | 'select' | Component;
        label: string;
        prop: FormItemProp;
        options?: { label: string, value: any }[],
        attrs?: Record<string, any>,
        rules?: FormItemRule | FormItemRule[]
    }
}

export namespace TableDataTypes {

    export interface ResPage {
        data: {
            rows: any[],
            total: number;
        }
    }

    export interface Apis {
        list: (...params: any[]) => Promise<ResPage>;
        create?: (...params: any[]) => Promise<any>;
        read?: (...params: any[]) => Promise<any>;
        update?: (...params: any[]) => Promise<any>;
        remove?: (...params: any[]) => Promise<any>
    }

    export interface Column {
        label: string;
        prop: string,
        formatter?: (row: any) => JSX.Element,
        search?: {
            type: FormRendererTypes.Field['type'],
            default?: any
            options?: { label: string, value: any }[],
            attrs?: Record<string, any>,
        }
    }

}