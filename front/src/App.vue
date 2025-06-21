<template>
  <div class="container">
    <header>
      <h1>Family Chore Tracker</h1>
    </header>

    <main class="lanes">
      <div class="lane" v-for="person in state.users" :key="person">
        <div class="lane-header">
          <img :src="getProfilePic(person)" alt="Profile" class="profile-pic" />
          <h2>{{ person }}</h2>
        </div>
        <ul class="chore-list">
          <ChoreCard
            v-for="(chore, idx) in state.choresFor(person)"
            :key="idx"
            :chore="chore"
            @toggle="state.toggleChore(chore.data.id)"
            @edit="editChore(chore.data.id)"
            @delete="deleteChore(chore.data.id)"
          />
        </ul>
      </div>
      <div class="button-row">
        <button class="edit-btn" @click="openEditChoreModal"><img src="/editing.png" width="25" height="25" /></button>
        <button class="add-btn" @click="openEditChoreModal">+</button>
      </div>
    </main>

    <UserManagerModal ref="user-management-modal" @submit="editChoreSubmit" />
    <EditChoreModal ref="edit-chore-modal" :users="state.users" @submit="editChoreSubmit" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import ChoreCard from './ChoreCard.vue';
import EditChoreModal from './EditChoreModal.vue';
import type { EditChoreDto, StateApi } from './types';
import { emptyEditChoreDto } from './helpers';
import UserManagerModal from "./UserManagerModal.vue";

const { state } = defineProps<{
  state: StateApi;
}>();

const userManagementModal = useTemplateRef('user-management-modal');
const editChoreModal = useTemplateRef('edit-chore-modal');

function openUserManagementModal() {
  userManagementModal.value?.show(state.users);
}

function openEditChoreModal() {
  editChoreModal.value?.show(emptyEditChoreDto());
}

async function editChoreSubmit(chore: EditChoreDto, file: File | undefined, id: number | null): Promise<void> {
  if (file) {
    chore.imageName = await state.uploadImage(file);
  }
  if (id === null) {
    await state.createChore(chore);
    return;
  }
  await state.editChore(id, chore)
}

function deleteChore(id: number) {
  if (confirm('Bist du sicher, dass du diese Aufgabe löschen möchtest?')) {
    state.deleteChore(id);
  }
}

function editChore(id: number) {
  const chore = state.chores.find(chore => chore.data.id === id);
  if (!chore) {
    console.error('Chore not found:', id);
    return;
  }
  editChoreModal.value?.show(chore.data, chore.imageUrl, id);
}

function getProfilePic(person: string): string {
  const map = new Map<string, string>([
    ['Dawid', 'https://picsum.photos/seed/dad/40/40'],
    ['Alex', 'https://picsum.photos/seed/mom/40/40'],
    ['Vincent', 'https://picsum.photos/seed/son/40/40']
  ]);

  return map.get(person) ||'';
}

</script>

<style>
.container {
  font-family: sans-serif;
  padding: 1em;
  max-width: 1000px;
  margin: 0 auto;
}
header {
  text-align: center;
  margin-bottom: 1em;
}
.lanes {
  display: flex;
  justify-content: space-around;
  gap: 1em;
}
.lane {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5em;
  background: #f9f9f9;
}
.lane-header {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5em;
}
.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.chore-list {
  list-style: none;
  padding: 0;
}

.button-row {
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none; /* prevents overlap issues with other content */
  z-index: 10;
}

.button-row button {
  pointer-events: auto; /* re-enable interaction */
}


.edit-btn, .add-btn {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
  background: #007bff;
  color: white;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  cursor: pointer;

}


</style>
