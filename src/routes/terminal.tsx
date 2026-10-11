import { createFileRoute } from '@tanstack/react-router'
import { CommandTerminal } from '@/components/command-terminal'
import { pageMeta } from '@/lib/page-meta'
export const Route=createFileRoute('/terminal')({head:()=>pageMeta('Command Terminal','Explore Akshay’s skills, projects, identity, and contact information through an interactive bash-style portfolio terminal.'),component:TerminalPage})
function TerminalPage(){return <main className="page-width inner-page"><span className="eyebrow">05 / COMMAND TERMINAL</span><h1>Direct access.<br/>No GUI required<span className="text-primary">.</span></h1><CommandTerminal/></main>}