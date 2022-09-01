<template>
    <div class="c-data-table">

        <!-- dialogForm -->
        <DialogFormVue v-model:visible="dialogForm.visible" :model="props.editor.model" :fields="props.editor.fields"
            :read-api="props.apis.read!" :target-id="dialogForm.targetId" :mode="dialogForm.mode" />

        <div class="c-data-table_header">
            <SearchForm :model="searchParams" :files="searchFields" @search="getList" @reset="getList" />
        </div>

        <div class="c-data-table_body">
            <ElRow :gutter="10">
                <ElCol :span="1.5">
                    <el-button @click="() => openDialogForm(DialogFormTypes.Mode.Create)">新增</el-button>
                </ElCol>
            </ElRow>

            <ElTable v-loading="loading" :data="list">
                <ElTableColumn type="index" label="序号" align="center" />
                <ElTableColumn v-for="(column, index) in props.columns" :key="index" min-width="100" align="center"
                    :label="column.label" :prop="column.prop" :formatter="column.formatter" />
                <ElTableColumn label="操作" align="center">
                    <template #default="{ row }">
                        <el-button @click="() => openDialogForm(DialogFormTypes.Mode.Update, row)">修改</el-button>
                        <el-button @click="">删除</el-button>
                    </template>
                </ElTableColumn>
            </ElTable>
        </div>

        <div class="c-data-table_footer">
            <ElPagination :total="total" v-model:page-size="pageSize" v-model:current-page="pageNum"
                @current-change="getList" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TableDataTypes, FormRendererTypes } from './types';
import { DialogFormTypes } from './types';
import { ref, onBeforeMount, onMounted, reactive } from 'vue';
import SearchForm from './components/SearchForm.vue';
import DialogFormVue from './components/DialogForm.vue';


interface Props {
    id?: string;
    apis: TableDataTypes.Apis;
    columns: TableDataTypes.Column[];
    editor: TableDataTypes.Editor;
}
const props = withDefaults(defineProps<Props>(), {
    id: 'id'
});

// 根据columns构造查询参数
let searchParams = ref<Record<string, any>>({});
onBeforeMount(() => {
    for (let col of props.columns) {
        if (col.search) {
            searchParams.value[col.prop] = col.search.default ?? null;
        }
    }
})

// 根据columns构造搜索表单字段
let searchFields: FormRendererTypes.Field[] = [];
onBeforeMount(() => {
    for (let col of props.columns) {
        if (col.search) {
            searchFields.push({
                type: col.search.type,
                label: col.label,
                prop: col.prop,
                options: col.search.options,
                attrs: col.search.attrs,
            })
        }
    }
})


// pagination
let pageSize = ref(10);
let pageNum = ref(1);
let total = ref(0);

// table
let loading = ref(false);
let list = ref<any[]>([]);

async function getList() {
    loading.value = true;

    let { data } = await props.apis.list({ ...searchParams.value, pageSize: pageSize.value, pageNum: pageNum.value });
    list.value = data.rows;
    total.value = data.total;

    loading.value = false;
}

onMounted(() => {
    getList();
})

// dialogForm
const dialogForm = reactive({
    visible: false,
    mode: DialogFormTypes.Mode.Create,
    targetId: ''
})

function openDialogForm(mode: DialogFormTypes.Mode, row?: any) {

    dialogForm.visible = true;
    dialogForm.mode = mode;

    if (mode === DialogFormTypes.Mode.Create) {
        dialogForm.targetId = '';
    }

    if (mode === DialogFormTypes.Mode.Update) {
        dialogForm.targetId = row[props.id];
    }
}





</script>

<style scoped>
</style>