import { createFileRoute } from '@tanstack/react-router'
import { WorkPage } from '@/components/portfolio'
import { pageMeta } from '@/lib/page-meta'
export const Route=createFileRoute('/work/')({head:()=>pageMeta('Field Deployments','Explore five projects: network delay visualization, Python AI chatbot, Mysuru transit information, timed quizzes, and C/C++ foundations.'),component:()=> <WorkPage galleryOnly/>})