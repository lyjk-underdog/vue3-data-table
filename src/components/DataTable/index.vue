<template>
    <div class="c-data-table">
        <div class="c-data-table_header">
            <SearchForm :model="searchParams" :files="searchFields" @search="getList" @reset="getList" />
        </div>

        <div class="c-data-table_body">
            <ElTable v-loading="loading" :data="list">
                <ElTableColumn type="index" label="序号" align="center" />
                <ElTableColumn v-for="(column, index) in props.columns" :key="index" min-width="100" align="center"
                    :label="column.label" :prop="column.prop" :formatter="column.formatter" />
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
import { ref, onBeforeMount, onMounted } from 'vue';
import SearchForm from './components/SearchForm.vue';


interface Props {
    apis: TableDataTypes.Apis;
    columns: TableDataTypes.Column[];
}
const props = defineProps<Props>();

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



</script>

<style scoped>
</style>