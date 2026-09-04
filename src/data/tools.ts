export type ToolCategory = 'Languages' | 'Frameworks' | 'Infra' | 'AI-ML' | 'Human'

export interface Tool {
  name: string
  category: ToolCategory
  iconUrl?: string
}

export const tools: Tool[] = [
  // Languages
  { name: 'Python', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'C/C++', category: 'Languages' },
  { name: 'PHP', category: 'Languages' },
  { name: 'I could do any language', category: 'Languages' },

  // Frameworks
  { name: 'React.js', category: 'Frameworks' },
  { name: 'Next.js', category: 'Frameworks' },
  { name: 'Node.js', category: 'Frameworks' },
  { name: 'Express.js', category: 'Frameworks' },
  { name: 'Angular.js', category: 'Frameworks' },
  { name: 'Flask', category: 'Frameworks' },
  { name: 'FastAPI', category: 'Frameworks' },
  { name: 'Django', category: 'Frameworks' },
  { name: 'Tailwind CSS', category: 'Frameworks' },
  { name: 'Bootstrap', category: 'Frameworks' },
  { name: 'Recoil', category: 'Frameworks' },
  { name: 'NextAuth', category: 'Frameworks' },

  // Infra / Tools & Databases
  { name: 'Git', category: 'Infra' },
  { name: 'Docker', category: 'Infra' },
  { name: 'AWS', category: 'Infra' },
  { name: 'IAM', category: 'Infra' },
  { name: 'ECS', category: 'Infra' },
  { name: 'API Gateway', category: 'Infra' },
  { name: 'Postman', category: 'Infra' },
  { name: 'VS Code', category: 'Infra' },
  { name: 'Sentry', category: 'Infra' },
  { name: 'Firebase', category: 'Infra' },
  { name: 'Figma', category: 'Infra' },
  { name: 'Burp Suite', category: 'Infra' },
  { name: 'CI/CD', category: 'Infra' },
  { name: 'PostgreSQL', category: 'Infra' },
  { name: 'MySQL', category: 'Infra' },
  { name: 'MongoDB', category: 'Infra' },
  { name: 'Redis', category: 'Infra' },
  { name: 'DynamoDB', category: 'Infra' },
  { name: 'CosmosDB', category: 'Infra' },
  { name: 'Sanity', category: 'Infra' },
  { name: 'PrismaORM', category: 'Infra' },
  { name: 'Pytest', category: 'Infra' },
  { name: 'Jest', category: 'Infra' },
  { name: 'JWT', category: 'Infra' },
  { name: 'OAuth 2.0', category: 'Infra' },
  { name: 'Zod', category: 'Infra' },
  { name: 'GraphQL', category: 'Infra' },
  { name: 'REST APIs', category: 'Infra' },
  { name: 'Webhooks', category: 'Infra' },
  { name: 'Microservices', category: 'Infra' },
  { name: 'Socket.io', category: 'Infra' },

  // AI / ML
  { name: 'LLMs', category: 'AI-ML' },
  { name: 'RAG', category: 'AI-ML' },
  { name: 'Knowledge Graphs', category: 'AI-ML' },
  { name: 'NLP', category: 'AI-ML' },
  { name: 'Embeddings', category: 'AI-ML' },
  { name: 'Semantic Search', category: 'AI-ML' },
  { name: 'Prompt Engineering', category: 'AI-ML' },
  { name: 'Deep Learning', category: 'AI-ML' },
  { name: 'Agentic AI', category: 'AI-ML' },
  { name: 'Multi-Agent Systems', category: 'AI-ML' },
  { name: 'MCP', category: 'AI-ML' },
  { name: 'OpenAI APIs', category: 'AI-ML' },
  { name: 'LangChain', category: 'AI-ML' },
  { name: 'Hugging Face', category: 'AI-ML' },
  { name: 'TensorFlow', category: 'AI-ML' },
  { name: 'Claude Code', category: 'AI-ML' },
  { name: 'Vector Databases', category: 'AI-ML' },
  { name: 'Weaviate', category: 'AI-ML' },
  { name: 'Qdrant', category: 'AI-ML' },
  { name: 'Neo4j', category: 'AI-ML' },
  { name: 'Pinecone', category: 'AI-ML' },

  // Human — the traits behind the stack
  { name: 'Vigilante', category: 'Human' },
  { name: 'Kind', category: 'Human' },
  { name: 'Relentless', category: 'Human' },
  { name: 'Adaptable', category: 'Human' },
  { name: 'Sharp-Eyed', category: 'Human' },
  { name: 'Fast Learner', category: 'Human' },
  { name: 'Men are Brave', category: 'Human' },
]