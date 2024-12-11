<template>
  <button class="edgebutton" @click="handleAddNewNode">+</button>
</template>

<script lang="ts" setup>
import { useNodeStore } from '~/store/useNodeStore';

export interface AddNewNodeProps {
  nodeId: string;
}

const { nodeId } = defineProps<AddNewNodeProps>();
const { addNewNode } = useNodeStore();
const handleAddNewNode = () => {
  addNewNode(nodeId);
};
</script>

<style lang="scss">
$button-border-color: pink;
$button-text-color: pink;
$button-background-color: white;

.edgebutton {
  border-radius: 50%;
  cursor: pointer;
  color: $button-text-color;
  font-weight: bold;
  border: 2px solid $button-border-color;
  z-index: 1000;
  background: $button-background-color;
  width: 30px;
  height: 30px;
  text-align: center;
}
</style>
