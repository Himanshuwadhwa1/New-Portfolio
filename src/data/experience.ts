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

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-1',
    role: 'Backend Engineer',
    company: 'Intellemo.AI',
    location: 'Gurgaon, India',
    startDate: 'March 2026',
    endDate: 'Present',
    bullets: [
      'Led UI architecture for a multi-tenant product experience.',
      'Improved interaction performance and design consistency across teams.',
      'Partnered with design and platform peers on scalable component systems.',
    ],
    techTags: ['Python', 'GraphQL', 'Microservices', 'AWS', 'Postgres', 'Docker'],
  },
  {
    id: 'exp-2',
    role: 'Software Engineer',
    company: 'Smarter.codes',
    location: 'Remote',
    startDate: 'February 2025',
    endDate: 'March 2026',
    bullets: [
      'Built customer-facing dashboards and internal tooling.',
      'Contributed to product reliability and observability initiatives.',
      'Mentored junior engineers through code reviews and pairing sessions.',
    ],
    techTags: ['Python', 'Javascript', 'Typescript', 'React.js', 'MongoDB', 'RAG Systems', 'Prompt Engineering'],
  },
]
