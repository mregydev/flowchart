<template>
    <div class="edit-container">
      <div class="editor-title">
        <VIcon class="icon">{{ NodeIcons[selectedNode.type] }}</VIcon>
        {{ selectedNode.type.toUpperCase() }}
        <VIcon class="delete-icon" @click="removeButtonClicked">mdi-delete</VIcon>
      </div>
      <VForm
        class="edit-node-form"
        v-model="isValid"
        fast-fail
        @submit.prevent="editButtonClicked"
      >
        <VTextField
          variant="solo"
          v-model="label"
          :rules="rules"
          label="Title"
        ></VTextField>
        <VTextarea
          variant="solo"
          v-model="description"
          :rules="rules"
          label="Description"
        ></VTextarea>
        <AttachmentsEditor
          :image-urls="selectedNode?.data.imagesUrls"
          @imagesChange="imagesChanged"
          v-if="selectedNode?.type === 'sendMessage'"
        ></AttachmentsEditor>
        <VBtn class="edit-btn" color="primary" type="submit" block>Submit</VBtn>
      </VForm>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useNodeStore } from '~/store/useNodeStore';
  import AttachmentsEditor from './AttachmentsEditor.vue';
  
  const isValid = ref(true);
  const store = useNodeStore();
  const { updateNodeData, removeNode } = store;
  const { selectedNode } = storeToRefs(store);
  
  const label = ref(selectedNode.value?.label);
  const description = ref(selectedNode.value?.data.description);
  
  const imagesChanged = (images: string[]) => {
    if (selectedNode.value) {
      selectedNode.value.data.imagesUrls = images;
    }
  };
  
  const editButtonClicked = () => {
    if (selectedNode.value) {
      updateNodeData(selectedNode.value.id, selectedNode.value.type, {
        ...selectedNode.value.data,
        label: label.value,
        description: description.value,
      });
    }
  };
  
  const removeButtonClicked = () => removeNode(selectedNode.id);
  
  const rules = getFormRules();
  
  watch(selectedNode, () => {
    label.value = selectedNode.value?.label;
    description.value = selectedNode.value?.data.description;
  });
  </script>
  
  <style lang="scss" scoped>
  $delete-icon-color: #ff4d4d;
  
  .editor-title {
    margin-bottom: 20px;
    position: relative;
  }
  
  input {
    background-color: white;
  }
  
  .edit-container {
    padding: 20px;
  }
  
  .edit-btn {
    font-weight: bold;
  }
  
  .delete-icon {
    position: absolute;
    right: 10px;
    color: $delete-icon-color;
    cursor: pointer;
    font-size: 2rem;
  }
  </style>
  