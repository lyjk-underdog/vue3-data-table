import type { DataTable } from '../types';

function useSelection(id: DataTable.Props.Id) {
    const state = reactive<{
        list: any[],
        isSelected: boolean,
    }>({
        list: [],
        isSelected: false,
    })

    const ids = computed(() => {
        return state.list.map((item) => item[id])
    })

    function selectionChange(newSelection: any[]) {
        newSelection.length === 0 ? (state.isSelected = false) : (state.isSelected = true);
        state.list = newSelection;
    }

    return reactive({
        ...toRefs(state),
        ids,
        selectionChange
    })
}

export default useSelection;