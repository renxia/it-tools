<script setup lang="ts">
import { IconDragDrop, IconHeart } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import Draggable from 'vuedraggable';
import ColoredCard from '../components/ColoredCard.vue';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';
import { config } from '@/config';

const route = useRoute();
const toolStore = useToolStore();
const { t } = useI18n();
const favoriteTools = computed(() => toolStore.favoriteTools);
const isOrderingFavorites = ref(false);

onMounted(() => {
  window.addEventListener('contextmenu', oncontextmenu);
});

onUnmounted(() => {
  window.removeEventListener('contextmenu', oncontextmenu);
});

// 从 props
if (route.meta.isPage) {
  useHead({ title: `${t('home.categories.favoriteTools')} - ${t('home.title')}` });
}

function oncontextmenu(e: MouseEvent) {
  if (isOrderingFavorites.value) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
}

function startOrderingFavorites() {
  isOrderingFavorites.value = true;
}

// Update favorite tools order when drag is finished
function stopOrderingFavorites() {
  isOrderingFavorites.value = false;
  toolStore.updateFavoriteTools(favoriteTools.value); // Update the store with the new order
}
</script>

<template>
  <div :class="`mt-50px mb-25px ${route.meta.isPage ? 'p-15px' : ''}`">
    <div class="grid-wrapper mx-auto max-w-1400px">
      <div v-if="route.meta.isPage && config.showBanner" class="wd:grid-cols-6 grid grid-cols-1 gap-6px md:gap-10px lg:gap-12px lg:grid-cols-3md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ColoredCard :title="$t('home.follow.title')" :icon="IconHeart">
          {{ $t('home.follow.p1') }}
          <a
            href="https://github.com/CorentinTh/it-tools"
            rel="noopener"
            target="_blank"
            :aria-label="$t('home.follow.githubRepository')"
          >GitHub</a>
          {{ $t('home.follow.p2') }}
          <a
            href="https://x.com/ittoolsdottech"
            rel="noopener"
            target="_blank"
            :aria-label="$t('home.follow.twitterXAccount')"
          >X</a>.
          {{ $t('home.follow.thankYou') }}
          <n-icon :component="IconHeart" />
        </ColoredCard>
      </div>

      <transition name="height">
        <div v-if="toolStore.favoriteTools.length > 0">
          <h2 class="mb-20px text-2xl font-bold">
            {{ $t('home.categories.favoriteTools') }} ({{ toolStore.favoriteTools.length }})
            <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
              <n-icon :component="IconDragDrop" size="18" />
            </c-tooltip>
          </h2>
          <Draggable
            :list="favoriteTools"
            class="wd:grid-cols-6 grid grid-cols-1 gap-6px md:gap-10px lg:gap-12px lg:grid-cols-3md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
            ghost-class="ghost-favorites-draggable"
            item-key="name"
            :delay="100"
            @start="startOrderingFavorites"
            @end="stopOrderingFavorites"
          >
            <template #item="{ element: tool }">
              <ToolCard :tool="tool" />
            </template>
          </Draggable>
        </div>

        <div v-else>
          <div v-if="route.meta.isPage" class="h-full flex flex-col items-center justify-center py-20">
            <n-icon :component="IconHeart" :size="48" class="mb-4 text-red-500" />
            <h3 class="mb-2 text-center text-2xl font-bold">
              {{ $t('home.categories.favoriteTools') }}
            </h3>
            <p class="max-w-100 text-center text-gray-500 dark:text-gray-400">
              {{ $t('home.noFavoriteToolsText', [], '暂无收藏') }}
            </p>
            <n-button type="primary" class="mt-6" @click="$router.push('/')">
              {{ $t('home.home', [], '返回首页') }}
            </n-button>
          </div>
        </div>
      </transition>
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

.ghost-favorites-draggable {
  opacity: 0.4;
  background-color: #ccc;
  border: 2px dashed #666;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
  animation: ghost-favorites-draggable-animation 0.2s ease-out;
}

@keyframes ghost-favorites-draggable-animation {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 0.4;
    transform: scale(1.0);
  }
}
</style>
