<template>
    <DataTableVue :apis="apis" :columns="columns" :edit-fileds="editFileds">

    </DataTableVue>
</template>

<script setup lang="tsx">
import type { DataTable } from '@/components/DataTable/types'
import DataTableVue from '@/components/DataTable/index.vue';
import tableApis from '@/apis/table';

const apis: DataTable.Apis = {
    list: tableApis.list as DataTable.Apis['list'],
    read: tableApis.info,
    create: tableApis.create as DataTable.Apis['create'],
    update: tableApis.update as DataTable.Apis['update'],
    remove: tableApis.remove
}

let a = []
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

<style>
html,
body {
    padding: 0;
    margin: 0;
    height: 100%;
}

body {
    background-color: #F5F5F5;
}
</style>