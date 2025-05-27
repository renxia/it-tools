<script setup lang="ts">
import { useToolStore } from '@/tools/tools.store';
import { useStyleStore } from '@/stores/style.store';

const cate = ref('');
const router = useRouter();
const { t } = useI18n();
const toolStore = useToolStore();
const styleStore = useStyleStore();

const allCategories = computed(() =>
  toolStore.toolsByCategory
    .filter(d => d.components.length > 0)
    .map((d) => {
      const key = d.components[0].categoryKey;
      return {
        label: t(`tools.categories.${key.replace(/-/g, ' ')}`, d.name),
        value: key,
      };
    }),
);

const topMaxCount = computed(() => styleStore.isLargeScreen ? 8 : styleStore.isMediumScreen ? 6 : 4);
const topCategories = computed(() => allCategories.value.slice(0, topMaxCount.value));
const moreCategories = computed(() => allCategories.value.slice(topMaxCount.value));

function handleCategoryClick(key: string) {
  cate.value = key;
  router.push(`/category/${key}`);
}

watch(cate, () => {
  if (cate.value) {
    router.push(`/category/${cate.value}`);
  }
});

onBeforeRouteLeave((to) => {
  if (!to.fullPath.includes('/category') && cate.value) {
    cate.value = '';
  }
});
</script>

<template>
  <div class="flex items-center gap-2">
    <template v-if="styleStore.isSmallScreen">
      <c-select
        v-model:value="cate"
        :options="allCategories"
        placeholder="选择分类"
        size="small"
        style="width: 100px;"
      />
    </template>
    <template v-else>
      <n-button
        v-for="item in topCategories"
        :key="item.value"
        size="small"
        :type="cate === item.value ? 'primary' : 'default'"
        @click="handleCategoryClick(item.value as string)"
      >
        {{ item.label }}
      </n-button>
      <c-select
        v-if="moreCategories.length > 0"
        v-model:value="cate"
        :options="moreCategories"
        placeholder="更多分类"
        size="small"
        style="width: 100px;"
      />
    </template>
  </div>
</template>
