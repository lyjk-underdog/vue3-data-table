import type { DataTable, SearchForm } from '../types';

function useSearch(columns: DataTable.Props.Columns) {

    const state = reactive<{
        params: SearchForm.Props.Model,
        fields: SearchForm.Props.Fields
    }>({
        params: {},
        fields: []
    })

    // 根据columns构造查询参数
    onBeforeMount(() => {
        for (let col of columns) {
            if (col.search) {
                state.params[col.prop] = col.search.default ?? null;
            }
        }
    })

    // 根据columns构造搜索表单字段
    onBeforeMount(() => {
        for (let col of columns) {
            if (col.search) {
                state.fields.push({
                    type: col.search.type,
                    label: col.label,
                    prop: col.prop,
                    options: col.search.options,
                    attrs: col.search.attrs,
                })
            }
        }
    })

    return state;
}

export default useSearch;