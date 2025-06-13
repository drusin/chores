<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <h3>{{ !!currentId ? 'Bearbeiten' : 'Neue Aufgabe' }}</h3>
      <input v-model="choreModel.title" placeholder="Title" />
      <select v-model="choreModel.assignedTo">
        <option v-for="user in users" :key="user">{{ user }}</option>
      </select>
      <input type="date" v-model="dateModel" />
      <img v-if="!!imagePreview" :src="imagePreview" />
      <input type="file" @change="fileSelected">

      <!-- Repetition UI -->
      <div>
        <label>
          Wiederholen alle
          <input type="number" min="0" v-model.number="choreModel.repeatsEveryWeeks" style="width: 4em;" />
          Wochen
        </label>
        <div v-show="choreModel.repeatsEveryWeeks > 0" style="margin-top: 0.5em;">
          <label>Mo <input type="checkbox" v-model="choreModel.repeatsOnMonday" /></label>
          <label>Di <input type="checkbox" v-model="choreModel.repeatsOnTuesday" /></label>
          <label>Mi <input type="checkbox" v-model="choreModel.repeatsOnWednesday" /></label>
          <label>Do <input type="checkbox" v-model="choreModel.repeatsOnThursday" /></label>
          <label>Fr <input type="checkbox" v-model="choreModel.repeatsOnFriday" /></label>
          <label>Sa <input type="checkbox" v-model="choreModel.repeatsOnSaturday" /></label>
          <label>So <input type="checkbox" v-model="choreModel.repeatsOnSunday" /></label>
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
import type { Chore, EditChoreDto } from './types';
import { emptyEditChoreDto } from "./helpers.ts";

defineProps<{
  users: string[]
}>();

defineExpose({
  show,
  hide
});

const emit = defineEmits<{
  submit: [ EditChoreDto, File | undefined, number | null ];
}>();

const showForm = ref(false);
let choreModel = ref(emptyEditChoreDto());
let currentId: number | null = null;
let file: Ref<File | undefined> = ref(undefined);
const imagePreview: Ref<string | undefined> = ref(undefined);

const dateModel = computed({
  get: () => {
    const date = new Date(choreModel.value.plannedDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  },
  set: (value) => {
    choreModel.value.plannedDate = value;
  }
});

watch(file, (newFile) => {
  if (!newFile) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e?.target?.result as string | undefined; // base64 data URL
  };
  reader.readAsDataURL(newFile);
})

function show(model: EditChoreDto, imageUrl: string | null = null, id: number | null = null) {
  currentId = id;
  choreModel.value = model;
  imagePreview.value = imageUrl || undefined;
  file.value = undefined;
  showForm.value = true;
}

function hide() {
  showForm.value = false;
}

function submit() {
  emit('submit', choreModel.value, file.value, currentId);
  hide();
}

function fileSelected(e: Event) {
  const fileInput = e.target as HTMLInputElement;
  file.value = fileInput?.files?.[0];
}

</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
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
