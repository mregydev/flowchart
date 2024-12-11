<script lang="ts" setup>
import { computed } from 'vue';
import type { EdgeProps } from '@vue-flow/core';
import { EdgeLabelRenderer, getSmoothStepPath } from '@vue-flow/core';

const props = defineProps<EdgeProps>();

const pathData = computed(() => {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;

  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 20,
  });

  return { path, labelX, labelY, targetX, targetY };
});
</script>

<template>
  <path :d="pathData.path" stroke="orange" stroke-width="2" fill="none" />
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -220%) translate(${pathData.targetX}px, ${pathData.targetY}px)`,
      }"
    >
      <div class="text-label">{{ props.label }}</div>
    </div>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${pathData.targetX}px, ${pathData.targetY - 20}px)`,
      }"
    >
      <AddNewNodeIcon :node-id="props.source"></AddNewNodeIcon>
    </div>
  </EdgeLabelRenderer>
</template>

<style lang="scss" scoped>
$text-label-bg: #f0f8ff;
$text-label-color: blue;

.text-label {
  background-color: $text-label-bg;
  color: $text-label-color;
  padding: 5px;
}
</style>
