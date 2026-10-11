import { Shield, Zap, Network, Gem, Cpu, Orbit } from 'lucide-react'

const characters = {
  captain: { name: 'CAPTAIN AMERICA', code: 'RESOLVE', mark: 'shield' },
  thor: { name: 'THOR', code: 'POWER', mark: 'bolt' },
  spider: { name: 'SPIDER-MAN', code: 'INGENUITY', mark: 'web' },
  vision: { name: 'VISION', code: 'INTELLIGENCE', mark: 'gem' },
  panther: { name: 'BLACK PANTHER', code: 'PRECISION', mark: 'cpu' },
  strange: { name: 'DOCTOR STRANGE', code: 'CONNECTION', mark: 'orbit' },
} as const

function CaptainShield() {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" className="mark-shield" aria-hidden="true">
    <circle className="shield-ring" cx="16" cy="16" r="14.5" strokeDasharray="4 3"/>
    <circle cx="16" cy="16" r="10.5" strokeWidth="1.1"/>
    <circle cx="16" cy="16" r="6.5" strokeWidth="1.1"/>
    <path className="shield-star" d="M16 11.2 L17.7 14.7 21.6 15.1 18.7 17.9 19.5 21.8 16 19.9 12.5 21.8 13.3 17.9 10.4 15.1 14.3 14.7 Z" fill="currentColor" stroke="none"/>
  </svg>
}

function SpiderWeb() {
  const spokes = Array.from({ length: 8 }, (_, k) => k * Math.PI / 4)
  const rings = [4.5, 8.2, 12]
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" className="mark-web" aria-hidden="true">
    {spokes.map(a => <line key={a} x1={16} y1={16} x2={16 + 14.5 * Math.cos(a)} y2={16 + 14.5 * Math.sin(a)}/>)}
    {rings.map(r => <polygon key={r} className="web-thread" points={spokes.map(a => `${16 + r * Math.cos(a)},${16 + r * Math.sin(a)}`).join(' ')}/>)}
  </svg>
}

const fallbackIcons = { bolt: Zap, gem: Gem, cpu: Cpu, orbit: Orbit, shield: Shield, web: Network }
const glyphs = { shield: CaptainShield, web: SpiderWeb } as const

export function ChapterMark({ character }: { character: keyof typeof characters }) {
  const { name, code, mark } = characters[character]
  const Glyph = glyphs[mark as keyof typeof glyphs]
  return <div className="chapter-mark"><span className="chapter-sigil" aria-hidden="true">{Glyph ? <Glyph/> : (() => { const Icon = fallbackIcons[mark as keyof typeof fallbackIcons] ?? Network; return <Icon strokeWidth={1.2}/> })()}</span><span><small>{name}</small><strong>{code} / ASB-10</strong></span></div>
}
