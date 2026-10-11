import { createFileRoute } from '@tanstack/react-router'
import { CaseStudy } from '@/components/portfolio'
import { portfolioProjects } from '@/lib/projects'
export const Route = createFileRoute('/work/$slug')({head: ({params}) => {const project = portfolioProjects.find(p => p.slug === params.slug); const title = `${project?.name ?? 'Project'} — Deployment dossier by Akshay S Bharadwaj`; const description = project?.tagline ?? 'Explore Akshay’s development projects.'; return {meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'article'},{name:'twitter:card',content:'summary_large_image'},...(project?.image.startsWith('https://')?[{property:'og:image',content:project.image},{name:'twitter:image',content:project.image}]:[])]}},component: ProjectPage})
function ProjectPage() { const {slug} = Route.useParams(); return <CaseStudy key={slug} slug={slug}/> }
