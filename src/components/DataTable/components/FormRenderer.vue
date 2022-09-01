<template>
    <ElForm ref="elFormRef" :model="props.model" :inline="props.inline" :disabled="props.disabled">
        <ElFormItem v-for="(field, index) in props.fields" :key="index" :label="field.label" :prop="field.prop"
            :rules="field.rules">

            <template v-if="field.type === 'input'">
                <ElInput :model-value="operateForm('get', field.prop)"
                    @update:model-value="(newVal) => operateForm('set', field.prop, newVal)" v-bind="field.attrs" />
            </template>

            <template v-else-if="field.type === 'select'">
                <ElSelect :model-value="operateForm('get', field.prop)"
                    @update:model-value="(newVal) => operateForm('set', field.prop, newVal)" v-bind="field.attrs">
                    <ElOption v-for="(option, index) in field.options" :key="index" :label="option.label"
                        :value="option.value">
                    </ElOption>
                </ElSelect>
            </template>

            <template v-else>
                <component :model-value="operateForm('get', field.prop)"
                    @update:model-value="(newVal: any) => operateForm('set', field.prop, newVal)" :is="field.type"
                    v-bind="$attrs"></component>
            </template>
        </ElFormItem>
        <ElFormItem v-if="$slots.footer">
            <slot name="footer"></slot>
        </ElFormItem>
    </ElForm>
</template>

<script setup lang="ts">
import type { FormRendererTypes } from '../types';
import type { ElForm, FormValidateCallback, FormItemProp } from 'element-plus';
import { ref , onUpdated } from 'vue';
import type { Arrayable } from 'element-plus/es/utils/typescript';

interface Props {
    model: Record<string, any>;
    fields: FormRendererTypes.Field[];
    inline?: boolean;
    disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    fields: () => [],
    inline: false,
    disabled: false
});

let elFormRef = ref<InstanceType<typeof ElForm> | null>(null);

function operateForm(type: 'set' | 'get', prop: FormRendererTypes.Field['prop'], val?: any) {
    const propArr = typeof prop === 'string' ? prop.split('.') : prop;

    if (type === 'get') {
        return propArr.reduce((o, p) => o[p], props.model);
    }

    if (type === 'set') {
        const propSegment = propArr.slice(0, -1);
        const propLast = propArr.slice(-1)[0];

        return propSegment.reduce((o, p) => o[p], props.model)[propLast] = val;
    }
}

function validate(callback?: FormValidateCallback | undefined) {
    return elFormRef.value?.validate(callback);
}

function resetFields(props?: Arrayable<FormItemProp> | undefined) {
    return elFormRef.value?.resetFields(props);
}

function clearValidate(props?: Arrayable<FormItemProp> | undefined) {
    return elFormRef.value?.clearValidate(props);
}

onUpdated(() => {
    console.log(1);
    
})

defineExpose({
    validate,
    resetFields,
    clearValidate
})

</script>

<style scoped>
</style>