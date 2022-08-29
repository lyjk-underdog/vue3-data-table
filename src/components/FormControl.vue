<template>
    <template v-if="props.target === 'input'">
        <ElInput v-bind="$attrs" />
    </template>

    <template v-else-if="props.target === 'select'">
        <ElSelect v-bind="$attrs">
            <ElOption v-for="(option, index) in props.options" :key="index" :label="option.label" :value="option.value">
            </ElOption>
        </ElSelect>
    </template>

    <template v-else-if="props.target === 'switch'">
        <ElSwitch v-bind="$attrs" />
    </template>

    <template v-else>
        <component :is="props.target" v-bind="$attrs"></component>
    </template>
</template>


<script lang="ts">





</script>
<script setup lang="ts">
import type { Component } from 'vue';

export type Target = 'input' | 'select' | 'switch' | Component;

type Props = {
    target: Target,
    options?: any[],
}
const props = defineProps<Props>();


</script>

<style scoped>
</style>