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

function ChapterAction({ character }: { character: keyof typeof characters }) {
  return <svg className={`chapter-action action-${character}`} viewBox="0 0 170 60" fill="none" stroke="currentColor" aria-hidden="true">
    {character === 'spider' ? <><path className="web-shot" d="M4 43 Q55 10 150 15 M4 43 Q60 43 150 15 M4 43 Q80 58 150 15"/><path className="web-impact" d="M138 5 L158 25 M138 25 L158 5 M134 15 H162 M148 1 V29"/><path d="M1 45 L12 36 L22 39 L17 49 Z"/></> :
    character === 'captain' ? <g className="shield-throw"><circle cx="25" cy="30" r="17"/><circle cx="25" cy="30" r="12"/><path d="M25 21 L28 27 L34 28 L29 32 L30 38 L25 35 L20 38 L21 32 L16 28 L22 27 Z"/></g> :
    character === 'thor' ? <><path className="thunder-strike" d="M15 2 L42 18 L30 29 L74 37 L63 45 L153 57"/><path d="M8 9 H32 V24 H8 Z M20 24 V43"/></> :
    character === 'vision' ? <><path className="vision-beam" d="M10 30 H150 M10 30 L150 17 M10 30 L150 43"/><path d="M3 30 L10 22 L17 30 L10 38 Z"/></> :
    character === 'panther' ? <g className="panther-slash"><path d="M35 5 L12 55 M62 5 L39 55 M89 5 L66 55"/></g> :
    <g className="portal-spin"><circle cx="75" cy="30" r="24" strokeDasharray="6 4"/><circle cx="75" cy="30" r="18"/><path d="M75 7 L95 42 H55 Z"/></g>}
  </svg>
}

export function ChapterMark({ character }: { character: keyof typeof characters }) {
  const { name, code, mark } = characters[character]
  const Glyph = glyphs[mark as keyof typeof glyphs]
  return <div className="chapter-mark"><span className="chapter-sigil" aria-hidden="true">{Glyph ? <Glyph/> : (() => { const Icon = fallbackIcons[mark as keyof typeof fallbackIcons] ?? Network; return <Icon strokeWidth={1.2}/> })()}</span><span><small>{name}</small><strong>{code} / ASB-10</strong></span><ChapterAction character={character}/></div>
}
