<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content p-3 rounded shadow-sm">
      <h3 class="mt-1 mb-3">{{ currentId ? t('editTask') : t('newTask') }}</h3>

      <input class="w-100 mb-2" v-model="choreModel.title" :placeholder="t('titlePlaceholder')" />

      <select class="w-100 mb-2" v-model="choreModel.assignedTo">
        <option
            v-for="user in state.users.value"
            :key="user.data.id"
            :value="user.data.id"
        >
          {{ user.data.name }}
        </option>
      </select>

      <input class="w-100 mb-2" type="date" v-model="dateModel" />

      <ImageUpload
          :max-preview-height="null"
          :current-preview="currentImagePreview"
          @old-image-removed="onOldImageRemoved"
          @new-image-selected="onNewImageSelected"
          @new-image-removed="onNewImageRemoved"
      />

      <!-- Repeating Chore Section -->
      <div class="repeat-section mt-3">
        <label class="d-flex align-items-center gap-2">
          {{ t('repeatEvery') }}
          <input
              type="number"
              min="0"
              v-model.number="choreModel.repeatsEveryWeeks"
              class="repeat-weeks-input"
          />
          {{ t('weeks') }}
        </label>

        <div class="weekday-checkboxes d-flex flex-column align-items-start gap-1 mt-2" v-if="choreModel.repeatsEveryWeeks > 0">
          <label>
            <input type="checkbox" v-model="choreModel.repeatsOnMonday" />
            {{ t('monday') }}
          </label>
          <label>
            <input type="checkbox" v-model="choreModel.repeatsOnTuesday" />
            {{ t('tuesday') }}
          </label>
          <label>
            <input type="checkbox" v-model="choreModel.repeatsOnWednesday" />
            {{ t('wednesday') }}
          </label>
          <label>
            <input type="checkbox" v-model="choreModel.repeatsOnThursday" />
            {{ t('thursday') }}
          </label>
          <label>
            <input type="checkbox" v-model="choreModel.repeatsOnFriday" />
            {{ t('friday') }}
          </label>
          <label>
            <input type="checkbox" v-model="choreModel.repeatsOnSaturday" />
            {{ t('saturday') }}
          </label>
          <label>
            <input type="checkbox" v-model="choreModel.repeatsOnSunday" />
            {{ t('sunday') }}
          </label>
        </div>
      </div>

      <!-- Actions -->
      <div class="modal-actions d-flex justify-content-between mt-3">
        <button @click="submit" class="btn btn-primary">{{ t('save') }}</button>
        <button @click="hide" class="btn btn-outline-secondary">{{ t('cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue';
import type { EditChoreDto } from '../types.ts';
import { emptyEditChoreDto } from '../helpers.ts';
import { getState } from '../state/statePlugin.ts';
import ImageUpload from '../ImageUpload.vue';
import { t } from '../translations/translationsPlugin.ts';

const state = getState();

defineExpose({ show, hide });

const showForm = ref(false);
const choreModel = ref<EditChoreDto>(emptyEditChoreDto());

const currentImagePreview = ref<string | null>(null);
let currentId: Ref<number | null> = ref(null);
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
  currentId.value = id;
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

  if (currentId.value !== null) {
    await state.editChore(currentId.value, choreModel.value);
  }
  else {
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
  z-index: 100;
}

.modal-content {
  background: var(--bg-color);
  width: 90%;
  max-width: 320px;
  box-sizing: border-box;
}

.repeat-weeks-input {
  width: 4em;
}

.weekday-checkboxes label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  white-space: nowrap;
}

.weekday-checkboxes input[type="checkbox"] {
  width: auto;
}

</style>
