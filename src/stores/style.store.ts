import { useDark, useMediaQuery, useStorage, useToggle } from '@vueuse/core';
import { defineStore } from 'pinia';
import { type Ref, watch } from 'vue';

export const useStyleStore = defineStore('style', {
  state: () => {
    const isDarkTheme = useDark();
    const toggleDark = useToggle(isDarkTheme);
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const isMediumScreen = useMediaQuery('(min-width: 980px) and (max-width: 1500px)');
    const isLargeScreen = useMediaQuery('(min-width: 1500px)');
    const isMenuCollapsed = useStorage('isMenuCollapsed', true) as Ref<boolean>;

    watch(isSmallScreen, v => (isMenuCollapsed.value = v));

    return {
      isDarkTheme,
      toggleDark,
      isMenuCollapsed,
      isSmallScreen,
      isMediumScreen,
      isLargeScreen,
    };
  },
});
