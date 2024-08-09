<script setup lang="ts">
import type { Tool } from '../tools.types';

const route = useRoute();
const path = route.path;
const { config } = route.meta as unknown as Tool;
const remoteUrl = config.remoteUrl as string;

onMounted(() => {
  document.querySelector('#mLayoutContent')?.classList.add('wide');
  config.hideHeader && document.querySelector('.tool-layout')?.classList.add('hide');
});

onUnmounted(() => {
  document.querySelector('#mLayoutContent')?.classList.remove('wide');
  config.hideHeader && document.querySelector('.tool-layout')?.classList.remove('hide');
});

const top = config.hideHeader ? '60px' : '220px';
</script>

<template>
  <div class="warpper">
    <iframe
      :id="path.replace('/', '')"
      :src="remoteUrl"
      frameborder="0"
      allow="accelerometer *;geolocation *;fullscreen *;picture-in-picture *;microphone *;camera *;midi;encrypted-media;clipboard-read *;clipboard-write *;"
      allowfullscreen="true"
    />
  </div>
</template>

<style lang="less" scoped>
.warpper {
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: 100%;
  height: calc(100vh - v-bind('top'));
  align-items: center;
  justify-content: center;
  display: flex;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
