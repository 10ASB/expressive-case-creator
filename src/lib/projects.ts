import delayImage from '@/assets/delay-detail.png.asset.json'
import chatImage from '@/assets/chat-detail.png.asset.json'
import systemsImage from '@/assets/systems-detail.png.asset.json'
import voiceImage from '@/assets/voice-scribe.png.asset.json'
import ittigeImage from '@/assets/ittige-concept.jpg'

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
    slug:'mysore-city-bus',name:'Mysore City Bus Information System',tagline:'Frontend prototype for a Mysuru transit explorer — route discovery, stops, timings and fares UI (demo data only).',category:'Web development',year:'2024',image:'/project-bus.svg',role:'Student project concept',duration:'Frontend prototype',problem:'Residents, students, visitors and daily commuters need a simple way to explore public transportation information in Mysuru.',research:'Per the project plan: next steps are collecting and verifying official route, stop, schedule and fare data, storing it in a structured JSON file or database, then implementing route matching on verified route/stop relationships.',solution:'A responsive frontend prototype built with HTML5, CSS3 and vanilla JavaScript — landing page, route search form with location suggestions, a demo journey response with input validation, and sections for route discovery, bus stops, timings and fares. No build tools required. The full concept also envisioned helping visitors discover places to visit in Mysuru, live bus location tracking, and bus ticket buying/booking — none of these are built in the repository.',outcome:'Frontend prototype only — it does NOT include verified bus routes, official timetables, fare data, a backend, or live tracking. The demo response is not travel guidance; data must be verified with official transport sources before being shown as real. Concept timeline: Akshay recalls developing the concept in 2024; later feature similarities in travel apps are not proof of direct influence or implementation.',githubUrl:'https://github.com/10ASB/Mysore-City-Bus-Info',
  },
  {
    slug:'speak-easy-global',name:'Speak Easy Global',tagline:'Voice-to-text conversion app supporting 60+ languages.',category:'Artificial intelligence',year:'',image:voiceImage.url,role:'',duration:'',problem:'Turning speech into text across many languages is hard to find in one simple tool.',research:'',solution:'A voice-to-text conversion app that supports 60+ languages.',outcome:'An in-progress build Akshay is currently working on.',
  },
  {
    slug:'quiz-building-application',name:'Quiz Building Application',tagline:'Interactive tests with built-in timers and automatic score tracking.',category:'Web development',year:'',image:'/project-quiz.svg',role:'',duration:'',problem:'Test-taking needs clear time limits and consistent score tracking.',research:'',solution:'A responsive web-based quiz platform featuring a built-in timer and automatic score tracking.',outcome:'An interactive and fair test-taking experience described in Akshay’s résumé.',
  },
  {
    slug:'delivery-delay-prediction',name:'Delivery Delay Prediction',tagline:'Internship mini-project: ML pipeline predicting delivery delays — prototype in progress.',category:'Machine learning',year:'2026',image:'/project-delivery.svg',role:'Internship mini-project',duration:'In progress',
    problem:'Delivery teams need to know before dispatch whether an order is likely to arrive late, so they can plan around it.',
    research:'Working from the shared internship dataset: exploratory analysis and preprocessing of numeric and categorical features (customer city, product category, weight, discount, courier partner, promised delivery days, warehouse zone, payment mode) before training candidate classifiers.',
    solution:'A Streamlit interface for entering delivery details and a FastAPI prediction API; the workflow trains and evaluates candidate classifiers, saves the chosen model as models/best_model.pkl, and serves predictions.',
    outcome:'Prototype in progress — the full files and paths are not all committed yet, and the application has NOT been run end-to-end from this repository.',
    githubUrl:'https://github.com/10ASB/mini-project-1-build-polish-present',
  },
  {
    slug:'ittige',name:'Ittige — Turning Mysuru’s plastic waste into bricks',tagline:'Proposed social enterprise concept: plastic packaging film + sand → pavers and solid blocks for non-structural uses.',category:'Social Entrepreneurship · Sustainability',year:'',image:ittigeImage,
    role:'Student team member · business concept & presentation contributor',duration:'Proposed concept — not launched',
    problem:'Low-value plastic packaging film in Mysuru is rarely recycled and ends up as waste. Ittige is a social and environmental mission: give that plastic a second life in a circular economy.',
    research:'The business plan is a set of assumptions to validate. In the base-case model, conventional clay bricks currently look cheaper, so pricing, costs and demand still need to be proven.',
    solution:'Collect low-value plastic film and combine it with sand to make pavers and solid blocks for non-structural uses, subject to lab testing and regulatory approvals. The business model pairs waste collection with block sales, starting pilot-first.',
    outcome:'A proposed concept only — not tested, certified, launched or commercially proven. Next steps: material strength, heat, fume and leaching tests, permits, and customer validation through a small pilot.',
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
