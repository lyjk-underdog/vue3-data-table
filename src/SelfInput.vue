<template>
    <div>
        <div>自定义Input</div>
        <ElInput :model-value="props.modelValue" @update:model-value="(val) => $emit('update:modelValue', val)" />
    </div>
</template>

<script setup lang="ts">
import { EditForm } from '@/components/DataTable/types';
import type { Ref } from 'vue';

interface Props {
    modelValue?: string,
}
const props = defineProps<Props>();

interface Emits {
    (e: 'update:modelValue', value: string): void
}

const editFormVisible = inject(EditForm.Provide.visibleKey) as Ref<boolean>
watch(editFormVisible, (status) => {
    console.log('editform visible：', status);
}, { immediate: true })

const editFormContext = inject(EditForm.Provide.formContextKey) as EditForm.Provide.FormContext;
watch(() => editFormContext.disabled, (status) => {
    console.log('editForm disabled：', status);
}, { immediate: true })
</script>

<style scoped>
</style>