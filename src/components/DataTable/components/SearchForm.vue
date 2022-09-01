<template>
    <FormRendererVue ref="searchRef" :model="props.model" :fields="props.files" inline>
        <template #footer>
            <ElButton @click="handleSearch">搜索</ElButton>
            <ElButton @click="handleReset">重置</ElButton>
        </template>
    </FormRendererVue>
</template>

<script setup lang="ts">
import type { FormRenderer, SearchForm } from '../types';
import FormRendererVue from './FormRenderer.vue';

interface Props {
    model: FormRenderer.Model;
    files: FormRenderer.Fields;
}
const props = defineProps<Props>();

interface Emits {
    (e: 'search'): void;
    (e: 'reset'): void;
}
const emits = defineEmits<Emits>();

function handleSearch() {
    emits('search');
}

const searchRef = ref<InstanceType<typeof FormRendererVue>>();
function handleReset() {
    searchRef.value?.resetFields();
    emits('reset');
}

</script>

<style scoped>
</style>