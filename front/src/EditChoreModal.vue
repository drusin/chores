<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <h3>{{ isEditing ? 'Bearbeiten' : 'Neue Aufgabe' }}</h3>

      <input class="full-width" v-model="choreModel.title" placeholder="Titel" />

      <select class="full-width" v-model="choreModel.assignedTo">
        <option
            v-for="user in state.users.value"
            :key="user.data.id"
            :value="user.data.id"
        >
          {{ user.data.name }}
        </option>
      </select>

      <input class="full-width" type="date" v-model="dateModel" />

      <ImageUpload
          :current-preview="currentImagePreview"
          @old-image-removed="onOldImageRemoved"
          @new-image-selected="onNewImageSelected"
          @new-image-removed="onNewImageRemoved"
      />

      <!-- Repeating Chore Section -->
      <div class="repeat-section">
        <label>
          Wiederholen alle
          <input
              type="number"
              min="0"
              v-model.number="choreModel.repeatsEveryWeeks"
              class="repeat-weeks-input full-width"
          />
          Wochen
        </label>

        <div class="weekday-checkboxes" v-if="choreModel.repeatsEveryWeeks > 0">
          <label><input type="checkbox" v-model="choreModel.repeatsOnMonday" /> Montag</label>
          <label><input type="checkbox" v-model="choreModel.repeatsOnTuesday" /> Dienstag</label>
          <label><input type="checkbox" v-model="choreModel.repeatsOnWednesday" /> Mittwoch</label>
          <label><input type="checkbox" v-model="choreModel.repeatsOnThursday" /> Donnerstag</label>
          <label><input type="checkbox" v-model="choreModel.repeatsOnFriday" /> Freitag</label>
          <label><input type="checkbox" v-model="choreModel.repeatsOnSaturday" /> Samstag</label>
          <label><input type="checkbox" v-model="choreModel.repeatsOnSunday" /> Sonntag</label>
        </div>
      </div>

      <!-- Actions -->
      <div class="modal-actions">
        <button @click="submit">Speichern</button>
        <button @click="hide">Abbrechen</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { EditChoreDto } from './types';
import { emptyEditChoreDto } from './helpers';
import { getState } from './state/statePlugin';
import ImageUpload from './ImageUpload.vue';

const state = getState();

defineExpose({ show, hide });

const showForm = ref(false);
const choreModel = ref<EditChoreDto>(emptyEditChoreDto());

const currentImagePreview = ref<string | null>(null);
let currentId: number | null = null;
let newFile: File | null = null;

const isEditing = computed(() => !!currentId);

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
  choreModel.value = { ...model };
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

  if (currentId !== null) {
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
  max-width: 320px;
  box-sizing: border-box;
}

.modal-content .full-width {
  width: 100%;
  margin: 0.5em 0;
  padding: 0.5em;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
}

.repeat-section {
  margin-top: 1em;
}

.repeat-weeks-input {
  width: 4em;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.weekday-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  margin-top: 0.5em;
}

.weekday-checkboxes label {
  display: flex;
  align-items: center;
  gap: 0.5em;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
