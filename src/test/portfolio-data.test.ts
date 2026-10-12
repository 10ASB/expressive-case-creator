import { describe, expect, it } from 'vitest'
import { portfolioProjects } from '@/lib/projects'
import { identity, contactMailto } from '@/lib/identity'
import { dossier } from '@/lib/dossier'

describe('Real portfolio content', () => {
  it('includes Akshay’s supplied extracurricular background without invented achievements', () => {
    expect(dossier.extracurriculars.workshops).toEqual(['AWS', 'LinkedIn', 'Be10X'])
    expect(dossier.extracurriculars.club).toContain('Synapse')
    expect(dossier.extracurriculars.hackathons).toBe('Attended multiple hackathons.')
    expect(dossier.extracurriculars.sports).toEqual(['Badminton', 'Cricket', 'Basketball', 'Swimming'])
    expect(dossier.extracurriculars.schoolSports).toContain('recalls')
    expect(dossier.extracurriculars.details).toContain('not entries from the résumé PDF')
  })
  it('contains five real projects and only the supplied repository links', () => {
    expect(portfolioProjects.map(p => p.slug)).toEqual(['delay-calculator', 'ai-chat-bot', 'mysore-city-bus','quiz-building-application','systems-foundations'])
    for (const project of portfolioProjects.filter(p=>p.githubUrl)) expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/10ASB\//)
    expect(portfolioProjects[0]?.liveUrl).toBe('https://delayclac.netlify.app/')
    expect(portfolioProjects[4]?.research).toBe('')
    expect(portfolioProjects[2]?.githubUrl).toBeUndefined()
    expect(identity.email).toBe('akshaysbharadwaj1@gmail.com')
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