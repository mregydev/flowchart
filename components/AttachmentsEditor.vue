<template>
    <v-file-input label="Upload Image" accept="image/*" v-model="file"></v-file-input>
    <div class="image-viewer-container">
      <v-row>
        <v-col
          v-for="(image, index) in imageUrls"
          :key="index"
          cols="12"
          sm="4"
          md="6"
          class="row"
        >
          <v-img
            :src="image"
            class="image-tile"
            aspect-ratio="1"
            alt="Image Tile"
            width="100"
          ></v-img>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps<{ imageUrls: string[] }>();
  const emit = defineEmits(["imagesChange"]);
  const file = ref<File>();
  const imageUrls = ref(props.imageUrls || []);
  
  watch(file, () => {
    const reader = new FileReader();
  
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const base64String = e.target?.result;
      imageUrls.value.push(base64String?.toString() ?? "");
      emit("imagesChange", imageUrls);
    };
  
    reader.readAsDataURL(file.value as Blob);
  });
  </script>
  
  <style lang="scss" scoped>
  $image-tile-shadow: rgba(0, 0, 0, 0.1);
  $image-tile-border-radius: 8px;
  
  .image-viewer-container {
    display: flex;
    height: auto;
  
    .row {
      flex: 1;
    }
  
    .image-tile {
      border-radius: $image-tile-border-radius;
      overflow: hidden;
      box-shadow: 0 4px 6px $image-tile-shadow;
    }
  }
  </style>
  