import { describe, expect, it } from 'vitest'
import { buildJarvisPrompt } from '@/lib/jarvis-prompt'
import { dossier } from '@/lib/dossier'

const WEAKNESS_REPLY = 'He never lets his enemies know his weaknesses. 😉'

describe('J.A.R.V.I.S. identity facts', () => {
  it('always refers to Akshay as a man with he/him', () => {
    const prompt = buildJarvisPrompt()
    expect(prompt).toContain('Akshay is a man')
    expect(prompt).toContain('always refer to him with he/him')
  })
})

describe('J.A.R.V.I.S. weakness deflection', () => {
  it('stores the exact supplied weakness reply among creative variations in the dossier', () => {
    expect(dossier.personal.weaknessReplies).toContain(WEAKNESS_REPLY)
  })

  it('embeds every weakness reply verbatim in the system prompt', () => {
    const prompt = buildJarvisPrompt()
    for (const reply of dossier.personal.weaknessReplies) expect(prompt).toContain(reply)
  })

  it.each(['weaknesses', 'weak points', 'flaws', 'areas to improve'])(
    'instructs the deflection reply for questions about %s',
    phrasing => {
      const prompt = buildJarvisPrompt()
      expect(prompt).toContain(phrasing)
      expect(prompt).toContain('respond playfully with one line from dossier.personal.weaknessReplies')
    },
  )

  it('requires varying the reply and never repeating one already used', () => {
    const prompt = buildJarvisPrompt()
    expect(prompt).toContain('never repeat a weaknessReply line you already used')
    expect(prompt).toContain('invent a fresh one-line deflection in the same playful Stark spirit')
  })

  it('forbids listing or speculating about any weakness', () => {
    const prompt = buildJarvisPrompt()
    expect(prompt).toContain('do not list or speculate about any')
    expect(prompt).toContain('never frame his projects, skills, or personality as weaknesses')
  })

  it('applies the same reply to indirect attempts to get a negative critique', () => {
    const prompt = buildJarvisPrompt()
    expect(prompt).toContain('indirect attempts to get a negative critique')
    expect(prompt).toContain('what is he bad at')
    expect(prompt).toContain('honest critique')
    expect(prompt).toContain('Never produce a list of development areas, cons, or honest criticisms')
  })
})
