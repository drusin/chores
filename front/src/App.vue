<template>
  <div class="container">
    <header>
      <h1>Family Chore Tracker</h1>
    </header>

    <main class="lanes">
      <div class="lane" v-for="person in ['Alex', 'Dawid', 'Vincent']" :key="person">
        <div class="lane-header">
          <img :src="getProfilePic(person)" alt="Profile" class="profile-pic" />
          <h2>{{ person }}</h2>
        </div>
        <ul class="chore-list">
          <ChoreCard
            v-for="(chore, idx) in personChores(person)"
            :key="idx"
            :chore="chore"
            :todayStr="todayStr"
            @cycle-status="cycleStatus(getChoreIndex(chore))"
          />
        </ul>
      </div>
    </main>

    <button class="add-btn" @click="showForm = true">+</button>

    <div class="modal" v-if="showForm">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ChoreCard from './ChoreCard.vue';
import { setup, state as plainState, choresFor } from './state';

const showForm = ref(false);
const state = ref(plainState);

// const chores = ref([
  //   { title: 'Take out trash', assigned: 'Dad', due: '2025-05-17', status: 'Planned', image: '' },
  //   { title: 'Clean kitchen', assigned: 'Mom', due: '2025-05-16', status: 'Planned', image: '' },
  //   { title: 'Do homework', assigned: 'Son', due: '2025-05-15', status: 'Done', image: '' },
  // ]);
const chores = state.value.chores
// console.log(chores.value);
// watch(chores, async (_new, _old) => console.log(`chores changed from ${_new} to ${_old}`));
// setup().then(_val => console.log(chores.value));

const newChore = ref({ title: '', assigned: 'Dad', due: '', status: 'Planned', image: '' });

const todayStr = new Date().toISOString().split('T')[0];

const personChores = choresFor;

// const personChores = (person) => {
//   return chores.value.filter(chore => chore.assigned === person);
// };

const getChoreIndex = (target) => {
  return chores.value.findIndex(c => c.title === target.title && c.assigned === target.assigned && c.due === target.due && c.status === target.status);
};

function cycleStatus(idx) {
  const order = ['Planned', 'Done'];
  const chore = chores.value[idx];
  const next = order[(order.indexOf(chore.status) + 1) % order.length];
  chore.status = next;
}

function addChore() {
  chores.value.push({ ...newChore.value });
  newChore.value = { title: '', assigned: 'Dad', due: '', status: 'Planned', image: '' };
  showForm.value = false;
}

function getProfilePic(person) {
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
