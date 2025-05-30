<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <h3>Add New Chore</h3>
      <input v-model="choreModel.title" placeholder="Title" />
      <select v-model="choreModel.assignedTo">
        <option v-for="user in users" :key="user">{{ user }}</option>
      </select>
      <input type="date" v-model="dateModel" />
      <div class="modal-actions">
        <button @click="submit()">Save</button>
        <button @click="hide()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { EditChoreDto } from './types';

const showForm = ref(false);
let choreModel: EditChoreDto;
let currentId: number | null = null;
const dateModel = computed({
  get: () => {
    const date = new Date(choreModel.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  },
  set: (value) => {
    choreModel.date = value;
  }
});

defineProps<{
  users: string[]
}>();

defineExpose({
  show,
  hide
});

const emit = defineEmits<{
  submit: [EditChoreDto, number | null];
}>();


function show(model: EditChoreDto, id: number | null = null) {
  currentId = id;
  choreModel = model;
  showForm.value = true;
}

function hide() {
  showForm.value = false;
}

function submit() {
  emit('submit', choreModel, currentId);
  hide();
}

</script>

<style>
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
  margin: 0.5em 0;
  padding: 0.5em;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
}
</style>
