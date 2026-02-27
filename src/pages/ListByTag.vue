<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useToolStore } from '@/tools/tools.store';

const { t } = useI18n();
const route = useRoute();
const tag = route.params.tag.toString();
const toolStore = useToolStore();
const tools = computed(() => toolStore.tools.filter(d => d.keywords?.includes(tag)));

useHead({ title: `${tag} - ${t('home.categories.tag', '标签')} - ${t('home.title')}` });
</script>

<template>
  <div class="mb-50px mt-50px">
    <div class="grid-wrapper mx-auto max-w-1400px">
      <h3 class="font-900 font-size-50px mb-35px mt-5px text-center text-neutral-800">
        {{ t('home.categories.tag', '标签') }}: {{ tag }}
      </h3>
      <div class="wd:grid-cols-6 grid grid-cols-1 gap-6px md:gap-10px lg:gap-12px lg:grid-cols-3md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ToolCard v-for="tool in tools" :key="tool.name" :tool="tool" />
      </div>
    </div>
  </div>
</template>
