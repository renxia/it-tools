<script setup lang="ts">
import { computed } from 'vue';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';

const route = useRoute();
const toolStore = useToolStore();
const relatedTools = computed(() => toolStore.getRelatedTools(route.path));
</script>

<template>
  <div v-if="relatedTools.length > 0" class="related-tools grid-wrapper mx-auto mt-4 mb-4">
    <h3 class="mb-5px mt-25px text-neutral-400 font-500">
      {{ $t('home.categories.relatedTools') }} ({{ relatedTools.length }})
    </h3>
    <div class="wd:grid-cols-6 grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
      <ToolCard v-for="tool in relatedTools" :key="tool.path" :tool="tool" />
    </div>
  </div>
</template>
