import { Magnet } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.torrent-to-magnet.title'),
  path: '/torrent-to-magnet',
  description: translate('tools.torrent-to-magnet.description'),
  keywords: ['torrent', 'to', 'magnet'],
  component: () => import('./torrent-to-magnet.vue'),
  icon: Magnet,
  createdAt: new Date('2024-04-23'),
});
