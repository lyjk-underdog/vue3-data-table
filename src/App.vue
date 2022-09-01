<template>
    <DataTableVue :apis="apis" :columns="columns" :edit-fileds="editFileds" />
</template>

<script setup lang="tsx">
import type { DataTable } from '@/components/DataTable/types'
import DataTableVue from '@/components/DataTable/index.vue';
import tableApis from '@/apis/table';

const apis: DataTable.Apis = {
    list: tableApis.getList,
    read: tableApis.getInfo,
    create: tableApis.create,
    update: tableApis.update,
    remove: tableApis.remove
}

const columns: DataTable.Columns = [
    {
        label: '姓名',
        prop: 'name',
        formatter: (row) => <span style="color:red">{row.name}</span>,
        search: {
            type: 'input',
        }
    },
    {
        label: '年龄',
        prop: 'age',
        search: {
            type: 'input',
        }
    }
]

const editFileds: DataTable.EditFields = [
    {
        type: 'input',
        label: '姓名',
        prop: 'name',
        rules: {
            required: true
        }
    },

    {
        type: 'input',
        label: '年龄',
        prop: 'age',
        rules: {
            required: true
        }
    }
]


</script>

<style scoped>
</style>