export type FactCategory = 'dev' | 'hero'

export interface Fact {
  id: string
  category: FactCategory
  text: string
}

export const facts: Fact[] = []
