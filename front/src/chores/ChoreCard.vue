<template>
  <li
    class="chore-card p-2 rounded shadow-sm mb-2"
    :class="chore.status"
  >
    <div class="chore-content d-flex flex-column gap-1" @click="$emit('toggle')">
      <strong class="text-bold">{{ chore.data.title }}</strong>
      <span class="due-date" v-show="!chore.data.done">{{ displayDate() }}</span>
      <img v-if="chore.imageUrl" :src="chore.imageUrl" class="chore-image rounded mt-2">
      <div class="button-row d-flex justify-content-between mt-1">
        <button @click.stop="$emit('edit')" class="chore-action-btn"><img src="/editing.png" width="25" height="25" /></button>
        <button @click.stop="$emit('delete')" class="chore-action-btn delete"><img src="/recycle-bin.png" width="25" height="25" /></button>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Chore } from '../types.ts';
import { normalizeDate } from '../helpers.ts';

const { chore } = defineProps<{
    chore: Chore,
}>();

defineEmits<{
  toggle: [void],
  delete: [void],
  edit: [void],
}>();

function displayDate() {
  const dateDifference = Math.round(new Date(chore.plannedDate).getTime() - normalizeDate(new Date).getTime());
  const format = new Intl.RelativeTimeFormat('de-de', { numeric: 'auto' });
  return format.format(dateDifference / (1000 * 60 * 60 * 24), 'day');
}

</script>

<style scoped>
.chore-card {
  cursor: pointer;
  transition: background 0.3s;
}
.chore-card.planned {
  background: var(--bg-planned);
}
.chore-card.due {
  background: var(--bg-due);
}
.chore-card.overdue {
  background: var(--bg-overdue);
}
.chore-card.done {
  background: var(--bg-done);
  text-decoration: line-through;
  color: var(--color-secondary);
}

.due-date {
  font-size: 0.85em;
  color: #555;
}
.chore-image {
  max-width: 100%;
}

.chore-action-btn {
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    padding: 0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--box-shadow-sm);
    transition: background-color 0.2s, box-shadow 0.2s;
}

.chore-action-btn:hover {
    background-color: var(--color-light);
}

.chore-action-btn.delete:hover {
    background-color: var(--color-danger);
}

</style>
