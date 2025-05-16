<template>
  <div class="container">
    <header>
      <h1>Family Chore Tracker</h1>
    </header>

    <main class="lanes">
      <div class="lane" v-for="person in ['Mom', 'Dad', 'Son']" :key="person">
        <div class="lane-header">
          <img :src="getProfilePic(person)" alt="Profile" class="profile-pic" />
          <h2>{{ person }}</h2>
        </div>
        <ul class="chore-list">
          <li
            v-for="(chore, idx) in personChores(person)"
            :key="idx"
            class="chore-card"
            :class="choreCardClass(chore)"
          >
            <div class="info">
              <h3>{{ chore.title }}</h3>
              <p v-if="chore.due">Due: {{ chore.due }}</p>
            </div>
            <div class="status">
              <button @click="cycleStatus(getChoreIndex(chore))">{{ chore.status }}</button>
            </div>
          </li>
        </ul>
      </div>
    </main>

    <button class="add-btn" @click="showForm = true">+</button>

    <div class="modal" v-if="showForm">
      <div class="modal-content">
        <h3>Add New Chore</h3>
        <input v-model="newChore.title" placeholder="Title" />
        <select v-model="newChore.assigned">
          <option>Dad</option>
          <option>Mom</option>
          <option>Son</option>
          <option>All</option>
        </select>
        <input type="date" v-model="newChore.due" />
        <div class="modal-actions">
          <button @click="addChore">Save</button>
          <button @click="showForm = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const showForm = ref(false);

    const chores = ref([
      { title: 'Take out trash', assigned: 'Dad', due: '2025-05-17', status: 'Planned' },
      { title: 'Clean kitchen', assigned: 'Mom', due: '2025-05-16', status: 'Planned' },
      { title: 'Do homework', assigned: 'Son', due: '2025-05-15', status: 'Done' },
    ]);

    const newChore = ref({ title: '', assigned: 'Dad', due: '', status: 'Planned' });

    const todayStr = new Date().toISOString().split('T')[0];

    const personChores = (person) => {
      return chores.value.filter(chore => chore.assigned === person);
    };

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
      newChore.value = { title: '', assigned: 'Dad', due: '', status: 'Planned' };
      showForm.value = false;
    }

    function choreCardClass(chore) {
      if (chore.status === 'Done') return 'done';
      if (!chore.due) return 'planned';
      if (chore.due === todayStr) return 'today';
      if (chore.due < todayStr) return 'overdue';
      return 'planned';
    }

    function getProfilePic(person) {
      const map = {
        Dad: 'https://picsum.photos/seed/dad/40/40',
        Mom: 'https://picsum.photos/seed/mom/40/40',
        Son: 'https://picsum.photos/seed/son/40/40'
      };
      return map[person];
    }

    return {
      chores,
      personChores,
      getChoreIndex,
      cycleStatus,
      showForm,
      newChore,
      addChore,
      choreCardClass,
      getProfilePic
    };
  },
};
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
.chore-card {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5em;
  margin-bottom: 0.5em;
}
.chore-card.planned {
  background-color: #e0e0e0;
}
.chore-card.today {
  background-color: #fff59d;
}
.chore-card.overdue {
  background-color: #ef9a9a;
}
.chore-card.done {
  background-color: #a5d6a7;
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
