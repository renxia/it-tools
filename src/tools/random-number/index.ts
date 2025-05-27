import { Number9 } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.random-number.title', '随机数生成器'),
  path: '/random-number',
  description: translate('tools.random-number.description', '彩票号码、抽奖号码机数生成工具'),
  keywords: ['random', '随机', 'number', 'random number generator', 'random number'],
  component: () => import('./random-number.vue'),
  icon: Number9,
  createdAt: new Date('2025-05-28'),
});
