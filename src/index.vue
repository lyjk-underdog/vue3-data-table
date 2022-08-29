<template>
  <div class="table-data">
    <div class="table-data_header">
      <!-- query form -->
      <ElForm :model="queryParams" inline>
        <ElFormItem v-for="(field, index) in queryFields" :key="index" :label="field.label" :prop="field.prop">
          <FormControl v-model="queryParams[field.prop]" :target="field.target" :options="field.options"
            v-bind="field.attrs" />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" :icon="Search" @click="getList">搜索</ElButton>
          <ElButton :icon="Refresh" @click="resetQueryData(), getList()">重置</ElButton>
        </ElFormItem>
      </ElForm>
    </div>

    <div class="table-data_body">
      <!-- operate header -->
      <ElRow :gutter="10">
        <ElCol :span="1.5">
          <ElButton type="primary" plain @click="">新增</ElButton>
        </ElCol>
        <ElCol :span="1.5">
          <ElButton type="danger" plain @click="">删除
          </ElButton>
        </ElCol>
      </ElRow>

      <!-- table info -->
      <ElTable ref="table" v-loading="loading" :data="list">
        <ElTableColumn type="index" label="序号" align="center" />
        <ElTableColumn v-for="(column, index) in columns" :key="index" min-width="100" align="center"
          :label="column.label" :prop="column.prop" :formatter="column.formatter" />
        <ElTableColumn label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="{ row }">
            <ElButton link @click="">详情
            </ElButton>
            <ElButton link @click="">修改
            </ElButton>
            <ElButton link @click="">删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <ElPagination :total="total" v-model:page-size="pageSize" v-model:current-page="pageNum"
        @current-change="getList" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, reactive, ref } from 'vue';
import type * as FormControlTypes from "@/components/FormControl.vue";
import apis from '@/apis/table'
import type { Ref } from 'vue';
import { Search, Refresh } from "@element-plus/icons-vue";

type UnRef<T> = T extends Ref<infer U> ? U : any;

// Table types
type Loading = boolean;
type List = {
  name: string | null,
  address: string | null
}[];
type Column = {
  label: string,
  prop: keyof UnRef<List>[number],
  formatter?: () => JSX.Element
}
type Total = number;

// Query types
type QueryForm = {
  name: string | null,
  address: string | null
}
type QueryField = {
  target: FormControlTypes.Target;
  label: string;
  prop: keyof QueryForm;
  options?: any[];
  attrs?: Record<string, unknown>;
}

// Pagination types
type PageSize = number;
type PageNum = number;
type PaginationParams = {
  pageNum: PageNum,
  pageSize: PageSize
}


// Table Logic
let useTable = (queryParams: Ref<QueryForm>, paginationParams: Ref<PaginationParams>) => {
  let loading: Ref<Loading> = ref(false);
  let list: Ref<List> = ref([]);
  let total: Ref<Total> = ref(0);
  let columns: Column[] = [
    {
      label: '姓名',
      prop: 'name',
    }
  ]

  async function getList() {
    loading.value = true;
    let { data } = await apis.getList({ ...queryParams.value, ...paginationParams.value });
    list.value = data.rows;
    total.value = data.total;
    loading.value = false;
  }

  onMounted(() => {
    getList()
  })

  return {
    loading,
    list,
    columns,
    total,
    getList,
  }
}

// Query Logic
let useQuery = () => {
  let form: Ref<QueryForm> = ref(dataModel());
  let fields: QueryField[] = [
    {
      target: 'input',
      label: '姓名',
      prop: 'name'
    },
    {
      target: 'input',
      label: '地址',
      prop: 'address'
    }
  ]

  function dataModel(): QueryForm {
    return {
      name: null,
      address: null
    }
  }

  function resetData() {
    form.value = dataModel();
  }

  return {
    queryParams: form,
    queryFields: fields,
    resetQueryData: resetData
  }
}

// Pagination Logic
let usePagination = () => {
  let pageNum: Ref<PageNum> = ref(1);
  let pageSize: Ref<PageSize> = ref(10);
  let paginationParams: Ref<PaginationParams> = ref({
    pageNum,
    pageSize
  })

  return {
    pageNum,
    pageSize,
    paginationParams
  }
}

// main
const { queryParams, queryFields, resetQueryData } = useQuery();
const { pageNum, pageSize, paginationParams } = usePagination();
const { loading, list, columns, total, getList } = useTable(queryParams, paginationParams);







</script>

<style scoped>
</style>