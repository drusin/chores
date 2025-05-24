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
            v-for="(chore, idx) in choresFor(person)"
            :key="idx"
            :chore="chore"
          />
        </ul>
      </div>
    </main>

    <button class="add-btn" @click="newChoreModal.showForm = true">+</button>

    
    <NewChoreModal ref="newChoreModal" />
    <!-- <div class="modal" v-if="showForm">
      <div class="modal-content">
        <h3>Add New Chore</h3>
        <input v-model="newChore.title" placeholder="Title" />
        <select v-model="newChore.assigned">
          <option>Dawid</option>
          <option>Alex</option>
          <option>Vincent</option>
          <option>All</option>
        </select>
        <input type="date" v-model="newChore.due" />
        <input v-model="newChore.image" placeholder="Image URL (optional)" />
        <div class="modal-actions">
          <button @click="addChore">Save</button>
          <button @click="showForm = false">Cancel</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChoreCard from './ChoreCard.vue';
import NewChoreModal from './NewChoreModal.vue';
import { state, setup, choresFor } from './state';

const newChoreModal = ref(null);

const showForm = ref(false);
const chores = ref(state.value.chores);
setup();
const newChore = ref({ title: '', assigned: 'Dad', due: '', status: 'Planned', image: '' });

function addChore() {
  chores.value.push({ ...newChore.value });
  newChore.value = { title: '', assigned: 'Dad', due: '', status: 'Planned', image: '' };
  showForm.value = false;
}

function getProfilePic(person: string): string {
  const map = {
    Dawid: 'https://picsum.photos/seed/dad/40/40',
    Alex: 'https://picsum.photos/seed/mom/40/40',
    Vincent: 'https://picsum.photos/seed/son/40/40'
  };
  return map[person];
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
