<template>
    <ElDialog width="600px" :model-value="props.visible"
        @update:model-value="(visible: boolean) => $emit('update:visible', visible)" append-to-body
        :close-on-click-modal="false" :close-on-press-escape="false" :show-close="props.mode === EditForm.Mode.View"
        @close="handleCancel">

        <div v-loading="props.loading">
            <FormRendererVue ref="editFormRef" :disabled="disabled" :model="props.model" :fields="props.fields" />

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
    model: EditForm.Props.Model;
    fields: EditForm.Props.Fields;
    mode: EditForm.Props.Mode;
    visible?: EditForm.Props.Visible;
    loading?: EditForm.Props.Loading;
}
const props = withDefaults(defineProps<Props>(), {
    visible: false,
    loading: true
})

provide(EditForm.Provide.visibleKey, toRef(props, 'visible'));

interface Emits {
    (e: 'update:visible', visible: EditForm.Events.UpdateVisible): void;
    (e: 'submit', done: EditForm.Events.Submit): void;
}
const emits = defineEmits<Emits>();

const editFormRef = ref<InstanceType<typeof FormRendererVue>>();
const submiting = ref(false);
const disabled = computed(() => submiting.value || props.mode === EditForm.Mode.View);

function handleSubmit() {
    editFormRef.value?.validate((valid) => {
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
    editFormRef.value?.resetFields();
    emits('update:visible', false);
}
</script>

<style scoped>
</style>