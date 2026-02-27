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
    <c-collapse>
      <template #title>
        <h3 class="mb-5px mt-5px text-neutral-400 font-500">
          {{ $t('home.categories.relatedTools') }} ({{ relatedTools.length }})
        </h3>
      </template>
    <div class="wd:grid-cols-6 grid grid-cols-1 gap-6px md:gap-10px lg:gap-12px lg:grid-cols-3md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
      <ToolCard v-for="tool in relatedTools" :key="tool.path" :tool="tool" />
    </div>
  </c-collapse>
  </div>
</template>
