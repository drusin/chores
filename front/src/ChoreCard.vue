<template>
  <li
    class="chore-card"
    :class="chore.status"
    @click="$emit('cycle-status')"
  >
    <div class="chore-content">
      <strong>{{ chore.title }}</strong>
      <span class="due-date">Due: {{ chore.date }}</span>
      <img
        v-if="chore.image"
        :src="chore.image"
        alt="Chore"
        class="chore-image"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Chore } from './state';


const { chore, todayStr } = defineProps<{
    chore: Chore,
    todayStr: String
}>();
const statusClass = () => {
      if (chore.done) return 'done';
      if (chore.due === todayStr) return 'due-today';
      if (chore.due < todayStr) return 'overdue';
      return 'planned';
    }
</script>

<style scoped>
.chore-card {
  padding: 0.5em;
  border-radius: 8px;
  margin: 0.5em 0;
  cursor: pointer;
  transition: background 0.3s;
}
.chore-card.planned {
  background: #e0e0e0;
}
.chore-card.due {
  background: #fff59d;
}
.chore-card.overdue {
  background: #ef9a9a;
}
.chore-card.done {
  background: #a5d6a7;
}
.chore-content {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}
.due-date {
  font-size: 0.85em;
  color: #555;
}
.chore-image {
  margin-top: 0.5em;
  max-width: 100%;
  border-radius: 6px;
}
</style>
