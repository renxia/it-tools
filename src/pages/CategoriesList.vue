<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useToolStore } from '@/tools/tools.store';

const route = useRoute();
const toolStore = useToolStore();
const category = computed(() => route.params.category.toString().toLowerCase());
const tools = computed(() => toolStore.tools.filter(d => d.categoryKey === category.value));
const { t } = useI18n();
const title = computed(() => t(`tools.categories.${category.value}`, '未知分类'));

useHead({ title: `${title.value}类工具 - 有趣工具箱` });
</script>

<template>
  <div class="pt-50px">
    <div class="grid-wrapper">
      <h3 class="mb-5px mt-25px text-neutral-400 font-900">
        {{ title }}
      </h3>
      <div class="wd:grid-cols-6 grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ToolCard v-for="tool in tools" :key="tool.name" :tool="tool" />
      </div>
    </div>
  </div>
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
