import delayImage from '@/assets/delay-detail.png.asset.json'
import chatImage from '@/assets/chat-detail.png.asset.json'
import systemsImage from '@/assets/systems-detail.png.asset.json'
import voiceImage from '@/assets/voice-scribe.png.asset.json'

export type Project = { slug: string; name: string; tagline: string; category: string; year: string; image: string; role: string; duration: string; problem: string; research: string; solution: string; outcome: string; githubUrl?: string; liveUrl?: string }
export const portfolioProjects: Project[] = [
  {
    slug: 'delay-calculator', name: 'Network Delay Calculator',
    tagline: 'Interactive end-to-end network delay calculator and visualizer.',
    category: 'Web development', year: '2025', image: delayImage.url,
    role: '', duration: '', liveUrl: 'https://delayclac.netlify.app/', githubUrl: 'https://github.com/10ASB/delay-calculator',
    problem: 'Visualizing complex network latencies (transmission, propagation, and processing delays) is often abstract and hard for students and engineers to intuitively understand.',
    research: 'Analyzed existing network simulation tools and identified the friction: clunky interfaces with too many inputs and no live visual feedback loop.',
    solution: 'Designed an interactive, responsive calculator that provides real-time computation and dynamic visual representations of packet flows across simulated topologies.',
    outcome: 'A deployed, interactive tool hosted live on Netlify with positive user feedback on clarity and interface ease of use.',
  },
  {
    slug: 'ai-chat-bot', name: 'Python AI Chatbot',
    tagline: 'Intelligent conversational assistant with a Python Tkinter desktop interface.',
    category: 'Artificial intelligence', year: '2025', image: chatImage.url,
    role: '', duration: '', githubUrl: 'https://github.com/10ASB/AI-CHAT-BOT',
    problem: 'Many chatbot interfaces feel rigid, overwhelming, and unhelpful when answering basic queries.',
    research: 'Reviewed user chat logs and interaction patterns to determine how to format prompts, handle errors gracefully, and maintain conversational clarity.',
    solution: 'Crafted a lightweight, accessible conversational UI with friendly response phrasing, clear guidance, and low cognitive friction.',
    outcome: 'A functional Python-based AI chatbot repository showcasing end-to-end interaction design and conversational architecture.',
  },
  {
    slug:'mysore-city-bus',name:'Mysore City Bus Information System',tagline:'Find Mysuru bus routes, timings, and fares by source and destination.',category:'Web development',year:'',image:'/project-bus.svg',role:'',duration:'',problem:'Finding the right city bus involves comparing routes, timings, and fare information.',research:'',solution:'A web-based transit finder for Mysuru with source and destination selection, route information, timings, and fare details.',outcome:'A practical transit information project described in Akshay’s résumé.',
  },
  {
    slug:'speak-easy-global',name:'Speak Easy Global',tagline:'Voice-to-text conversion app supporting 60+ languages.',category:'Artificial intelligence',year:'',image:voiceImage.url,role:'',duration:'',problem:'Turning speech into text across many languages is hard to find in one simple tool.',research:'',solution:'A voice-to-text conversion app that supports 60+ languages.',outcome:'An in-progress build Akshay is currently working on.',
  },
  {
    slug:'quiz-building-application',name:'Quiz Building Application',tagline:'Interactive tests with built-in timers and automatic score tracking.',category:'Web development',year:'',image:'/project-quiz.svg',role:'',duration:'',problem:'Test-taking needs clear time limits and consistent score tracking.',research:'',solution:'A responsive web-based quiz platform featuring a built-in timer and automatic score tracking.',outcome:'An interactive and fair test-taking experience described in Akshay’s résumé.',
  },
  {
    slug: 'systems-foundations', name: 'Systems & Algorithmic Foundations',
    tagline: 'Deep dive into core memory management, algorithms, and data structures in C.',
    category: 'Systems engineering', year: '2024', image: systemsImage.url,
    role: '', duration: '', githubUrl: 'https://github.com/10ASB/C-lang',
    problem: 'Understanding performance and hardware constraints is critical for building efficient, low-latency software.',
    research: '',
    solution: 'Built foundational implementations of core computer science algorithms and memory-safe procedures in C.',
    outcome: 'A strong architectural foundation reinforcing product engineering, latency awareness, and performance-first design.',
  },
]
