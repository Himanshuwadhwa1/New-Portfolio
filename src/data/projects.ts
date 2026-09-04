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
    title: 'WeGroww',
    pitch: 'A full-stack stage for builders to show off their work, with real auth and real monitoring behind it.',
    description: 'Built with Next.js and TypeScript, complete with GitHub OAuth via NextAuth, Zod schema validation, Sanity content management, and Sentry watching production for anything that breaks.',
    techBadges: ['Next.js', 'TypeScript', 'Sanity', 'NextAuth', 'Sentry'],
    githubUrl: 'https://github.com/Himanshuwadhwa1/WeGroww',
    liveUrl: 'https://we-groww.vercel.app/',
    imageUrl: '/projects/wegroww.png',
    featured: false,
  },
  {
    id: 'project-2',
    title: 'Search Relevancy Engine',
    pitch: 'Point it at any website, give it a keyword, and it hands back the 5 most relevant results — ranked by meaning, not keyword-stuffing.',
    description: 'Scrapes a target site with BeautifulSoup, generates embeddings, and stores them in Weaviate to rank content by semantic relevance instead of brute-force matching.',
    techBadges: ['Flask', 'BeautifulSoup', 'Weaviate'],
    githubUrl: 'https://github.com/Himanshuwadhwa1/Search-Relevancy-Engine',
    // liveUrl: 'https://search-relevancy.himanshuwadhwa.com',
    // imageUrl: '/projects/search-relevancy-engine.png',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'LeafLens',
    pitch: 'Show it a leaf, it tells you the plant — led a 5-person squad to build this from the ground up.',
    description: 'A plant classification model trained to 92% accuracy on the training set, 85% on unseen test data, deployed on a website and wired into a Flask backend so users can snap a photo and get an instant ID.',
    techBadges: ['Python', 'Flask', 'Hugging Face', 'TensorFlow'],
    githubUrl: 'https://github.com/Himanshuwadhwa1/Leaf-Lens',
    // liveUrl: 'https://leaflens.himanshuwadhwa.com',
    // imageUrl: '/projects/leaflens.png',
    featured: false,
  },
  {
    id: 'project-4',
    title: 'ResearchMind',
    pitch: 'A RAG-powered research sidekick that hunts down cited answers instead of guessing.',
    description: 'Retrieves cited answers using Qdrant vector embeddings, then levels up with a Neo4j knowledge graph via entity extraction — Graph RAG that actually understands how things are connected, not just what sounds similar.',
    techBadges: ['FastAPI', 'React', 'Next.js', 'Qdrant', 'Neo4j', 'RAG'],
    githubUrl: 'https://github.com/Himanshuwadhwa1/research-mind',
    // liveUrl: 'https://researchmind.himanshuwadhwa.com',
    // imageUrl: '/projects/research-mind.png',
    featured: true,
  },
  {
    id: 'project-5',
    title: 'Blog Web Application',
    pitch: 'A full CRUD blog engine — write it, edit it, delete it, all locked down with proper auth.',
    description: 'A MERN-stack blog platform with JWT-based authentication for secure sign-up and login, plus optimized database queries and API responses that cut load times by 15%.',
    techBadges: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'],
    githubUrl: 'https://github.com/Himanshuwadhwa1/BlogApp',
    liveUrl: 'https://blog-app-steel-nine.vercel.app/',
    // imageUrl: '/projects/blog-web-app.png',
    featured: false,
  },
  {
    id: 'project-6',
    title: 'URL Shortener',
    pitch: 'Turns monster URLs into 15-character links, no sweat.',
    description: 'A TypeScript-based URL shortener managing 100+ records in MongoDB, with optimized routing and database queries that cut API response times by 10%.',
    techBadges: ['TypeScript', 'MongoDB', 'React.js', 'Node.js', 'Express.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Himanshuwadhwa1/URL-Shortner',
    liveUrl: 'https://url-shortner-pi.vercel.app/',
    // imageUrl: '/projects/url-shortener.png',
    featured: false,
  },
  {
    id: 'project-7',
    title: "Let's Chat WebApp",
    pitch: 'Real-time group chat with rooms that actually keep strangers out of your conversation.',
    description: 'A Socket.io-powered chat app supporting multiple simultaneous chat rooms, with room-specific access controls so only members of a room can send or receive messages there.',
    techBadges: ['Socket.io', 'Node.js', 'Express.js', 'Vanila CSS'],
    githubUrl: 'https://github.com/Himanshuwadhwa1/Let-s-Chat',
    liveUrl: 'https://letschat.himanshuwadhwa.com',
    imageUrl: '/projects/lets-chat.png',
    featured: false,
  },
]