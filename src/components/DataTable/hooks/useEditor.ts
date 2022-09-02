import type { DataTable } from '../types';
import { EditForm } from '../types';
import useHint from './useHint';

function useEditor(fields: DataTable.EditFields, apis: Required<DataTable.Apis>, id: DataTable.Id) {

    const state = reactive<{
        visible: EditForm.Visible
        form: EditForm.Model,
        fields: EditForm.Fields,
        mode: EditForm.Mode,
        loading: EditForm.Loading
    }>({
        visible: false,
        form: {},
        fields: [],
        mode: EditForm.Mode.Create,
        loading: false
    })

    // 根据edite-fields初始化表单结构
    onBeforeMount(() => {
        for (let field of fields) {
            state.form[field.prop] = field.default ?? null;
        }
    })

    // 根据edite-fields初始化fields
    onBeforeMount(() => {
        let _ = null;
        state.fields = fields.map(({ default: _, ...field }) => field);
    })

    // editor弹窗
    async function open(mode: EditForm.Mode, row?: any) {
        state.mode = mode;
        state.visible = true;

        if (mode === EditForm.Mode.Update || mode === EditForm.Mode.View) {
            state.loading = true;

            let { data } = await apis.read(row[id]);
            state.form = data;

            state.loading = false;

            return;
        }
    }

    // 删除
    function remove(rowOrIds: Record<string, any> | string[]) {
        if (rowOrIds instanceof Array) {
            return useHint(() => apis.remove(rowOrIds), '删除');
        }

        return useHint(() => apis.remove(rowOrIds[id]), '删除');

    }

    // 新增、更新
    async function edit() {

        if (state.mode === EditForm.Mode.Create) {
            await apis.create(state.form);
            ElMessage({
                type: 'success',
                message: '新增成功！'
            })
        }

        if (state.mode === EditForm.Mode.Update) {
            await apis.update(state.form);
            ElMessage({
                type: 'success',
                message: '更新成功！'
            })
        }

        state.visible = false;
    }

    return reactive({
        ...toRefs(state),
        open,
        edit,
        remove,
    });

}

export default useEditor;