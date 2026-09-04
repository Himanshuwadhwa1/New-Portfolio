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
    role: 'Freelance Software Engineer',
    company: 'Self-employed',
    location: 'Remote',
    startDate: 'April 2026',
    endDate: 'Present',
    bullets: [
      'Went solo — building an entire ecommerce store from scratch for a devotional items business, React + Next.js style.',
      'Frontend and site structure? Done. Backend integration is currently in the lab, coming online soon.',
    ],
    techTags: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
  },
  {
    id: 'exp-2',
    role: 'Software Engineer (Backend)',
    company: 'Intellemo.ai',
    location: 'Gurgaon, Haryana, India',
    startDate: 'March 2026',
    endDate: 'April 2026',
    bullets: [
      'Wired up RESTful APIs and a GraphQL gateway across 6+ services — one control room, zero chaos.',
      'Put Google & Meta Ads campaigns on autopilot, freeing up 10 hrs/week across 35+ campaigns a month.',
      'Engineered automated Meta Ads video workflows that cranked campaign launch speed up by 20%.',
      'Used webhooks and microservices to sync campaign data across platforms in real time — no delays, no drift.',
      'Architected a broadcasting platform for Email + WhatsApp so campaigns fly out automatically at scale.',
    ],
    techTags: ['Python', 'GraphQL', 'REST APIs', 'Microservices', 'Webhooks'],
  },
  {
    id: 'exp-3',
    role: 'Full Stack AI Developer',
    company: 'Smarter.codes',
    location: 'Remote, Haryana, India',
    startDate: 'February 2025',
    endDate: 'March 2026',
    bullets: [
      'Built the AI-powered search and chatbot inside Kray.ai — pointed it at questions, got back real answers.',
      'Trained LLM pipelines on vector embeddings to push Kray.ai search relevance up another 10%.',
      'Stood up an analytics dashboard to track search activity, then battle-tested it with pytest and Jest.',
      "Tore down and rebuilt Agilewriter's document generation pipeline for Synterex — cut draft/review time by 40%.",
      'Refined the LLM prompt orchestration so medical writers got 25 hrs/week of their lives back.',
      "Ripped out Redis and swapped in CosmosDB for Agilewriter's similarity search — 30% faster retrieval.",
      'Built modular, reusable React components on SOLID principles — consistent UI, faster ship times.',
      'Plugged into CI/CD with Docker, making deploys smoother and way less nerve-wracking.',
    ],
    techTags: ['Python', 'React', 'FastAPI', 'LangChain', 'RAG', 'Vector Databases', 'CosmosDB', 'MongoDB', 'Docker'],
  },
  {
    id: 'exp-4',
    role: 'MERN Stack Developer',
    company: 'UnlockDiscounts',
    location: 'Remote',
    startDate: 'January 2025',
    endDate: 'May 2025',
    bullets: [
      'Jumped into a live MERN app and started shipping features to real users, no training wheels.',
      'Hunted down frontend and backend bugs and squashed them before they could cause real damage.',
      'Tuned REST APIs and frontend rendering for snappier load times across the board.',
      'Got hands-on with DOM manipulation, form handling, and state management to nail the user-facing details.',
    ],
    techTags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs'],
  },
]