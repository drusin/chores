<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <h3>{{ t('createNewUser') }}</h3>

      <div class="form-group">
        <label>{{ t('name') }}:</label>
        <input v-model="name" :placeholder="t('enterName')" class="full-width"/>
      </div>

      <div class="form-group">
        <label>{{ t('profileImage') }}:</label>
        <ImageUpload
            :current-preview="null"
            :max-preview-height="120"
            @old-image-removed="onImageRemoved"
            @new-image-selected="onImageSelected"
            @new-image-removed="onImageRemoved"
        />
      </div>

      <div class="modal-actions">
        <button @click="createUser" class="btn-save">{{ t('save') }}</button>
        <button @click="cancel" class="btn-cancel">{{ t('cancel') }}</button>
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
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

</style>