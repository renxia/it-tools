<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const route = useRoute();

const head = computed<HeadObject>(() => ({
  title: `${route.meta.name} - 忒有趣工具箱`,
  meta: [
    {
      name: 'description',
      content: route.meta?.description as string,
    },
    {
      name: 'keywords',
      content: ((route.meta.keywords ?? []) as string[]).join(','),
    },
  ],
}));
useHead(head);
const { t } = useI18n();

const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => t(`tools.${i18nKey.value}.title`, String(route.meta.name)));
const toolDescription = computed<string>(() => t(`tools.${i18nKey.value}.description`, String(route.meta.description)));
const showTwikoow = ref(false);

watch(route, (r) => {
  const cfg = (r.meta as unknown as Tool).config || {};

  setTimeout(() => {
    const h5Utils = (window as any).h5Utils;

    if (h5Utils?.initTwikoo) {
      const el = document.getElementById('twikoo');

      if (el) {
        el.innerHTML = '';

        showTwikoow.value = !cfg.remoteUrl;

        if (!cfg.remoteUrl) {
          h5Utils.initTwikoo({ el: '#twikoo', path: r.path });
        }
      }
    }

    const gga = document.getElementById('gga');
    if (gga) {
      gga.style.display = cfg.remoteUrl ? 'none' : 'block';
      if (h5Utils?.initGa && gga.innerHTML.trim() === '') {
        h5Utils.initGa(gga);
      }
    }
  }, 50);
}, { immediate: true });
</script>

<template>
  <BaseLayout>
    <div class="tool-layout">
      <div class="tool-header">
        <div flex flex-nowrap items-center justify-between>
          <n-h1>
            {{ toolTitle }}
          </n-h1>

          <div>
            <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
          </div>
        </div>

        <div class="separator" />

        <div class="description">
          {{ toolDescription }}
        </div>
      </div>
    </div>

    <div id="gga" class="t-row" />

    <div class="tool-content">
      <slot />
    </div>

    <c-card id="twikooWrapper" class="t-row mb-4 mt-4" :style="{ display: showTwikoow ? 'block' : 'none' }" title="评论">
      <div id="twikoo" />
    </c-card>
  </BaseLayout>
</template>

<style lang="less" scoped>
.t-row {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

.tool-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;

  ::v-deep(& > *) {
    flex: 0 1 900px;
  }
}

.tool-layout {
  max-width: 900px;
  margin: 0 auto;
  box-sizing: border-box;

  .tool-header {
    padding: 40px 0;
    width: 100%;

    .n-h1 {
      opacity: 0.9;
      font-size: 40px;
      font-weight: 400;
      margin: 0;
      line-height: 1;
    }

    .separator {
      width: 200px;
      height: 2px;
      background: rgb(161, 161, 161);
      opacity: 0.2;

      margin: 10px 0;
    }

    .description {
      margin: 0;

      opacity: 0.7;
    }
  }
}
</style>
