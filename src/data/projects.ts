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

export const projects: Project[] = []
