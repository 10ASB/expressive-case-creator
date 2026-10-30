import { describe, it, expect } from 'vitest'
import { isBirthday, reactorTelemetry } from '@/lib/birthday'
import { buildJarvisPrompt } from '@/lib/jarvis-prompt'
describe('Mark 85 birthday protocol', () => {
  it('activates on October 9', () => {
    const d = new Date(2026, 9, 9, 12)
    expect(isBirthday(d)).toBe(true)
    expect(reactorTelemetry(d).status).toBe('PROTOCOL: ASB-10 ENGAGED')
    expect(reactorTelemetry(d).detail).toBe('OVERCHARGE: 200% (OCTOBER 09 BIRTHDAY)')
  })
  it.each([[2026,9,8],[2026,9,10],[2026,8,9],[2026,0,1]])('stays standard on %i-%i-%i', (y,m,dd) => {
    const d = new Date(y,m,dd,12)
    expect(isBirthday(d)).toBe(false)
    expect(reactorTelemetry(d).status).toBe('CORE STABLE')
  })
  it('J.A.R.V.I.S. celebrates only on October 9 (India date)', () => {
    expect(buildJarvisPrompt(new Date('2026-10-09T06:00:00Z'))).toContain("TODAY IS OCTOBER 9")
    expect(buildJarvisPrompt(new Date('2026-10-30T06:00:00Z'))).not.toContain("TODAY IS OCTOBER 9")
    expect(buildJarvisPrompt(new Date('2026-10-30T06:00:00Z'))).toContain("birthday is October 9")
  })
})
