import { describe, expect, it } from 'vitest'
import { portfolioProjects } from '@/lib/projects'
import { identity, contactMailto } from '@/lib/identity'

describe('Real portfolio content', () => {
  it('contains the three supplied real projects with public repository links', () => {
    expect(portfolioProjects.map(p => p.slug)).toEqual(['delay-calculator', 'ai-chat-bot', 'systems-foundations'])
    for (const project of portfolioProjects) expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/10ASB\//)
    expect(portfolioProjects[0]?.liveUrl).toBe('https://delayclac.netlify.app/')
    expect(portfolioProjects[2]?.research).toBe('')
  })
  it('composes a correctly encoded email draft to Akshay', () => {
    const link = contactMailto('Jane & Co', 'jane@example.com', 'Hello & thank you!')
    expect(link.startsWith(`mailto:${identity.email}?`)).toBe(true)
    const params = new URLSearchParams(link.split('?')[1])
    expect(params.get('subject')).toBe('Portfolio inquiry from Jane & Co')
    expect(params.get('body')).toContain('Hello & thank you!')
    expect(params.get('body')).toContain('jane@example.com')
  })
})