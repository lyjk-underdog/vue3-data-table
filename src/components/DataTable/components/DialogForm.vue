<template>
    <ElDialog :model-value="props.visible" @update:model-value="(visible: boolean) => $emit('update:visible', visible)"
        append-to-body @close="handleCancel">

        <FormRendererVue ref="editeFormRef" :model="props.model" :fields="props.fields" />

        <div slot="footer">
            <ElButton type="primary" @click="handleSubmit">保存</ElButton>
            <ElButton @click="handleCancel">取 消</ElButton>
        </div>
    </ElDialog>
</template>

<script setup lang="ts">
import type { EditeForm } from '../types';
import FormRendererVue from './FormRenderer.vue';

interface Props {
    model: EditeForm.Model;
    fields: EditeForm.Fields;
    mode: EditeForm.Mode;
    visible?: EditeForm.Visible;
}
const props = withDefaults(defineProps<Props>(), {
    visible: false
})

interface Emits {
    (e: 'update:visible', visible: boolean): void;
    (e: 'submit'): void;
}
const emits = defineEmits<Emits>();


const editeFormRef = ref<InstanceType<typeof FormRendererVue>>();

function handleSubmit() {
    editeFormRef.value?.validate((valid) => {
        if (valid) {
            emits('submit');
        }
    })
}

function handleCancel() {
    editeFormRef.value?.resetFields();
    emits('update:visible', false);
}
</script>

<style scoped>
</style>