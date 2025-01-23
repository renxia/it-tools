<script setup lang="ts">
import { useToolStore } from '@/tools/tools.store';

const cate = ref('');
const router = useRouter();
const { t } = useI18n();
const toolStore = useToolStore();
const cateOptions = computed(() =>
  toolStore.toolsByCategory
    .filter(d => d.components.length > 0)
    .map((d) => {
      const key = d.components[0].categoryKey;
      return {
        label: t(`tools.categories.${key}`, d.name),
        value: key,
      };
    }),
);

watch(cate, () => {
  cate.value && router.push(`/category/${cate.value}`);
});

onBeforeRouteLeave((to) => {
  if (!to.fullPath.includes('/category') && cate.value) {
    cate.value = '';
  }
});
</script>

<template>
  <c-select v-model:value="cate" :options="cateOptions" placeholder="选择分类" w-100px />
</template>
