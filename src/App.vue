<template>
    <DataTable :apis="apis" :columns="columns" />
</template>

<script setup lang="tsx">
import type { TableDataTypes } from '@/components/DataTable/types'
import DataTable from '@/components/DataTable/index.vue';
import tableApis from '@/apis/table';

const apis: TableDataTypes.Apis = {
    list: tableApis.getList
}

const columns: TableDataTypes.Column[] = [
    {
        label: '姓名',
        prop: 'name',
        formatter: (row) => <span style="color:red">{row.name}</span>,
        search: {
            type: 'input',
        }
    }
]

</script>

<style scoped>
</style>