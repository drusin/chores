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
            @toggle="state.toggleChore(chore.id)"
            @edit="editChore(chore.id)"
            @delete="deleteChore(chore.id)"
          />
        </ul>
      </div>
    </main>

    <button class="add-btn" @click="openEditChoreModal">+</button>
    
    <EditChoreModal ref="edit-chore-modal" :users="state.users" @submit="modalSubmit" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import ChoreCard from './ChoreCard.vue';
import EditChoreModal from './EditChoreModal.vue';
import type { EditChoreDto, StateApi } from './types';
import { choreToEditChoreDto, emptyEditChoreDto } from './helpers';

const { state } = defineProps<{
  state: StateApi;
}>();

const editChoreModal = useTemplateRef('edit-chore-modal');

function openEditChoreModal() {
  editChoreModal.value?.show(emptyEditChoreDto());
}

function modalSubmit(chore: EditChoreDto, id: number | null): void {
  if (id === null) {
    state.createChore(chore);
    return;
  }
  state.editChore
}

function deleteChore(id: number) {
  if (confirm('Bist du sicher, dass du diese Aufgabe löschen möchtest?')) {
    state.deleteChore(id);
  }
}

function editChore(id: number) {
  const chore = state.chores.find(chore => chore.id === id);
  if (!chore) {
    console.error('Chore not found:', id);
    return;
  }
  editChoreModal.value?.show(choreToEditChoreDto(chore), id);
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
.add-btn {
  position: fixed;
  right: 1em;
  bottom: 1em;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  font-size: 2em;
  background: #007bff;
  color: white;
  border: none;
}
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
