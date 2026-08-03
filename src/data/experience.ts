export interface ExperienceEntry {
  id: string
  role: string
  company: string
  location?: string
  startDate: string
  endDate: string | 'Present'
  bullets: string[]
  techTags: string[]
}

export const experience: ExperienceEntry[] = []
