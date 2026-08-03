export interface Project {
  id: string
  title: string
  pitch: string
  description?: string
  techBadges: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Signal Studio',
    pitch: 'A composable analytics workspace for product and engineering teams.',
    description: 'Placeholder project summary for the portfolio cards.',
    techBadges: ['React', 'TypeScript', 'Vite'],
    githubUrl: 'https://github.com/example/signal-studio',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Flow Queue',
    pitch: 'A workflow orchestration tool that simplifies ops handoffs.',
    description: 'Placeholder project summary for later replacement.',
    techBadges: ['Node.js', 'Postgres', 'Docker'],
    githubUrl: 'https://github.com/example/flow-queue',
  },
]
