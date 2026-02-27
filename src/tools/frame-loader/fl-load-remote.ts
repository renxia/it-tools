import storage from '@/utils/storage';
import { defineTool } from '../tool';
import type { ToolWithCategory } from '../tools.types';
import { FLIcons } from './fl-icons';
import { FLTools } from './fl-tools';

export interface RemoteTool extends Partial<Pick<ToolWithCategory, 'path' | 'keywords' | 'config'>> {
  name?: string;
  path: string;
  description: string;
  url?: string;
  createdAt?: string;
  icon?: string;
  hidden?: boolean;
};

export async function loadRemoteTools(): Promise<ToolWithCategory[]> {
  const base = import.meta.env.BASE_URL ?? '/';
  const remoteFLTools: ToolWithCategory[] = [];
  let remoteList = storage.get<RemoteTool[]>('remote-fl-tools') || [];

  if (!remoteList?.length) {
    const remoteConfigFLTools = await fetch(`${base}tools-fl.json`);
    if (remoteConfigFLTools.ok) {
      const data = await remoteConfigFLTools.json();
      if (Array.isArray(data.list)) {
        remoteList = data.list;
        storage.set('remote-fl-tools', remoteList, 3600 * 24);
      }
    }
  }

  remoteList.forEach(tool => {
    if (!tool.config) tool.config = { remoteUrl: tool.url, hideHeader: false };
    if (!tool.config.remoteUrl || tool.config.hidden || tool.hidden) return;

    const key = tool.config.remoteUrl.split('/').filter(Boolean).pop() || tool.name;
    if (!key) return;

    if (!tool.name) tool.name = key;
    if (!tool.path) tool.path = `/${key}`;
    if (!tool.path.startsWith('/')) tool.path = `/${tool.path}`;

    const item = FLTools.find(d => d.config && d.config.remoteUrl === tool.config!.remoteUrl);

    if (item) {
      Object.assign(item.config!, tool.config);
      return;
    }

    remoteFLTools.push(
      defineTool({
        name: tool.name || key,
        category: 'Others',
        keywords: [key],
        ...tool,
        createdAt: new Date(tool.createdAt || '2025-12-01'),
        icon: FLIcons[tool.icon!] || FLIcons.default,
        component: () => import('./frame-loader.vue'),
      })
    );
  });

  return remoteFLTools;
}
