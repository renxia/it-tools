<script setup lang="ts">
import { IconFileDescription, IconDragDrop, IconHeart, IconSearch } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import VueMarkdown from 'vue-markdown-render';
import ColoredCard from '../components/ColoredCard.vue';
import ToolCard from '../components/ToolCard.vue';
import FavoriteList from './FavoriteList.vue';
import { storage } from '@/utils/storage';
import { useToolStore } from '@/tools/tools.store';
import { config } from '@/config';
import { useTheme } from '../ui/c-link/c-link.theme';

const base = import.meta.env.BASE_URL ?? '/';
const homeCustomMarkdown = ref('');
let isFetching = false;

async function fetchCustomMarkdown() {
  if (isFetching) {
    return;
  }

  const cacheValue = storage.get('homeCustomMarkdown');
  if (cacheValue != null) {
    homeCustomMarkdown.value = cacheValue;
    return;
  }

  isFetching = true;

  try {
    const remoteCustomHomeMarkdownResponse = await fetch(`${base}home.custom.md`);
    if (remoteCustomHomeMarkdownResponse.ok) {
      homeCustomMarkdown.value = await remoteCustomHomeMarkdownResponse.text();
      storage.set('homeCustomMarkdown', homeCustomMarkdown.value);
    }
  }
  catch (error) {
    console.error('Failed to fetch custom markdown:', error);
    // 忽略错误，保持空白内容
  }
  finally {
    isFetching = false;
  }
}

// 在组件挂载时获取自定义内容
fetchCustomMarkdown();

const toolStore = useToolStore();
const router = useRouter();
const { t } = useI18n();

const linkTheme = useTheme();

const isOrderingFavorites = ref(false);

useHead({ title: `${t('home.title')} - ${t('home.subtitle')}` });

// 计算工具分类
const featuredCates = ['fun', 'gaming', 'images'];
const categories = computed(() => {
  const categoryList = toolStore.toolsByCategory.map(category => {
    const key = category.components[0]?.categoryKey || category.name.toLowerCase().replace(/ /g, '-');
    return {
      name: category.name,
      count: category.components.length,
      key,
      isFeatured: featuredCates.includes(key),
    };
  });

  return categoryList.sort((a, b) => b.count - a.count);
});

function randomTool() {
  // `toolStore.tools` is a computed ref; access `.value` in script
  const list = (toolStore.tools as any).value ?? toolStore.tools;
  const toolsArray = Array.isArray(list) ? list : [];
  if (toolsArray.length === 0) return;

  const idx = Math.floor(Math.random() * toolsArray.length);
  const tool = toolsArray[idx];
  if (tool && tool.path) {
    router.push(tool.path);
  }
}

// 搜索框相关
const isMac = computed(() => window.navigator.userAgent.toLowerCase().includes('mac'));

function openCommandPalette() {
  document.getElementById('searchBtn')?.click();
}

// Batch loading logic for tool cards
const TOOLS_PER_ROW = 4; // Based on xl:grid-cols-4
const ROWS_PER_BATCH = 6;
const TOOLS_PER_BATCH = TOOLS_PER_ROW * ROWS_PER_BATCH; // 32 tools per batch

const visibleToolsCount = ref(TOOLS_PER_BATCH); // Start with first batch
let loadingObserver: IntersectionObserver | null = null;

// Computed property for visible tools
const visibleTools = computed(() => {
  return toolStore.tools.slice(0, visibleToolsCount.value);
});

// Function to load next batch
function loadNextBatch() {
  if (visibleToolsCount.value < toolStore.tools.length) {
    visibleToolsCount.value = Math.min(
      visibleToolsCount.value + TOOLS_PER_BATCH,
      toolStore.tools.length,
    );
  }
}

