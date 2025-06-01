<template>
  <li
    class="chore-card"
    :class="chore.status"
  >
    <div class="chore-content" @click="$emit('toggle')">
      <strong>{{ chore.title }}</strong>
      <span class="due-date">{{ displayDate() }}</span>
      <button @click.stop="$emit('edit')">📑</button>
      <button @click.stop="$emit('delete')">🚮</button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Chore } from './types';
import { normalizeDate } from './helpers';

const { chore } = defineProps<{
    chore: Chore,
}>();

defineEmits<{
  toggle: [void],
  delete: [void],
  edit: [void],
}>();

function displayDate() {
  const dateDifference = new Date(chore.plannedDate).getTime() - normalizeDate(new Date).getTime();
  const format = new Intl.RelativeTimeFormat('de-de', { numeric: 'auto' });
  return format.format(dateDifference / (1000 * 60 * 60 * 24), 'day');
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
