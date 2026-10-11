import { createFileRoute } from '@tanstack/react-router'
import { JarvisChat } from '@/components/jarvis-chat'
import { ChapterMark } from '@/components/chapter-mark'
import { pageMeta } from '@/lib/page-meta'
export const Route=createFileRoute('/assistant')({head:()=>pageMeta('J.A.R.V.I.S. // Ask Akshay','Ask the AI portfolio assistant about Akshay’s skills, education, internship, and projects in one session-only conversation.'),component:AssistantPage})
function AssistantPage(){return <main className="page-width inner-page assistant-page chapter-vision"><ChapterMark character="vision"/><span className="eyebrow">04 / J.A.R.V.I.S. ASSISTANT</span><h1>Intelligence,<br/>at your service<span className="text-primary">.</span></h1><JarvisChat/></main>}