<template>
    <ElDialog width="600px" :model-value="props.visible" @update:model-value="(visible: boolean) => $emit('update:visible', visible)"
        append-to-body :close-on-click-modal="false" :close-on-press-escape="false"
        :show-close="props.mode === EditForm.Mode.View" @close="handleCancel">

        <div v-loading="props.loading">
            <FormRendererVue ref="editeFormRef" :disabled="disabled" :model="props.model" :fields="props.fields" />

            <div slot="footer" v-if="props.mode !== EditForm.Mode.View">
                <ElButton type="primary" :loading="submiting" @click="handleSubmit">保存</ElButton>
                <ElButton v-show="!submiting" @click="handleCancel">取 消</ElButton>
            </div>
        </div>

    </ElDialog>
</template>

<script setup lang="ts">
import { EditForm } from '../types';
import FormRendererVue from './FormRenderer.vue';

interface Props {
    model: EditForm.Model;
    fields: EditForm.Fields;
    mode: EditForm.Mode;
    visible?: EditForm.Visible;
    loading?: EditForm.Loading;
}
const props = withDefaults(defineProps<Props>(), {
    visible: false,
    loading: true
})

interface Emits {
    (e: 'update:visible', visible: boolean): void;
    (e: 'submit', done: () => void): void;
}
const emits = defineEmits<Emits>();


const editeFormRef = ref<InstanceType<typeof FormRendererVue>>();
const submiting = ref(false);
const disabled = computed(() => submiting.value || props.mode === EditForm.Mode.View);

function handleSubmit() {
    editeFormRef.value?.validate((valid) => {
        if (valid) {
            new Promise<void>((resolve) => {
                submiting.value = true;

                emits('submit', resolve);
            }).then(() => {
                submiting.value = false;
            })
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