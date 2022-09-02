<template>
    <div class="c-data-table">

        <EditFormVue v-model:visible="editor.visible" :loading="editor.loading" :model="editor.form"
            :fields="editor.fields" :mode="editor.mode" @submit="handleEdit" />

        <div class="c-data-table_header">
            <SearchFormVue :model="search.params" :files="search.fields" @search="table.getList"
                @reset="table.getList" />
        </div>

        <div class="c-data-table_body">
            <ElRow class="mb10" :gutter="10">
                <ElCol :span="1.5">
                    <el-button v-if="props.hasNew" type="primary" plain :icon="Plus"
                        @click="() => editor.open(EditForm.Mode.Create)">新增
                    </el-button>
                </ElCol>
                <ElCol :span="1.5">
                    <el-button v-if="props.hasDelete" type="danger" :disabled="!selection.isSelected" plain
                        :icon="Delete" @click="() => handleDelete(selection.ids)">删除
                    </el-button>
                </ElCol>
                <slot name="header" :selectedIds="selection.ids" :selection="selection.list"></slot>
            </ElRow>


            <ElTable v-loading="table.loading" :data="table.list" class="mb10"
                @selection-change="selection.selectionChange">
                <ElTableColumn type="selection" width="55" align="center" />
                <ElTableColumn type="index" label="序号" align="center" :width="80" />
                <ElTableColumn v-for="(column, index) in props.columns" :key="index" min-width="100" align="center"
                    :label="column.label" :prop="column.prop" :formatter="column.formatter" />
                <ElTableColumn v-if="props.hasOperation" label="操作" align="center">
                    <template #default="{ row }">
                        <slot name="operate" :row="row"></slot>

                        <ElButton v-if="props.hasView" type="primary" text :icon="Document"
                            @click="() => editor.open(EditForm.Mode.View, row)">详情
                        </ElButton>
                        <ElButton v-if="props.hasEdit" type="primary" text :icon="Edit"
                            @click="() => editor.open(EditForm.Mode.Update, row)">修改
                        </ElButton>
                        <ElButton v-if="props.hasDelete" type="primary" text :icon="Delete"
                            @click="() => handleDelete(row)">删除
                        </ElButton>
                    </template>
                </ElTableColumn>
            </ElTable>

            <ElPagination v-if="hasPagination" class="pt10" background :page-sizes="[10, 20, 30]"
                layout="total , sizes , prev, pager, next , jumper " :total="table.total"
                v-model:page-size="pagination.pageSize" v-model:current-page="pagination.pageNum"
                @current-change="table.getList" @size-change="table.getList" />

        </div>
    </div>
</template>

<script setup lang="ts">
import type { DataTable } from './types';
import { EditForm } from './types';
import { Plus, Document, Edit, Delete } from '@element-plus/icons-vue'
import SearchFormVue from './components/SearchForm.vue';
import EditFormVue from './components/EditForm.vue';
import useSearch from './hooks/useSearch';
import useTable from './hooks/useTable';
import useEditor from './hooks/useEditor';
import useSelection from './hooks/useSelection';

interface Props {
    id?: DataTable.Id;
    apis: DataTable.Apis;
    columns?: DataTable.Columns;
    editFileds?: DataTable.EditFields;
    hasDelete?: DataTable.HasDelete,
    hasEdit?: DataTable.HasEdit,
    hasNew?: DataTable.HasNew,
    hasView?: DataTable.HasView,
    hasOperation?: DataTable.HasOperation,
    hasPagination?: DataTable.HasPagination,
    pageSize?: DataTable.PageSize
}
const props = withDefaults(defineProps<Props>(), {
    id: 'id',
    columns: () => [],
    editFileds: () => [],
    hasDelete: true,
    hasEdit: true,
    hasNew: true,
    hasView: true,
    hasOperation: true,
    hasPagination: true,
    pageSize: 10
});

// search
const search = useSearch(props.columns);

// pagination
const pagination = reactive({
    pageNum: 1,
    pageSize: props.pageSize
})

// table
const params = computed(() => {
    return {
        ...search.params,
        ...(props.hasPagination ? pagination : {})
    }
})
const table = useTable(props.apis, params);

// selection
const selection = useSelection(props.id);

// dialogForm
const editor = useEditor(props.editFileds, props.apis as Required<DataTable.Apis>, props.id);

async function handleDelete(rowOrIds: Record<string, any> | string[]) {
    try {
        await editor.remove(rowOrIds);
        table.getList();
    } catch (e) {
        console.error(e);
    }
}

async function handleEdit(done: () => void) {
    try {
        await editor.edit();
        done();
        table.getList();
    } catch (e) {
        console.error(e)
    }
}

defineExpose({
    refresh: table.getList
})

</script>

<style lang="scss" scoped>
.c-data-table {
    padding: 20px;

    &_header {
        padding: 30px 24px 12px;
        background-color: #fff;
        margin-bottom: 16px;
    }

    &_body {
        background-color: #fff;
        padding: 24px;
    }

    :deep(.el-pagination) {
        justify-content: center;
    }
}

.mb10 {
    margin-bottom: 10px;
}

.pt10 {
    padding-top: 10px;
}
</style>