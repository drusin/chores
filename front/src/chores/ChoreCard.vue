<template>
  <li
    class="chore-card"
    :class="chore.status"
  >
    <div class="chore-content" @click="$emit('toggle')">
      <strong>{{ chore.data.title }}</strong>
      <span class="due-date" v-show="!chore.data.done">{{ displayDate() }}</span>
      <img v-if="chore.imageUrl" :src="chore.imageUrl" class="chore-image">
      <div class="button-row">
        <button @click.stop="$emit('edit')" class="edit"><img src="/editing.png" width="25" height="25" /></button>
        <button @click.stop="$emit('delete')" class="edit"><img src="/recycle-bin.png" width="25" height="25" /></button>
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
.button-row {
  display: flex;
  gap: 0.5em;
  margin-top: 0.25em;
  justify-content: space-between;
  button {
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
  }
}

.edit {
  padding: 0;
}

</style>
