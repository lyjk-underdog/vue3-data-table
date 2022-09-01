<template>
    <DataTable :apis="apis" :columns="columns" :editor="editor" />
</template>

<script setup lang="tsx">
import type { TableDataTypes } from '@/components/DataTable/types'
import DataTable from '@/components/DataTable/index.vue';
import tableApis from '@/apis/table';

const apis: TableDataTypes.Apis = {
    list: tableApis.getList,
    read: tableApis.getInfo
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

const editor: TableDataTypes.Editor = {
    model: {
        name: null
    },
    fields: [
        {
            type: 'input',
            label: '姓名',
            prop: 'name',
        }
    ]
}

</script>

<style scoped>
</style>