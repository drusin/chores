<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <h3>User Management</h3>

      <ul class="user-list">
        <li v-for="user in users" :key="user.data.id" class="user-item">
          <div class="image-wrapper">
            <ImageUpload :current-preview="user.imageUrl" :max-preview-height="60"
                         @old-image-removed="onOldImageRemoved(user.data.id)"
                         @new-image-removed="onNewImageRemoved(user.data.id)"
                         @new-image-selected="(file) => onNewImageSelected(user.data.id, file)"
            />
          </div>
          <div class="user-controls">
            <input v-model="user.data.name" placeholder="Name" />
            <button @click="deleteUser(user.data.id)" aria-label="Delete user">🗑️</button>
          </div>
        </li>
      </ul>
      <hr/>
      <h4>New User</h4>

      <div class="modal-actions">
        <button @click="submit">Speichern</button>
        <button @click="hide">Abbrechen</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getState } from "./state/statePlugin.ts";
import ImageUpload from "./ImageUpload.vue";
import { ref, computed } from "vue";

const state = getState();
const showForm = ref(false);
const users = ref([ ...state.users.value ]);
const newFiles = ref<(File | null)[]>([]);

defineExpose({ show });

function show() {
  showForm.value = true;
  users.value = [ ...state.users.value ];
  newFiles.value = [];
}

function hide() {
  showForm.value = false;
}

function onOldImageRemoved(userId: number) {
  const i = users.value.findIndex((user) => user.data.id === userId);
  if (i) {
    users.value[i].data.imageName = null;
  }
}

function onNewImageRemoved(userId: number) {
  newFiles.value[userId] = null;
}

function onNewImageSelected(userId: number, file: File) {
  newFiles.value[userId] = file;
}

async function submit() {
  for (const user of users.value) {
    const file = newFiles.value[user.data.id]
    if (file) {
      user.data.imageName = await state.uploadImage(file);
    }
    await state.editUser(user.data.id, user.data);
  }
  hide();
}

// Stub for deleteUser function - implement your logic here
function deleteUser(userId: number) {
  // TODO: Implement user deletion logic, e.g., update state.users
  console.log("Delete user with id:", userId);
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
  max-width: 500px;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-bottom: 0.5em;
}

.image-wrapper {
  height: 60px;
  width: auto;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.user-controls {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.user-controls input {
  flex-grow: 1;
  padding: 0.3em 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.user-controls button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  line-height: 1;
  color: #c00;
  transition: color 0.3s ease;
}

.user-controls button:hover {
  color: #900;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
}
</style>