// Start intersection observer on component mount
onMounted(() => {
  nextTick(() => {
    // Load first batch immediately
    loadNextBatch();

    // Setup intersection observer for lazy loading
    const loadingIndicator = document.querySelector('[data-loading-indicator]');
    if (loadingIndicator) {
      loadingObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && visibleToolsCount.value < toolStore.tools.length) {
            loadNextBatch();
          }
        },
        { rootMargin: '200px' },
      );
      loadingObserver.observe(loadingIndicator);
    }
  });
});

// Clean up on component unmount
onUnmounted(() => {
  if (loadingObserver) {
    loadingObserver.disconnect();
    loadingObserver = null;
  }
});
</script>

<template>
  <div class="home-page p-15px pt-0">
    <!-- Hero section -->
    <div class="hero-section mb-30px py-30px text-center">
      <h1 class="mb-4 text-4xl font-bold md:text-5xl">
        {{ $t('home.title') }}
      </h1>
      <p class="mx-auto max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
        {{ $t('home.subtitle') }}
      </p>

      <!-- 搜索框 -->
      <div class="mx-auto mt-8 max-w-2xl px-4">
        <div class="flex flex-col md:flex-row items-center gap-4">
          <div class="w-full md:flex-1">
            <div
              class="search-box cursor-pointer border border-gray-200 rounded-xl bg-white p-4 shadow-lg transition-all duration-300 dark:border-dark-300 dark:bg-dark-500 hover:shadow-xl"
              @click="openCommandPalette"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center text-gray-400 dark:text-gray-500">
                  <IconSearch class="mr-3 text-xl" />
                  <span class="text-lg">{{ $t('search.placeholder') }}</span>
                </div>

                <div class="items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-500 sm:flex dark:bg-dark-300">
                  <span>{{ isMac ? '?' : 'Ctrl' }}</span>
                  <span>+</span>
                  <span>K</span>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full md:w-auto">
            <button
              type="button"
              @click="randomTool"
              class="lucky-button w-full md:w-auto flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-md"
              :aria-label="$t('home.lucky', '碰碰运气')"
            >
              <IconSearch class="text-xl transform rotate-45" />
              <span>{{ $t('home.lucky', '碰碰运气') }}</span>
            </button>
          </div>
        </div>

        <p class="mt-4 text-lg text-neutral-500 dark:text-neutral-500">
          {{ toolStore.tools.length }}+ {{ $t('home.categories.allTools') }}
        </p>
      </div>
    </div>

    <div class="grid-wrapper mx-auto max-w-1400px">
      <!-- 分类导航 -->
      <div class="categories-section mb-40px">
        <h2 class="mb-20px text-2xl font-bold">
          {{ $t('home.categories.browseByCategory') }}
        </h2>
        <div class="grid grid-cols-2 gap-15px lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
          <router-link
            v-for="category in categories"
            :key="category.key"
            :to="`/category/${category.key}`"
            :class="[
              'category-card rounded-xl bg-white p-20px shadow-sm transition-all duration-300 dark:bg-dark-500 dark:shadow-md hover:shadow-md',
              { 'featured-category': category.isFeatured }
            ]"
          >
            <div class="mb-2 truncate text-lg font-bold text-dark-500 dark:text-white">
              {{ category.name }}
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ category.count }} {{ $t('home.categories.toolCount', [category.count]) }}
            </div>

            <div v-if="category.isFeatured" class="category-badge hidden">
              {{ $t('home.categories.featured', 'Featured') }}
            </div>
          </router-link>
        </div>
      </div>

      <!-- 特色内容 -->
      <div v-if="config.showBanner || config.showSponsorBanner" class="featured-section mb-40px">
        <div class="wd:grid-cols-6 grid grid-cols-1 gap-6px md:gap-10px lg:gap-12px lg:grid-cols-3md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
          <ColoredCard v-if="config.showBanner" :title="$t('home.follow.title')" :icon="IconHeart">
            {{ $t('home.follow.p1') }}
            <a
              href="https://github.com/sharevb/it-tools"
              rel="noopener"
              target="_blank"
              :aria-label="$t('home.follow.githubRepository')"
            >GitHub</a>
            {{ $t('home.follow.thankYou') }}
            <n-icon :component="IconHeart" />
          </ColoredCard>

          <a v-if="config.showSponsorBanner" href="https://renderize.tech?utm_source=it-tools&utm_medium=banner" target="_blank" rel="noopener" class="text-current decoration-none">
            <c-card class="cursor-pointer !border-2px !hover:border-primary">
              <div class="flex items-center justify-between">
                <n-icon :component="IconFileDescription" class="text-neutral-400 dark:text-neutral-600" size="40" />
                <div class="rounded-full bg-#eeeeee px-10px py-2px text-xs text-black dark:bg-#333333 dark:text-white">
                  Sponsor
                </div>
              </div>

              <div class="my-5px flex items-baseline gap-4 text-balance text-lg text-black dark:text-white">
                Generate PDFs from HTML with Renderize API
              </div>
              <div class="text-neutral-500 dark:text-neutral-400">
                Automate your document generation with our fast, developer-friendly API. Start with a free forever plan.
              </div>
            </c-card>
          </a>
        </div>
      </div>

      <!-- 收藏工具 -->
      <FavoriteList />

      <!-- 最新工具 -->
      <div v-if="toolStore.newTools.length > 0" class="new-tools-section mb-40px">
        <h2 class="mb-20px text-2xl font-bold">
          {{ t('home.categories.newestTools') }} ({{ toolStore.newTools.length }})
        </h2>
        <div class="grid grid-cols-1 gap-6px md:gap-10px lg:gap-12px lg:grid-cols-3md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
          <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
        </div>
      </div>

      <!-- 自定义内容 -->
      <div v-if="homeCustomMarkdown" class="custom-section mb-40px">
        <VueMarkdown :source="homeCustomMarkdown" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-page {
  :deep(.n-card) {
    border-radius: 12px;
  }
}

