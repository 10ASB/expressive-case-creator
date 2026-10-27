import { describe, expect, it } from 'vitest'
import { portfolioProjects } from '@/lib/projects'
import { identity, contactMailto } from '@/lib/identity'
import { dossier } from '@/lib/dossier'

describe('Real portfolio content', () => {
  it('includes supplied favourites without inventing today’s lunch or romantic status', () => {
    expect(dossier.personal.favouriteFoods).toEqual(['Pizza', 'Paneer biryani', 'Ice cream'])
    expect(dossier.personal.favouriteSubject).toBe('Maths')
    expect(dossier.personal.lunchToday).toContain('Not supplied')
    expect(dossier.personal.loverBoyReply).toContain('go on a date to know him better')
  })
  it('includes Akshay’s supplied extracurricular background without invented achievements', () => {
    expect(dossier.extracurriculars.workshops).toEqual(['AWS', 'LinkedIn', 'Be10X'])
    expect(dossier.extracurriculars.club).toContain('Synapse')
    expect(dossier.extracurriculars.hackathons).toBe('Attended multiple hackathons.')
    expect(dossier.extracurriculars.sports).toEqual(['Badminton', 'Cricket', 'Basketball', 'Swimming', 'Hiking/Trekking'])
    expect(dossier.extracurriculars.movies).toContain('Marvel')
    expect(dossier.summary).toContain('tech enthusiast')
    expect(dossier.summary).toContain('loves exploring')
    expect(dossier.extracurriculars.details).toContain('not entries from the résumé PDF')
  })
  it('contains five real projects and only the supplied repository links', () => {
    expect(portfolioProjects.map(p => p.slug)).toEqual(['delay-calculator', 'ai-chat-bot', 'mysore-city-bus','speak-easy-global','quiz-building-application','systems-foundations'])
    for (const project of portfolioProjects.filter(p=>p.githubUrl)) expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/10ASB\//)
    expect(portfolioProjects[0]?.liveUrl).toBe('https://delayclac.netlify.app/')
    expect(portfolioProjects[4]?.research).toBe('')
    expect(portfolioProjects[2]?.githubUrl).toBeUndefined()
    expect(identity.email).toBe('akshaysbharadwaj1@gmail.com')
    expect(identity.instagram).toBe('https://www.instagram.com/iixakshay/')
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
import { dossier as d2 } from '@/lib/dossier'
import { test as t2, expect as e2 } from 'vitest'
t2('first internship completed and available for next', () => {
  e2(d2.experience.status).toBe('Completed')
  e2(d2.availability).toMatch(/available for his next internship/)
  e2(d2.extracurriculars.creative).toContain('Singing')
})
t2('BE10X certificate uses supplied details without a credential ID', () => {
  const a = d2.achievements[0]!
  e2(a.title).toBe('AI Tools & Claude Workshop')
  e2(a.issuer).toBe('BE10X')
  e2(a.issued).toBe('October 25, 2026')
  e2(a.skills).toHaveLength(3)
  e2(JSON.stringify(a)).not.toMatch(/credential|verify/i)
})
