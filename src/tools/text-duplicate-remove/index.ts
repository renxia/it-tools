import { FileDiff } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.text-duplicate-remove.title'),
  path: '/text-duplicate-remove',
  description: translate('tools.text-duplicate-remove.description'),
  keywords: ['text', 'duplicate', 'remove', 'string', 'text duplicate remove', 'code'],
  component: () => import('./text-duplicate-remove.vue'),
  icon: FileDiff,
  createdAt: new Date('2025-05-26'),
});
