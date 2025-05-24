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
        <button @click="showForm = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type EditChoreDto } from './gateway.ts';

const showForm = ref(false);

defineExpose({
  showForm
});

function newModel(): EditChoreDto {
  return {
    assignedTo: '',
    title: '',
    date: '',
    repeatsInDays: 0,
    done: false
};
}

const choreModel = newModel();

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
