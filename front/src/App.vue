<template>
  <div class="container p-3">
    <header class="text-center mb-4">
      <h1>{{t('familyChoreTracker')}}</h1>
    </header>

    <main class="lanes d-flex justify-content-between gap-3">
      <div class="lane" v-for="person in state.users.value" :key="person.data.id">
        <div class="lane-header d-flex align-items-center gap-2 mb-2">
          <img :src="person.imageUrl || undefined" alt="Profile" class="profile-pic" />
          <h2>{{ person.data.name }}</h2>
        </div>
        <ul class="chore-list">
          <ChoreCard
            v-for="(chore, idx) in state.choresFor(person.data.id)"
            :key="idx"
            :chore="chore"
            @toggle="state.toggleChore(chore.data.id)"
            @edit="editChore(chore.data.id)"
            @delete="deleteChore(chore.data.id)"
          />
        </ul>
      </div>
      <div class="button-row d-flex justify-content-between">
        <button class="fab-btn" @click="openUserManagementModal"><img src="/editing.png" width="25" height="25" /></button>
        <button class="fab-btn" @click="openEditChoreModal">+</button>
      </div>
    </main>

    <UserManagerModal ref="user-management-modal" />
    <EditChoreModal ref="edit-chore-modal" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import ChoreCard from './chores/ChoreCard.vue';
import EditChoreModal from './chores/EditChoreModal.vue';
import { emptyEditChoreDto } from './helpers';
import UserManagerModal from "./users/UserManagerModal.vue";
import { getState } from "./state/statePlugin.ts";
import { t } from './translations/translationsPlugin.ts';

const state = getState();

const userManagementModal = useTemplateRef('user-management-modal');
const editChoreModal = useTemplateRef('edit-chore-modal');

function openUserManagementModal() {
  userManagementModal.value?.show();
}

function openEditChoreModal() {
  editChoreModal.value?.show(emptyEditChoreDto());
}

function deleteChore(id: number) {
  if (confirm(t('areYouSureDeleteChore'))) {
    state.deleteChore(id);
  }
}

function editChore(id: number) {
  const chore = state.chores.value.find(chore => chore.data.id === id);
  if (!chore) {
    console.error('Chore not found:', id);
    return;
  }
  editChoreModal.value?.show(chore.data, chore.imageUrl, id);
}

</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.lanes {
  /* Flexbox behavior defined by utility classes */
}

.lane {
  flex: 1;
  border: var(--border);
  border-radius: var(--border-radius);
  padding: var(--spacing-2);
  background: var(--color-light);
}

.lane-header {
  /* Flexbox behavior defined by utility classes */
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.chore-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.button-row {
  position: fixed;
  bottom: var(--spacing-4);
  /* Adjust padding/positioning as needed */
  left: var(--spacing-4);
  right: var(--spacing-4);
  pointer-events: none;
  z-index: 10;
}

.fab-btn {
  pointer-events: auto;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
  background: var(--color-primary);
  color: var(--text-color-light);
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  transition: background-color 0.2s;
}

.fab-btn:hover {
  background-color: #0056b3; /* Darker shade of primary */
}
</style>
