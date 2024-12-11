<template>
    <VForm class="add-node-details" v-model="isValid" fast-fail @submit.prevent="addButtonClickHandler">
        <VTextField v-model="title" :rules="rules" label="Title"></VTextField>
        <VTextarea v-model="description" :rules="rules" label="Description"></VTextarea>
        <VSelect :items="['addComment', 'dateTime', 'sendMessage']" label="Type" v-model="nodeType"></VSelect>
        <VBtn class="save-btn" type="submit" block>Submit</VBtn>
    </VForm>
</template>

<script lang="ts" setup>
import { VBtn, VTextarea, VTextField } from 'vuetify/components';
import { useNodeStore } from '~/store/useNodeStore';
import { type CustomNode } from '../utils/types';

const props = defineProps<CustomNode>();

const title = ref('');
const description = ref('');
const isValid = ref(false);
const nodeType = ref<NodeType>('addComment');

const { updateNodeData } = useNodeStore();

const rules = getFormRules();


const addButtonClickHandler = () => {
    if (isValid.value) {
        updateNodeData(props.id, nodeType.value, {
            label: title.value,
            description: description.value,
        });
    }
};
</script>

<style lang="scss" scoped>
$btn-background-color: orange;
$btn-text-color: white;

.add-node-details {
    padding: 10px;
}

.title {
    border-bottom: 1px solid;
    padding: 10px;
    font-weight: bold;
}

.description {
    padding: 10px;
    height: 100px;
}

.node-type {
    padding: 10px;
}

.save-btn {
    background: $btn-background-color;
    color: $btn-text-color;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>