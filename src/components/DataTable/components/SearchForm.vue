<template>
    <FormRenderer ref="searchRef" :model="props.model" :fields="props.files" inline>
        <template #footer>
            <ElButton @click="handleSearch">搜索</ElButton>
            <ElButton @click="handleReset">重置</ElButton>
        </template>
    </FormRenderer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormRendererTypes } from '../types';
import FormRenderer from './FormRenderer.vue';

interface Props {
    model: Record<string, any>;
    files: FormRendererTypes.Field[];
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

const searchRef = ref<InstanceType<typeof FormRenderer>>();
function handleReset() {
    searchRef.value?.resetFields();
    emits('reset');
}

</script>

<style scoped>
</style>