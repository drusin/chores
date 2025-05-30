<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <h3>Add New Chore</h3>
      <input v-model="choreModel.title" placeholder="Title" />
      <select v-model="choreModel.assignedTo">
        <option>Dawid</option>
        <option>Alex</option>
        <option>Vincent</option>
        <option>All</option>
      </select>
      <input type="date" v-model="choreModel.date" />
      <input v-model="choreModel.image" placeholder="Image URL (optional)" />
      <div class="modal-actions">
        <button @click="addChore">Save</button>
        <button @click="hide()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { EditChoreDto } from './types';

const showForm = ref(false);
let choreModel: EditChoreDto;
let currentId: number | null = null;

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

function addChore() {
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
