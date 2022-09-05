<template>
    <ElForm ref="elFormRef" :model="props.model" :inline="props.inline" :disabled="props.disabled">
        <ElFormItem v-for="(field, index) in props.fields" :key="index" :label="field.label" :prop="field.prop"
            :rules="field.rules">

            <template v-if="field.type === 'input'">
                <ElInput v-model="props.model[field.prop]" v-bind="field.attrs" />
            </template>

            <template v-else-if="field.type === 'select'">
                <ElSelect v-model="props.model[field.prop]" v-bind="field.attrs">
                    <ElOption v-for="(option, index) in field.options" :key="index" :label="option.label"
                        :value="option.value">
                    </ElOption>
                </ElSelect>
            </template>

            <template v-else>
                <component v-model="props.model[field.prop]" :is="field.type" v-bind="$attrs"></component>
            </template>
        </ElFormItem>
        <ElFormItem v-if="$slots.footer">
            <slot name="footer"></slot>
        </ElFormItem>
    </ElForm>
</template>

<script setup lang="ts">
import type { FormRenderer } from '../types';
import type { ElForm, FormValidateCallback, FormItemProp } from 'element-plus';
import type { Arrayable } from 'element-plus/es/utils/typescript';

interface Props {
    model: FormRenderer.Props.Model;
    fields: FormRenderer.Props.Fields;
    inline?: FormRenderer.Props.Inline;
    disabled?: FormRenderer.Props.Disabled;
}
const props = withDefaults(defineProps<Props>(), {
    inline: false,
    disabled: false
});

let elFormRef = ref<InstanceType<typeof ElForm>>();

function validate(callback?: FormValidateCallback | undefined) {
    return elFormRef.value?.validate(callback);
}

function resetFields(itemPorps?: Arrayable<FormItemProp> | undefined) {
    return elFormRef.value?.resetFields(itemPorps);
}

function clearValidate(itemPorps?: Arrayable<FormItemProp> | undefined) {
    return elFormRef.value?.clearValidate(itemPorps);
}

defineExpose({
    validate,
    resetFields,
    clearValidate
})

</script>

<style scoped lang="scss">
:deep(.el-form-item) {
    .el-form-item__label {
        font-weight: 700;
    }
}
</style>