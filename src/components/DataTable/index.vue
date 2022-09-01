<template>
    <div class="c-data-table">

        <EditeFormVue v-model:visible="editor.visible" :loading="editor.loading" :model="editor.form"
            :fields="editor.fields" :mode="editor.mode" @submit="handleEdit" />

        <div class="c-data-table_header">
            <SearchFormVue :model="search.params" :files="search.fields" @search="table.getList"
                @reset="table.getList" />
        </div>

        <div class="c-data-table_body">
            <ElRow :gutter="10">
                <ElCol :span="1.5">
                    <el-button @click="() => editor.open(EditeForm.Mode.Create)">新增</el-button>
                </ElCol>
            </ElRow>

            <ElTable v-loading="table.loading" :data="table.list">
                <ElTableColumn type="index" label="序号" align="center" />
                <ElTableColumn v-for="(column, index) in props.columns" :key="index" min-width="100" align="center"
                    :label="column.label" :prop="column.prop" :formatter="column.formatter" />
                <ElTableColumn label="操作" align="center">
                    <template #default="{ row }">
                        <ElButton @click="() => editor.open(EditeForm.Mode.Update, row)">修改</ElButton>
                        <ElButton @click="() => editor.open(EditeForm.Mode.View, row)">详情</ElButton>
                        <ElButton @click="() => handleDelete(row)">删除</ElButton>
                    </template>
                </ElTableColumn>
            </ElTable>
        </div>

        <div class="c-data-table_footer">
            <ElPagination :total="table.total" v-model:page-size="pagination.pageSize"
                v-model:current-page="pagination.pageNum" @current-change="table.getList" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DataTable } from './types';
import { EditeForm } from './types';
import SearchFormVue from './components/SearchForm.vue';
import EditeFormVue from './components/DialogForm.vue';
import useSearch from './hooks/useSearch';
import useTable from './hooks/useTable';
import useEditor from './hooks/useEditor';

interface Props {
    id?: DataTable.Id;
    apis: DataTable.Apis;
    columns: DataTable.Columns;
    editFileds: DataTable.EditFields;
}
const props = withDefaults(defineProps<Props>(), {
    id: 'id'
});

// search
const search = useSearch(props.columns);

// pagination
const pagination = reactive({
    pageNum: 1,
    pageSize: 10
})

// table
const params = computed(() => {
    return {
        ...search.params,
        ...pagination
    }
})
const table = useTable(props.apis, params);

// dialogForm
const editor = useEditor(props.editFileds, props.apis, props.id);

async function handleDelete(row: any) {
    try {
        await editor.remove(row);
        table.getList();
    } catch (e) { 
        console.error(e);
    }
}

async function handleEdit(done: () => void) {
    await editor.edit();
    done();
    table.getList();
}

</script>

<style scoped>
</style>