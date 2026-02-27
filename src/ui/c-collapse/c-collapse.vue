<script lang="ts" setup>
import storage from '@/utils/storage';

interface CollapseProps {
  title?: string;
  storKey?: string;
  defaultCollapsed?: boolean;
}

const props = withDefaults(defineProps<CollapseProps>(), { title: '', storKey: '', defaultCollapsed: true });
const { title, storKey, defaultCollapsed } = toRefs(props);

const isCollapsed = ref(storage.get(storKey.value) ?? defaultCollapsed.value);
const toggle = () => {
  isCollapsed.value = !isCollapsed.value;
  if (storKey.value) {
    storage.set(storKey.value, isCollapsed.value);
  }
};
</script>

<template>
  <div>
    <div flex cursor-pointer items-center @click="toggle">
      <icon-mdi-triangle-down :class="{ 'transform-rotate--90': isCollapsed }" op-50 transition />

      <slot name="title">
        <span class="ml-2" font-bold>{{ title }}</span>
      </slot>
    </div>

    <div
      v-show="!isCollapsed"
      mt-2
    >
      <slot />
    </div>
  </div>
</template>
