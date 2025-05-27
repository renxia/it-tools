import type { Component } from 'vue';
import 'vue-router';

export interface ToolCustomConfig extends Record<number | string, any> {
  /** 为 iframe 远程加载组件时的 src 地址 */
  remoteUrl?: string
  hideHeader?: boolean
}

export interface Tool {
  name: string
  path: string
  description: string
  keywords: string[]
  component: () => Promise<Component>
  icon: Component
  redirectFrom?: string[]
  isNew: boolean
  createdAt?: Date
  config?: ToolCustomConfig
}

export interface ToolCategory {
  name: string
  components: ToolWithCategory[]
}

export type ToolWithCategory = Tool & { category?: string; categoryKey?: string };

declare module 'vue-router' {
  interface RouteMeta extends Partial<Omit<Tool, 'component' | 'path'>> {
    isTool?: boolean
    layout?: Component
  }
}
