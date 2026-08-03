export type ToolCategory = 'Languages' | 'Frameworks' | 'Infra' | 'AI-ML'

export interface Tool {
  name: string
  category: ToolCategory
  iconUrl?: string
}

export const tools: Tool[] = [
  { name: 'TypeScript', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'React', category: 'Frameworks' },
  { name: 'Tailwind CSS', category: 'Frameworks' },
  { name: 'Docker', category: 'Infra' },
  { name: 'AWS', category: 'Infra' },
  { name: 'OpenAI APIs', category: 'AI-ML' },
  { name: 'RAG Systems', category: 'AI-ML' },
]
