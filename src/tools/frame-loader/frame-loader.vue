<script setup lang="ts">
import { getRouteInfo } from '@/utils/comm';

const route = useRoute();
const info = getRouteInfo(route);
const loading = ref(true);

function onLeave() {
  !info.config.remoteUrl && document.querySelector('#mLayoutContent')?.classList.remove('wide');
  !info.config.hideHeader && document.querySelector('.tool-layout')?.classList.remove('hide');
}

function onLoad() {
  loading.value = false;
}

onBeforeRouteLeave((to) => {
  Object.assign(info, getRouteInfo(to));
  onLeave();
  if (info.config.remoteUrl) {
    loading.value = true;
    setTimeout(() => loading.value = false, 5000);
  }
});

onMounted(() => {
  info.config.remoteUrl && document.querySelector('#mLayoutContent')?.classList.add('wide');
  info.config.hideHeader && document.querySelector('.tool-layout')?.classList.add('hide');

  setTimeout(() => loading.value = false, 5000);
});

onUnmounted(() => onLeave());

const top = info.config.hideHeader ? '80px' : '240px';
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
    <div v-if="loading" class="loading flex items-center justify-center">
      <n-spin :show="loading" size="large" />
    </div>
    <iframe :id="info.path" :src="info.config.remoteUrl" :allow="allow" frameborder="0" allowfullscreen="true" @load="onLoad" />
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
  position: relative;

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0,0,0,.1);
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
