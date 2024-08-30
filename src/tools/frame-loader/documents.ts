import { MilitaryTechSharp } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const Docs = [
  defineTool({
    path: '/quick-reference',
    name: translate('tools.quick-reference.title', 'IT技能速查清单'),
    description: translate(
      'tools.quick-reference.description',
      '为IT开发人员分享的快速参考备忘清单【速查表】。这是英文版 Reference 的中文版本，目的是为了方便自己的技术栈查阅。'
    ),
    keywords: ['IT', '手册', '阅读', '备忘录', '速查'],
    component: () => import('./frame-loader.vue'),
    icon: MilitaryTechSharp,
    config: {
      remoteUrl: 'https://lzw.me/x/reference/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-30'),
  }),
  defineTool({
    path: '/webpage-color',
    name: translate('tools.webpage-color.title', '网页颜色搭配速查表'),
    description: translate('tools.webpage-color.description', '提供网页设计中颜色搭配表、颜色搭配图及网页颜色搭配技巧。'),
    keywords: ['IT', '手册', '颜色', '网站开发'],
    component: () => import('./frame-loader.vue'),
    icon: MilitaryTechSharp,
    config: {
      remoteUrl: 'https://lzw.me/pages/color/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-30'),
  }),
  defineTool({
    path: '/web-color',
    name: translate('tools.web-color.title', 'WEB标准颜色列表'),
    description: translate('tools.web-color.description', '提供网页设计中的WEB标准色和安全色值对照速查功能。'),
    keywords: ['手册', '标准色', '安全色', '网站开发', 'IT'],
    component: () => import('./frame-loader.vue'),
    icon: MilitaryTechSharp,
    config: {
      remoteUrl: 'https://lzw.me/doc/web-color/',
      hideHeader: true,
    },
    createdAt: new Date('2024-08-30'),
  }),
];
