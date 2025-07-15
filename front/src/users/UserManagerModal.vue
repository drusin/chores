<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content p-3 rounded shadow-sm">
      <h3 class="mt-1 mb-3">{{ t('userManagement') }}</h3>

      <ul class="user-list">
        <li v-for="user in users" :key="user.data.id" class="user-item d-flex flex-column gap-2 mb-2">
          <div class="image-wrapper">
            <ImageUpload :current-preview="user.imageUrl" :max-preview-height="120"
                         @old-image-removed="() => onOldImageRemoved(user.data.id)"
                         @new-image-removed="() => onNewImageRemoved(user.data.id)"
                         @new-image-selected="(file) => onNewImageSelected(user.data.id, file)"
            />
          </div>
          <div class="user-controls d-flex align-items-center gap-2">
            <input v-model="user.data.name" :placeholder="t('name')" class="w-100" />
            <button @click="deleteUser(user.data.id)" :aria-label="t('deleteUser')" class="btn btn-danger">🗑️</button>
          </div>
        </li>
      </ul>
      <hr class="my-3"/>
      <button @click="() => newUserModal?.show()" class="btn btn-secondary w-100">{{ t('createNewUser') }}</button>

      <div class="modal-actions d-flex justify-content-between mt-3">
        <button @click="submit" class="btn btn-primary">{{ t('save') }}</button>
        <button @click="hide" class="btn btn-outline-secondary">{{ t('cancel') }}</button>
      </div>
    </div>
  </div>

  <NewUserModal ref="new-user-modal" @created="onNewUserCreated" />
</template>

<script setup lang="ts">
import { getState } from "../state/statePlugin.ts";
import ImageUpload from "../ImageUpload.vue";
import { type Ref, ref, useTemplateRef } from "vue";
import NewUserModal from "./NewUserModal.vue";
import type { User } from "../types.ts";
import { clone } from "../helpers.ts";
import { t } from '../translations/translationsPlugin.ts';

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
  z-index: 100;
}

.modal-content {
  background: var(--bg-color);
  width: 90%;
  max-width: 500px;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.image-wrapper {
  height: 120px;
  width: auto;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.user-controls input {
  flex-grow: 1;
}
</style>

