<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <h3>{{ t('userManagement') }}</h3>

      <ul class="user-list">
        <li v-for="user in users" :key="user.data.id" class="user-item">
          <div class="image-wrapper">
            <ImageUpload :current-preview="user.imageUrl" :max-preview-height="60"
                         @old-image-removed="() => onOldImageRemoved(user.data.id)"
                         @new-image-removed="() => onNewImageRemoved(user.data.id)"
                         @new-image-selected="(file) => onNewImageSelected(user.data.id, file)"
            />
          </div>
          <div class="user-controls">
            <input v-model="user.data.name" :placeholder="t('name')" />
            <button @click="deleteUser(user.data.id)" :aria-label="t('deleteUser')">🗑️</button>
          </div>
        </li>
      </ul>
      <hr/>
      <button @click="() => newUserModal?.show()">{{ t('createNewUser') }}</button>

      <div class="modal-actions">
        <button @click="submit">{{ t('save') }}</button>
        <button @click="hide">{{ t('cancel') }}</button>
      </div>
    </div>
  </div>

  <NewUserModal ref="new-user-modal" @created="onNewUserCreated" />
</template>

<script setup lang="ts">
import { getState } from "./state/statePlugin.ts";
import ImageUpload from "./ImageUpload.vue";
import { type Ref, ref, useTemplateRef } from "vue";
import NewUserModal from "./NewUserModal.vue";
import type { User } from "./types.ts";
import { clone } from "./helpers.ts";
import { t } from './translations/translationsPlugin.ts';

const state = getState();
const showForm = ref(false);
const users: Ref<User[]> = ref([]);
const newFiles = ref<(File | null)[]>([]);
const newUserModal = useTemplateRef('new-user-modal');

defineExpose({ show });

function show() {
  showForm.value = true;
  copyUsersFromState();
  newFiles.value = [];
}

function copyUsersFromState() {
  users.value = clone(state.users.value);
}

function hide() {
  showForm.value = false;
}

function onOldImageRemoved(userId: number) {
  const i = users.value.findIndex((user) => user.data.id === userId);
  if (i) {
    users.value[i].data.imageName = null;
    users.value[i].imageUrl = null;
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

async function deleteUser(userId: number) {
  if (confirm(t('areYouSureDeleteUser'))) {
    await state.deleteUser(userId);
    copyUsersFromState();
  }
}

async function onNewUserCreated(name: string, image: File | null) {
  let imageName = null;
  if (image) {
    imageName = await state.uploadImage(image);
  }
  await state.createUser({ name, imageName });
  copyUsersFromState();
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
