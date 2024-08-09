import { Magnet } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const getMyCoordinate = defineTool({
  name: translate('tools.coordinate.title') || '查询我的位置经纬度',
  path: '/coordinate',
  description: translate('tools.coordinate.description'),
  keywords: ['我的位置', '经纬度', '坐标系', '地图', '坐标系转换', '批量转换'],
  component: () => import('./frame-loader.vue'),
  icon: Magnet,
  config: {
    remoteUrl: 'https://lzw.me/x/coordinate',
    hideHeader: true,
  },
  createdAt: new Date('2024-08-09'),
});
