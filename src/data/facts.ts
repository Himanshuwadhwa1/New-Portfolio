export type FactCategory = 'dev' | 'hero'

export interface Fact {
  id: string
  category: FactCategory
  text: string
}

export const facts: Fact[] = [
  { id: 'fact-dev-1', category: 'dev', text: 'The first computer bug was an actual moth found in a relay.' },
  { id: 'fact-dev-2', category: 'dev', text: 'Null references were once called the billion-dollar mistake.' },
  { id: 'fact-hero-1', category: 'hero', text: 'The idea of a shared superhero universe became a major Marvel strategy in the 2000s.' },
  { id: 'fact-hero-2', category: 'hero', text: 'Many anime heroes are shaped by very human flaws, not just power.' },
]
