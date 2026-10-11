import { Shield, Zap, Network, Gem, Cpu, Orbit } from 'lucide-react'

const characters = {
  captain: { name: 'CAPTAIN AMERICA', code: 'RESOLVE', icon: Shield },
  thor: { name: 'THOR', code: 'POWER', icon: Zap },
  spider: { name: 'SPIDER-MAN', code: 'INGENUITY', icon: Network },
  vision: { name: 'VISION', code: 'INTELLIGENCE', icon: Gem },
  panther: { name: 'BLACK PANTHER', code: 'PRECISION', icon: Cpu },
  strange: { name: 'DOCTOR STRANGE', code: 'CONNECTION', icon: Orbit },
} as const

export function ChapterMark({ character }: { character: keyof typeof characters }) {
  const { name, code, icon: Icon } = characters[character]
  return <div className="chapter-mark"><span className="chapter-sigil" aria-hidden="true"><Icon strokeWidth={1.2}/></span><span><small>{name}</small><strong>{code} / ASB-10</strong></span></div>
}