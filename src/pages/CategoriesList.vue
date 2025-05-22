<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useToolStore } from '@/tools/tools.store';

const route = useRoute();
const toolStore = useToolStore();
const category = computed(() => route.params.category.toString().toLowerCase());
const tools = computed(() => toolStore.tools.filter(d => d.categoryKey === category.value));
const { t } = useI18n();
const title = computed(() => t(`tools.categories.${category.value.replaceAll('-', ' ')}`, '未知分类'));

useHead({ title: `${title.value} - ${t('home.title')}` });
</script>

<template>
  <div class="mb-50px mt-50px">
    <div class="grid-wrapper mx-auto max-w-1400px">
      <h3 class="mb-35px mt-5px text-center font-size-50px text-neutral-800 font-900">
        {{ title }}
      </h3>
      <div class="wd:grid-cols-6 grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ToolCard v-for="tool in tools" :key="tool.name" :tool="tool" />
      </div>
    </div>
  </div>
  <!-- <favorite-list /> -->
</template>

<style scoped lang="less">
.height-enter-active,
.height-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 500px;
}

.height-enter-from,
.height-leave-to {
  max-height: 42px;
  overflow: hidden;
  opacity: 0;
  margin-bottom: 0;
}
</style>
