import { createFileRoute } from '@tanstack/react-router'
import { CaseStudy } from '@/components/portfolio'
import { sampleProjects } from '@/lib/projects'
export const Route = createFileRoute('/work/$slug')({head: ({params}) => {const project = sampleProjects.find(p => p.slug === params.slug); const title = `${project?.name ?? 'Project'} — Case study by Akshay S.`; const description = project?.tagline ?? 'Explore Akshay’s product design process.'; return {meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'article'},{name:'twitter:card',content:'summary_large_image'}]}},component: ProjectPage})
function ProjectPage() { const {slug} = Route.useParams(); return <CaseStudy key={slug} slug={slug}/> }
