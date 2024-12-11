<template>
    <div :key="props.id" :class="`node-container ${isEditable && 'editable'}`">
        <div v-if="!isReadOnly">
            <div class="title">
                <VIcon class="icon">{{ NodeIcons[props.type] }}</VIcon> {{ props.label }}
                <VIcon v-if="props.type !== 'trigger'" @click="onEditClicked" class="edit-icon">
                    mdi-pencil
                </VIcon>
            </div>
            <div class="description">
                <VTooltip v-if="trimmedDescription.trim() !== description.trim()" :text="description">
                    <template v-slot:activator="{ props }">
                        <span v-bind="props">{{ trimmedDescription }}</span>
                    </template>
                </VTooltip>
                <span v-else>{{ description }}</span>
            </div>
        </div>

        <AddNewNode v-bind="props" v-else></AddNewNode>
    </div>

    <div class="add-new-node" v-if="isLeafNode">
        <div class="dotted-line"></div>
        <AddNewNodeIcon :node-id="props.id"></AddNewNodeIcon>
    </div>
</template>

<script lang="ts" setup>
import { useVueFlow } from '@vue-flow/core';
import { useNodeStore } from '~/store/useNodeStore';
import type { CustomNode } from '~/utils/types';

const props = defineProps<CustomNode>();
const { edges } = useVueFlow();
const isReadOnly = computed(() => props.data?.isNew);
const isEditable = computed(() => props.data?.isEditable);
const isLeafNode = computed(() => !edges.value.some((edge) => edge.source === props.id));
const description = computed(() => props.data.description);
const trimmedDescription = computed(() =>
    description.value.length > 20
        ? `${description.value.substring(0, 20)}...`
        : description.value
);

const { toggleEdit } = useNodeStore();

const onEditClicked = () => toggleEdit(props.id);

onMounted(() => {
    const route = useRoute();
    const nodeId = route.query.nodeId;

    if (nodeId === props.id) {
        toggleEdit(nodeId);
    }
});
</script>

<style lang="scss" scoped>
$border-color: black;
$editable-border-color: orange;
$icon-color: orange;
$dotted-line-color: gray;

.node-container {
    border: 1px solid $border-color;
    width: 250px;
    text-align: center;
    border-radius: 10px;
}

.editable {
    border: 2px dashed $editable-border-color;
}

.dotted-line {
    bottom: 50px;
    width: 2px;
    background: repeating-linear-gradient(to bottom,
            $dotted-line-color,
            $dotted-line-color 5px,
            transparent 5px,
            transparent 10px);
    height: 50px;
    margin: auto;
}

.add-new-node {
    margin: auto;
    text-align: center;
}

.title {
    position: relative;
    border-bottom: 1px solid;
    padding: 10px;
    font-weight: bold;
}

.description {
    padding: 10px;
    font-size: 0.9rem;
}

.icon {
    color: $icon-color;
    font-weight: bold;
}

.edit-icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: $icon-color;
}
</style>