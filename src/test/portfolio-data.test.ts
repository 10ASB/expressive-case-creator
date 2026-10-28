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
    expect(dossier.personal.weaknessReplies[0]).toContain('never lets his enemies know his weaknesses')
    expect(dossier.personal.weaknessReplies.length).toBeGreaterThan(3)
  })
  it('includes Akshay’s supplied extracurricular background without invented achievements', () => {
    expect(dossier.extracurriculars.workshops).toEqual(['AWS', 'LinkedIn', 'Be10X'])
    expect(dossier.extracurriculars.club).toContain('Synapse')
    expect(dossier.extracurriculars.hackathons).toBe('Attended multiple hackathons.')
    expect(dossier.extracurriculars.sports).toEqual(['Badminton', 'Cricket', 'Basketball', 'Swimming', 'Hiking/Trekking'])
    expect(dossier.extracurriculars.pursuits).toEqual(['Fitness', 'Composing music', 'Gaming (COD, Garena, and many more)', 'Artist — multiple creative artworks made at home'])
    expect(dossier.extracurriculars.movies).toContain('Marvel')
    expect(dossier.summary).toContain('tech enthusiast')
    expect(dossier.summary).toContain('loves exploring')
    expect(dossier.extracurriculars.details).toContain('not entries from the résumé PDF')
  })
  it('contains five real projects and only the supplied repository links', () => {
    expect(portfolioProjects.map(p => p.slug)).toEqual(['delay-calculator', 'ai-chat-bot', 'mysore-city-bus','speak-easy-global','quiz-building-application','delivery-delay-prediction','ittige','systems-foundations'])
    for (const project of portfolioProjects.filter(p=>p.githubUrl)) expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/10ASB\//)
    expect(portfolioProjects[0]?.liveUrl).toBe('https://delayclac.netlify.app/')
    expect(portfolioProjects[4]?.research).toBe('')
    expect(portfolioProjects[2]?.githubUrl).toBe('https://github.com/10ASB/Mysore-City-Bus-Info')
    expect(identity.email).toBe('akshaysbharadwaj1@gmail.com')
    expect(identity.instagram).toBe('https://www.instagram.com/iixakshay/')
  })
  it('labels the delivery-delay mini-project as a prototype without overclaiming', () => {
    const p = portfolioProjects.find(x => x.slug === 'delivery-delay-prediction')!
    expect(p.githubUrl).toBe('https://github.com/10ASB/mini-project-1-build-polish-present')
    expect(JSON.stringify([p.tagline, p.duration, p.outcome])).toContain('In progress')
    expect(JSON.stringify([p.tagline, p.duration, p.outcome])).toContain('NOT been run end-to-end')
    expect(JSON.stringify([p.tagline, p.problem, p.research, p.solution, p.outcome])).not.toMatch(/deployed|production|accuracy|fully functional/i)
  })
  it('represents Mysore City Bus Info as a 2024 frontend prototype without claiming real transit data', () => {
    const p = portfolioProjects.find(x => x.slug === 'mysore-city-bus')!
    expect(p.githubUrl).toBe('https://github.com/10ASB/Mysore-City-Bus-Info')
    expect(p.year).toBe('2024')
    const all = JSON.stringify([p.tagline, p.problem, p.research, p.solution, p.outcome])
    expect(all).toContain('prototype')
    expect(all).toContain('does NOT include verified bus routes')
    expect(all).toContain('not travel guidance')
    expect(all).toMatch(/HTML5, CSS3 and vanilla JavaScript/)
    expect(all).not.toMatch(/live transit|live tracking is|verified routes|real-time|backend included/i)
    expect(all).toContain('places to visit in Mysuru')
    expect(all).toContain('live bus location tracking')
    expect(all).toContain('ticket buying/booking')
    expect(all).toContain('developing the concept in 2024')
    expect(all).toContain('not proof of direct influence or implementation')
    expect(all).not.toContain('Sales Connect on Tour Mysore')
    expect(all).not.toContain('LinkedIn-branded bag')
    expect(JSON.stringify(portfolioProjects)).not.toMatch(/rapido/i)
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
  e2(d2.experience.company).toBe('Bluemind Solution Pvt. Ltd.')
  e2(d2.experience.period).toBe('03 August 2026 — 28 August 2026')
  e2(d2.experience.description).toContain('practical industry exposure')
  e2(d2.experience.description).not.toMatch(/defect|vision|transfer learning|quality inspection|deep learning/i)
  e2(d2.availability).toMatch(/available for his next internship/)
  e2(d2.extracurriculars.creative).toContain('Singing')
})
t2('BE10X certificate uses supplied details without a credential ID', () => {
  const a = d2.achievements[0]!
  e2(a.title).toBe('AI Tools & Claude Workshop')
  e2(a.issuer).toBe('BE10X')
  e2(a.issued).toBe('25 October 2026')
  e2(a.skills).toHaveLength(3)
  e2(JSON.stringify(a)).not.toMatch(/credential|verify/i)
})
t2('IBM SkillsBuild credentials use the verified Credly links', () => {
  const ibm = d2.achievements.filter(a => a.issuer === 'IBM SkillsBuild')
  e2(ibm).toHaveLength(2)
  e2(ibm.map(a => a.title)).toEqual([
    'Artificial Intelligence Fundamentals',
    'SkillsBuild - Customer Engagement: Communication and Personality Dynamics',
  ])
  for (const a of ibm) {
    e2(a.issued).toBe('2 January 2026')
    e2(a.recipient).toBe('Akshay S Bharadwaj')
    e2(a.verifyUrl).toMatch(/^https:\/\/www\.credly\.com\/badges\//)
  }
  e2(ibm[0]!.verifyUrl).toBe('https://www.credly.com/badges/d22fdd6f-e46f-4f10-a99e-0adc5b61f5ef')
  e2(ibm[1]!.verifyUrl).toBe('https://www.credly.com/badges/7379ecf4-57c7-4e23-bab5-532addb8f353')
  e2(JSON.stringify(d2.achievements)).not.toMatch(/AWS SBG/i)
})
t2('LinkedIn event entry stays concise: participation only, no personal or company names', async () => {
  e2(d2.events).toHaveLength(1)
  const ev = d2.events[0]!
  e2(ev.title).toBe('Sales Connect on Tour — Mysore')
  e2(ev.status).toBe('Participated')
  e2(ev.association).toBe('Organized by LinkedIn')
  e2(JSON.stringify(ev)).not.toMatch(/Akshay|Bluemind|202\d|speaker|organis|MCBI|bag|photo|booklet/i)
  const { buildJarvisPrompt } = await import('@/lib/jarvis-prompt')
  const prompt = buildJarvisPrompt()
  e2(prompt).toContain("attended 'Sales Connect on Tour — Mysore'")
  e2(prompt).not.toMatch(/booklet|bag/i)
})
