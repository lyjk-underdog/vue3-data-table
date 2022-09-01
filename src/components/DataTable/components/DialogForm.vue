<template>
    <ElDialog :model-value="props.visible" @update:model-value="(visible) => $emit('update:visible', visible)"
        append-to-body @close="handleCancel">

        <FormRendererVue ref="dialogFormRef" :model="props.model" :fields="props.fields" />

        <div slot="footer">
            <ElButton type="primary" @click="handleSubmit">保存</ElButton>
            <ElButton @click="handleCancel">取 消</ElButton>
        </div>
    </ElDialog>
</template>

<script setup lang="ts">
import { DialogFormTypes } from '../types';
import FormRendererVue from './FormRenderer.vue';
import { ref, watch } from 'vue';

interface Props {
    model: DialogFormTypes.Model;
    fields: DialogFormTypes.Field[];
    mode: DialogFormTypes.Mode;
    readApi: DialogFormTypes.ReadApi;
    targetId: string;
    visible?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    visible: false
})

interface Emits {
    (e: 'update:visible', visible: boolean): void;
    (e: 'submit', mode: DialogFormTypes.Mode): void;
}
const emits = defineEmits<Emits>();

function handleCancel() {
    emits('update:visible', false);
}

const dialogFormRef = ref<InstanceType<typeof FormRendererVue>>();
function handleSubmit() {
    dialogFormRef.value?.validate((valid) => {
        if (valid) {
            emits('submit', props.mode);
        }
    })
}

watch(() => props.visible, async (newStatus) => {


    if (newStatus === true) {

        dialogFormRef.value?.clearValidate();

        if (props.mode === DialogFormTypes.Mode.Create) {
            dialogFormRef.value?.resetFields();
            return;
        }

        if (props.mode === DialogFormTypes.Mode.Update) {
            let { data } = await props.readApi(props.targetId);
            Object.assign(props.model , data);            
            return;
        }
    }
} , {immediate: true})
</script>

<style scoped>
</style>