import type { Ref } from 'vue';
import type { DataTable } from '../types';

function useTable(apis: DataTable.Apis, params?: Ref<any>) {

    const state = reactive<{
        loading: boolean,
        list: any[],
        total: number
    }>({
        loading: false,
        list: [],
        total: 0
    })

    async function getList() {
        state.loading = true;

        let { data } = await apis.list(params?.value);
        state.list = data.rows;
        state.total = data.total;

        state.loading = false;
    }

    onMounted(() => {
        getList();
    })

    return reactive({
        ...toRefs(state),
        getList
    });
}

export default useTable;