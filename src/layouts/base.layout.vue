<script lang="ts" setup>
import { NIcon, useThemeVars } from 'naive-ui';

import { RouterLink } from 'vue-router';
import { Heart, Home2, Menu2 } from '@vicons/tabler';

import { storeToRefs } from 'pinia';
import HeroGradient from '../assets/hero-gradient.svg?component';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import { useTracker } from '@/modules/tracker/tracker.services';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const themeVars = useThemeVars();
const styleStore = useStyleStore();
// const version = config.app.version;
// const commitSha = config.app.lastCommitSha.slice(0, 7);

const { tracker } = useTracker();
const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper">
        <HeroGradient class="gradient" />
        <div class="text-wrapper">
          <div class="title">
            {{ $t('home.title') }}
          </div>
          <div class="divider" />
          <div class="subtitle">
            {{ $t('home.subtitle') }}
          </div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
          <locale-selector w="90%" />

          <div flex justify-center>
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer">
          <!-- <div>
            IT-Tools

            <c-link target="_blank" rel="noopener" :href="`https://github.com/CorentinTh/it-tools/tree/v${version}`">
              v{{ version }}
            </c-link>

            <template v-if="commitSha && commitSha.length > 0">
              -
              <c-link
                target="_blank"
                rel="noopener"
                type="primary"
                :href="`https://github.com/CorentinTh/it-tools/tree/${commitSha}`"
              >
                {{ commitSha }}
              </c-link>
            </template>
          </div> -->
          <div>
            © {{ new Date().getFullYear() }}
            <c-link target="_blank" rel="noopener" href="https://lzw.me/tools-messagewall"> lzw.me </c-link>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <header>
        <nav>
          <c-button
            circle
            variant="text"
            :aria-label="$t('home.toggleMenu')"
            @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
          >
            <NIcon size="25" :component="Menu2" />
          </c-button>

          <c-tooltip :tooltip="$t('home.home')" position="bottom">
            <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
              <NIcon size="25" :component="Home2" />
            </c-button>
          </c-tooltip>

          <c-tooltip :tooltip="$t('home.uiLib')" position="bottom">
            <c-button v-if="config.app.env === 'development'" to="/c-lib" circle variant="text" :aria-label="$t('home.uiLib')">
              <icon-mdi:brush-variant text-20px />
            </c-button>
          </c-tooltip>

          <command-palette />

          <categories-select />

          <locale-selector v-if="!styleStore.isSmallScreen" />

          <div>
            <NavbarButtons />
          </div>

          <c-tooltip position="bottom" :tooltip="$t('home.support')">
            <c-button
              round
              href="https://lzw.me/donate"
              rel="noopener"
              target="_blank"
              class="support-button"
              :bordered="false"
              @click="() => tracker.trackEvent({ eventName: 'Support button clicked' })"
            >
              {{ $t('home.buyMeACoffee') }}
              <NIcon v-if="!styleStore.isSmallScreen" :component="Heart" ml-2 />
            </c-button>
          </c-tooltip>
        </nav>
      </header>
      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: linear-gradient(90deg, #f8fafc 60%, #e6f4ea 100%);
  box-shadow: 0 2px 8px 0 #0001;
  min-height: 56px;
  display: flex;
  align-items: center;
  transition: background 0.2s;

  @media (max-width: 640px) {
    padding: 0 8px;
    min-height: 48px;
    gap: 6px;
  }
  // 暗色模式
  .dark & {
    background: linear-gradient(90deg, #232323 60%, #1c1c1c 100%);
    box-shadow: 0 2px 8px 0 #0006;
  }
}

nav {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.support-button {
  display: inline-flex !important;
  background: rgb(37, 99, 108);
  background: linear-gradient(48deg, rgba(37, 99, 108, 1) 0%, rgba(59, 149, 111, 1) 60%, rgba(20, 160, 88, 1) 100%);
  color: #fff !important;
  transition:
    padding 0.2s,
    box-shadow 0.2s !important;
  box-shadow: 0 2px 8px 0 #0002;
  font-weight: 500;
  border-radius: 20px;
  margin-left: 8px;
  &:hover {
    color: #fff;
    padding-left: 30px;
    padding-right: 30px;
    box-shadow: 0 4px 16px 0 #0003;
    filter: brightness(1.08);
  }
}

.footer {
  text-align: center;
  color: #838587;
  margin-top: 20px;
  padding: 20px 0;
}

.sider-content {
  padding-top: 160px;
  padding-bottom: 200px;
}

.hero-wrapper {
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  z-index: 10;
  overflow: hidden;

  .gradient {
    margin-top: -65px;
  }

  .text-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 16px;
    color: #fff;

    .title {
      font-size: 25px;
      font-weight: 600;
    }

    .divider {
      width: 50px;
      height: 2px;
      border-radius: 4px;
      background-color: v-bind('themeVars.primaryColor');
      margin: 0 auto 5px;
    }

    .subtitle {
      font-size: 16px;
    }
  }
}
</style>
