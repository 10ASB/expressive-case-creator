import delayImage from '@/assets/delay-detail.png.asset.json'
import chatImage from '@/assets/chat-detail.png.asset.json'
import systemsImage from '@/assets/systems-detail.png.asset.json'

export type Project = { slug: string; name: string; tagline: string; category: string; year: string; image: string; role: string; duration: string; problem: string; research: string; solution: string; outcome: string; githubUrl: string; liveUrl?: string }
export const portfolioProjects: Project[] = [
  {
    slug: 'delay-calculator', name: 'Network Delay Calculator',
    tagline: 'Interactive end-to-end network delay calculator and visualizer.',
    category: 'Product design & UI', year: '2025', image: delayImage.url,
    role: '', duration: '', liveUrl: 'https://delayclac.netlify.app/', githubUrl: 'https://github.com/10ASB/delay-calculator',
    problem: 'Visualizing complex network latencies (transmission, propagation, and processing delays) is often abstract and hard for students and engineers to intuitively understand.',
    research: 'Analyzed existing network simulation tools and identified the friction: clunky interfaces with too many inputs and no live visual feedback loop.',
    solution: 'Designed an interactive, responsive calculator that provides real-time computation and dynamic visual representations of packet flows across simulated topologies.',
    outcome: 'A deployed, interactive tool hosted live on Netlify with positive user feedback on clarity and interface ease of use.',
  },
  {
    slug: 'ai-chat-bot', name: 'AI Chatbot Assistant',
    tagline: 'Conversational interface designed for intuitive, human-centered interactions.',
    category: 'AI Product & UX', year: '2025', image: chatImage.url,
    role: '', duration: '', githubUrl: 'https://github.com/10ASB/AI-CHAT-BOT',
    problem: 'Many chatbot interfaces feel rigid, overwhelming, and unhelpful when answering basic queries.',
    research: 'Reviewed user chat logs and interaction patterns to determine how to format prompts, handle errors gracefully, and maintain conversational clarity.',
    solution: 'Crafted a lightweight, accessible conversational UI with friendly response phrasing, clear guidance, and low cognitive friction.',
    outcome: 'A functional Python-based AI chatbot repository showcasing end-to-end interaction design and conversational architecture.',
  },
  {
    slug: 'systems-foundations', name: 'Systems & Algorithmic Foundations',
    tagline: 'Deep dive into core memory management, algorithms, and data structures in C.',
    category: 'Engineering & Architecture', year: '2024', image: systemsImage.url,
    role: '', duration: '', githubUrl: 'https://github.com/10ASB/C-lang',
    problem: 'Understanding performance and hardware constraints is critical for building efficient, low-latency software.',
    research: '',
    solution: 'Built foundational implementations of core computer science algorithms and memory-safe procedures in C.',
    outcome: 'A strong architectural foundation reinforcing product engineering, latency awareness, and performance-first design.',
  },
]
