<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <h3>{{ !!currentId ? 'Bearbeiten' : 'Neue Aufgabe' }}</h3>
      <input v-model="choreModel.title" placeholder="Title"/>
      <select v-model="choreModel.assignedTo">
        <option v-for="user in state.users.value" :key="user.data.id" :value="user.data.id">{{
            user.data.name
          }}
        </option>
      </select>
      <input type="date" v-model="dateModel"/>
      <ImageUpload :current-preview="currentImagePreview" @old-image-removed="onOldImageRemoved"
                   @new-image-selected="onNewImageSelected"
                   @new-image-removed="onNewImageRemoved"/>

      <!-- Repetition UI -->
      <div>
        <label>
          Wiederholen alle
          <input type="number" min="0" v-model.number="choreModel.repeatsEveryWeeks" style="width: 4em;"/>
          Wochen
        </label>
        <div v-show="choreModel.repeatsEveryWeeks > 0" style="margin-top: 0.5em;">
          <label>Mo <input type="checkbox" v-model="choreModel.repeatsOnMonday"/></label>
          <label>Di <input type="checkbox" v-model="choreModel.repeatsOnTuesday"/></label>
          <label>Mi <input type="checkbox" v-model="choreModel.repeatsOnWednesday"/></label>
          <label>Do <input type="checkbox" v-model="choreModel.repeatsOnThursday"/></label>
          <label>Fr <input type="checkbox" v-model="choreModel.repeatsOnFriday"/></label>
          <label>Sa <input type="checkbox" v-model="choreModel.repeatsOnSaturday"/></label>
          <label>So <input type="checkbox" v-model="choreModel.repeatsOnSunday"/></label>
        </div>
      </div>
      <!-- End Repetition UI -->

      <div class="modal-actions">
        <button @click="submit()">Save</button>
        <button @click="hide()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref, watch } from 'vue';
import type { EditChoreDto } from './types';
import { emptyEditChoreDto } from "./helpers.ts";
import { getState } from "./state/statePlugin.ts";
import ImageUpload from "./ImageUpload.vue";

const state = getState();

defineExpose({
  show,
  hide
});

const showForm = ref(false);
const choreModel = ref(emptyEditChoreDto());

const currentImagePreview = ref<string | null>(null);
let currentId: number | null = null;
let newFile: File | null = null;

const dateModel = computed({
  get: () => {
    const date = new Date(choreModel.value.plannedDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  },
  set: (value) => {
    choreModel.value.plannedDate = value;
  }
});

function show(model: EditChoreDto, imageUrl: string | null = null, id: number | null = null) {
  currentId = id;
  choreModel.value = model;
  currentImagePreview.value = imageUrl;
  newFile = null;
  showForm.value = true;
}

function hide() {
  showForm.value = false;
}

function onOldImageRemoved() {
  currentImagePreview.value = null;
  choreModel.value.imageName = null;
}

function onNewImageSelected(file: File) {
  newFile = file;
}

function onNewImageRemoved() {
  newFile = null;
}

async function submit() {
  if (newFile) {
    choreModel.value.imageName = await state.uploadImage(newFile);
  }
  if (!!currentId) {
    await state.editChore(currentId, choreModel.value);
  } else {
    await state.createChore(choreModel.value);
  }
  hide();
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
}

.modal-content {
  background: white;
  padding: 1em;
  border-radius: 8px;
  width: 90%;
  max-width: 300px;
}

.modal-content input,
.modal-content select {
  width: 100%;
  box-sizing: border-box;
  margin: 0.5em 0;
  padding: 0.5em;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

img {
  max-width: 300px;
  max-height: 300px;
}
</style>
