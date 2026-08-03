export type ToolCategory = 'Languages' | 'Frameworks' | 'Infra' | 'AI-ML'

export interface Tool {
  name: string
  category: ToolCategory
  iconUrl?: string
}

export const tools: Tool[] = []
