<template>
  <div class="modal" v-if="show">
    <div class="modal-content p-3 rounded shadow-sm">
      <h3 class="mt-1 mb-3">{{ t('createNewUser') }}</h3>

      <div class="form-group mb-3">
        <label class="d-block mb-2 text-bold">{{ t('name') }}:</label>
        <input v-model="name" :placeholder="t('enterName')" class="w-100"/>
      </div>

      <div class="form-group mb-3">
        <label class="d-block mb-2 text-bold">{{ t('profileImage') }}:</label>
        <ImageUpload
            :current-preview="null"
            :max-preview-height="120"
            @old-image-removed="onImageRemoved"
            @new-image-selected="onImageSelected"
            @new-image-removed="onImageRemoved"
        />
      </div>

      <div class="modal-actions d-flex justify-content-end gap-2 mt-3">
        <button @click="createUser" class="btn btn-primary">{{ t('save') }}</button>
        <button @click="cancel" class="btn btn-outline-secondary">{{ t('cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImageUpload from "../ImageUpload.vue";
import { t } from '../translations/translationsPlugin.ts';

const emit = defineEmits<{
  created: [name: string, imageFile: File | null];
}>();

const show = ref(false);
let name = '';
let imageFile: File | null = null;

defineExpose({ show: () => show.value = true });

function onImageSelected(file: File) {
  imageFile = file;
}

function onImageRemoved() {
  imageFile = null;
}

function createUser() {
  if (!name.trim()){
    return;
  }

  emit('created', name, imageFile);

  resetAndClose();
}

function cancel() {
  resetAndClose();
}

function resetAndClose() {
  show.value = false;
  name = "";
  imageFile = null;
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-color);
  width: 90%;
  max-width: 400px;
}
</style>