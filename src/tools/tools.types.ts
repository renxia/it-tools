import type { Component } from 'vue';

export interface Tool<T = any> {
  name: string
  path: string
  description: string
  keywords: string[]
  component: () => Promise<Component>
  icon: Component
  redirectFrom?: string[]
  isNew: boolean
  createdAt?: Date
  config?: T
}

export interface ToolCategory {
  name: string
  components: ToolWithCategory[]
}

export type ToolWithCategory = Tool & { category?: string; categoryKey?: string };
