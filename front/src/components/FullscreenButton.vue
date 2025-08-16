<template>
  <button v-if="!isFullscreen && isMobile" @click="toggleFullscreen">
    <img src="/maximize.svg" :alt="t('enterFullscreen')" width="25" height="25" />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { t } from '../translations/translationsPlugin';

const isFullscreen = ref(false);
const isMobile = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const onFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
  document.addEventListener('fullscreenchange', onFullscreenChange);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile);
  document.removeEventListener('fullscreenchange', onFullscreenChange);
});
</script>

<style scoped>
button {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
