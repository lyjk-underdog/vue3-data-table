import type { DataTable } from '../types';
import { EditeForm } from '../types';
import useHint from './useHint';

function useEditor(fields: DataTable.EditFields, apis: DataTable.Apis, id: DataTable.Id) {

    const state = reactive<{
        visible: EditeForm.Visible
        form: EditeForm.Model,
        fields: EditeForm.Fields,
        mode: EditeForm.Mode
    }>({
        visible: false,
        form: {},
        fields: [],
        mode: EditeForm.Mode.Create,
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
    async function open(mode: EditeForm.Mode, row?: any) {
        state.mode = mode;
        state.visible = true;

        if (mode === EditeForm.Mode.Update) {
            let { data } = await apis.read(row[id]);
            state.form = data;

            return;
        }
    }

    // 删除
    function remove(row: any) {
        return useHint(() => apis.remove(row[id]), '删除');
    }

    // 新增、更新
    async function edit() {
        const strategy = {
            [EditeForm.Mode.Create]: async () => {
                await apis.create(state.form);
                ElMessage({
                    type: 'success',
                    message: '新增成功！'
                })
            },
            [EditeForm.Mode.Update]: async () => {
                await apis.update(state.form);
                ElMessage({
                    type: 'success',
                    message: '更新成功！'
                })
            }
        }

        await strategy[state.mode]();

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