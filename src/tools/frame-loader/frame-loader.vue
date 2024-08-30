<script setup lang="ts">
import type { Tool } from '../tools.types';

const route = useRoute();
const info = getInfo(route);

function getInfo(r: typeof route) {
  return {
    config: (r.meta as unknown as Tool).config || {},
    path: r.path.replace('/', ''),
  };
}

function onLeave() {
  !info.config.remoteUrl && document.querySelector('#mLayoutContent')?.classList.remove('wide');
  !info.config.hideHeader && document.querySelector('.tool-layout')?.classList.remove('hide');
}

onBeforeRouteLeave((to) => {
  Object.assign(info, getInfo(to));
  onLeave();
});

onMounted(() => {
  info.config.remoteUrl && document.querySelector('#mLayoutContent')?.classList.add('wide');
  info.config.hideHeader && document.querySelector('.tool-layout')?.classList.add('hide');
});

onUnmounted(() => onLeave());

const top = info.config.hideHeader ? '65px' : '225px';
// @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy#browser_compatibility
const allow = [
  'accelerometer',
  'ambient-light-sensor',
  'autoplay',
  'bluetooth',
  'camera',
  'clipboard-read',
  'clipboard-write',
  'encrypted-media',
  'fullscreen',
  'geolocation',
  'gyroscope',
  'microphone',
  'midi',
  'picture-in-picture',
  'usb',
]
  .map(d => `${d} *;`)
  .join('');
</script>

<template>
  <div class="warpper">
    <iframe :id="info.path" :src="info.config.remoteUrl" :allow="allow" frameborder="0" allowfullscreen="true" />
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
