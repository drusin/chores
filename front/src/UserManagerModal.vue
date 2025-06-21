<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <h3>User Management</h3>

      <ul class="user-list">
        <li v-for="user in users" :key="user.data.id">
          <img :src="user.imageUrl" class="avatar" />
          <input v-model="user.data.name" placeholder="Name" />
          <input v-model="user.imageUrl" placeholder="Profile picture URL" />
          <button @click="deleteUser(user.data.id)">🗑️</button>
        </li>
      </ul>

      <hr />

      <div class="new-user-form">
        <input v-model="newUser.name" placeholder="New user name" />
        <input v-model="newUser.imageName" placeholder="Profile picture URL" />
        <button @click="addUser">Add User</button>
      </div>

      <div class="modal-actions">
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, defineEmits, type Ref} from 'vue';
import type {EditUserDto, User} from './types';
import {emptyEditUserDto} from "./helpers.ts";

// const props = defineProps<{
//   users: User[];
//   show: boolean;
// }>();
const users: Ref<User[]> = ref([]);
const showForm = ref(false);

const emit = defineEmits<{
  (e: 'update-users', value: User[]): void;
  (e: 'close'): void;
}>();

defineExpose({
  show
});

function show(usersToShow: User[]) {
  users.value = usersToShow;
  showForm.value = true;
}

// const users = ref<User[]>(JSON.parse(JSON.stringify(props.users))); // local copy
const newUser = ref<EditUserDto>(emptyEditUserDto());

// watch(() => props.users, (newVal) => {
//   users.value = JSON.parse(JSON.stringify(newVal));
// });

function addUser() {
  if (!newUser.value.name) return;
  users.value.push({ ...newUser.value, id: Date.now() });
  newUser.value = { id: 0, name: '', avatarUrl: '' };
  emit('update-users', users.value);
}

function deleteUser(id: number) {
  users.value = users.value.filter(u => u.id !== id);
  emit('update-users', users.value);
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
}
.modal-content {
  background: white;
  padding: 1em;
  border-radius: 8px;
  width: 90%; max-width: 500px;
}
.user-list {
  list-style: none;
  padding: 0;
}
.user-list li {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5em;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.new-user-form input {
  display: block;
  width: 100%;
  margin-bottom: 0.5em;
}
</style>
