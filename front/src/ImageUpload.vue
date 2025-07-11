<template>
  <div class="image-preview-wrapper" v-if="!!imagePreview">
    <img :src="imagePreview" :style="maxPreviewHeight ? `max-height: ${maxPreviewHeight}px` : ''">

    <button class="remove-btn" @click="removeImage">×</button>
  </div>
  <input ref="file-input" type="file" @change="fileSelected">
</template>

<script setup lang="ts">
import { computed, ref, type Ref, useTemplateRef, watch } from "vue";

const { currentPreview } = defineProps<{
  currentPreview: string | null,
  maxPreviewHeight: number | null,
}>();

const emit = defineEmits<{
  oldImageRemoved: [],
  newImageSelected: [file: File],
  newImageRemoved: [],
}>();

const fileInput = useTemplateRef('file-input');
const file: Ref<File | undefined> = ref(undefined);
const newPreview: Ref<string | undefined> = ref(undefined);

const imagePreview = computed(() => newPreview.value || currentPreview || undefined);

function fileSelected(e: Event) {
  const fileInput = e.target as HTMLInputElement;
  file.value = fileInput?.files?.[0];
  if (file.value) {
    emit('newImageSelected', file.value);
  }
}

function removeImage() {
  if (newPreview.value || file.value) {
    newPreview.value = undefined;
    file.value = undefined;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    emit('newImageRemoved');
  }
  else if (currentPreview) {
    emit('oldImageRemoved');
  }
}

watch(file, (newFile) => {
  if (!newFile) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    newPreview.value = e?.target?.result as string | undefined; // base64 data URL
  };
  reader.readAsDataURL(newFile);
});
</script>

<style scoped>
.image-preview-wrapper {
  position: relative;
  display: inline-block;
}

.image-preview-wrapper img {
  display: block;
  border-radius: 6px;
  max-width: 100%;
  height: auto;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}

</style>