.hero-section {
  background: linear-gradient(120deg, #f6f9fc 0%, #eff4f9 100%);
  border-radius: 16px;

  .dark & {
    background: linear-gradient(120deg, #1a202c 0%, #2d3748 100%);
  }
}

.search-box {
  transition: all 0.3s ease;

  &:hover {
    border-color: #409eff;

    .dark & {
      border-color: #409eff;
    }
  }
}

.lucky-button {
  background: linear-gradient(45deg, #ff7a7a 0%, #ffbf61 50%, #6a5cff 100%);
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.lucky-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 30px rgba(106, 92, 255, 0.18);
}

.lucky-button IconSearch {
  color: #fff;
}

@media (max-width: 768px) {
  .lucky-button {
    /* 在小屏幕显示为块级并占满宽度（通过模板已设置宽度），微调字体和间距 */
    padding: 12px 16px;
    font-size: 14px;
  }
}

.category-card {
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
}

.category-card.featured-category {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(135deg, #ff5f6d 0%, #ffc371 20%, #8be37b 40%, #4ad6ff 60%, #6a5cff 80%, #ff6ec7 100%);
  background-size: 200% 200%;
  animation: rainbow-slide 8s linear infinite;
  color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.category-card.featured-category .mb-2,
.category-card.featured-category .text-gray-500 {
  color: #ffffff !important;
}

.category-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  line-height: 1;
  backdrop-filter: blur(4px);
}

@keyframes rainbow-slide {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Dark theme tweak: slightly reduce brightness */
.dark .category-card.featured-category {
  filter: brightness(0.95);
}

// 响应式优化
@media (max-width: 1024px) {
  .hero-section {
    padding: 20px 15px;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }
}


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

::v-deep(.home-custom-md) a {
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  color: v-bind('linkTheme.default.textColor');
  border-radius: 4px;
  transition: color cubic-bezier(0.4, 0, 0.2, 1) 0.3s;

  outline-offset: 1px;

  &:hover {
    color: v-bind('linkTheme.default.hover.textColor');
  }

  &:active {
    color: v-bind('linkTheme.default.textColor');
  }

  &:focus {
    color: v-bind('linkTheme.default.outline.color');
  }
}
</style>
