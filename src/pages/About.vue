<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: '关于我们 - 有趣工具箱' });

onMounted(() => {
  h5Utils.initTwikoo();
});
</script>

<template>
  <c-markdown :markdown="$t('about.content')" mx-auto mt-50px max-w-600px />
  <div class="mx-auto mt-50px max-w-600px">
    <div id="twikooComment" />
  </div>
</template>
