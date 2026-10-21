import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, DoubleSide, Group, LineBasicMaterial, Mesh, MeshBasicMaterial, Points, Shape } from 'three'

export type Hero = 'captain' | 'thor' | 'spider' | 'vision' | 'panther' | 'strange'
type Fx = { hero: Hero; primary: string; detail: string; id: number }
const DURATION = 2.6

/* ---------- Thor: God of Thunder lightning storm ---------- */
function bolt(from: [number, number], to: [number, number], jag: number) {
  const pts: number[] = []
  const steps = 18
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const off = i === 0 || i === steps ? 0 : (Math.random() - .5) * jag
    pts.push(from[0] + (to[0] - from[0]) * t + off, from[1] + (to[1] - from[1]) * t + off * .3, (Math.random() - .5) * .5)
  }
  // lineSegments draws pairs, so expand the polyline into connected segments (plus a forked branch).
  const seg: number[] = []
  for (let i = 0; i < pts.length - 3; i += 3) seg.push(...pts.slice(i, i + 6))
  const m = Math.floor(steps / 2) * 3
  seg.push(pts[m]!, pts[m + 1]!, pts[m + 2]!, pts[m]! + (Math.random() - .5) * 4, pts[m + 1]! - 2, 0)
  return seg
}
function Thor({ c, d, t }: { c: Color; d: Color; t: React.MutableRefObject<number> }) {
  const lines = useRef<Group>(null)
  const flash = useRef<MeshBasicMaterial>(null)
  const hammer = useRef<Group>(null)
  const geos = useMemo(() => Array.from({ length: 9 }, () => new BufferGeometry()), [])
  const last = useRef(0)
  useFrame(() => {
    const k = t.current
    if (k - last.current > .07) {
      last.current = k
      geos.forEach((g, i) => {
        const x = (i - 4) * 1.6 + (Math.random() - .5)
        const p = i % 3 === 0 ? bolt([0, 0], [x * 1.6, (Math.random() - .5) * 8], 1.4) : bolt([x + (Math.random() - .5) * 2, 6], [x * .3, -6], 1.8)
        g.setAttribute('position', new BufferAttribute(new Float32Array(p), 3))
      })
    }
    const strike = k < 2.1 ? (Math.random() > .35 ? 1 : .15) : Math.max(0, 1 - (k - 2.1) * 2)
    lines.current?.children.forEach(l => { ((l as Mesh).material as LineBasicMaterial).opacity = strike })
    if (flash.current) flash.current.opacity = (k < 1.9 && Math.random() > .82 ? .35 : 0)
    if (hammer.current) {
      const a = Math.min(1, k / .6)
      hammer.current.position.set(0, 7 - 7 * (1 - (1 - a) ** 3), 0)
      hammer.current.rotation.z = Math.sin(k * 3) * .15
      hammer.current.rotation.y = k * 2
      hammer.current.scale.setScalar(1 + Math.max(0, .9 - k) * .4)
    }
  })
  return <>
    <mesh position={[0, 0, -2]}><planeGeometry args={[60, 40]}/><meshBasicMaterial ref={flash} color={d} transparent opacity={0}/></mesh>
    <group ref={lines}>{geos.map((g, i) => <lineSegments key={i} geometry={g}><lineBasicMaterial color={i % 2 ? c : d} transparent blending={AdditiveBlending} linewidth={2}/></lineSegments>)}</group>
    <group ref={hammer}>
      <mesh><boxGeometry args={[2.2, 1.2, 1.2]}/><meshStandardMaterial color="#8a9099" metalness={.95} roughness={.25} emissive={c} emissiveIntensity={.35}/></mesh>
      <mesh position={[0, -1.4, 0]}><cylinderGeometry args={[.16, .2, 2, 16]}/><meshStandardMaterial color="#5a3b24" roughness={.7}/></mesh>
    </group>
  </>
}

/* ---------- Captain America: shield ricochet ---------- */
function starShape(r: number) {
  const s = new Shape()
  for (let i = 0; i < 10; i++) { const a = Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? r * .4 : r; i ? s.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : s.moveTo(Math.cos(a) * rr, Math.sin(a) * rr) }
  return s
}
function Captain({ t }: { t: React.MutableRefObject<number> }) {
  const g = useRef<Group>(null)
  const star = useMemo(() => starShape(.55), [])
  const path: [number, number, number][] = [[-14, 3, -4], [6, 4, -2], [9, -3, -1], [-5, -2, 2], [0, 0, 5.5]]
  useFrame(() => {
    if (!g.current) return
    const k = Math.min(1, t.current / 2.2)
    const seg = Math.min(path.length - 2, Math.floor(k * (path.length - 1)))
    const local = k * (path.length - 1) - seg
    const a = path[seg]!, b = path[seg + 1]!
    g.current.position.set(a[0] + (b[0] - a[0]) * local, a[1] + (b[1] - a[1]) * local, a[2] + (b[2] - a[2]) * local)
    g.current.rotation.z -= .45
    g.current.rotation.x = Math.sin(t.current * 4) * .4
    const out = Math.max(0, t.current - 2.2) * 3
    g.current.scale.setScalar(1 + out)
  })
  const ring = (r: number, color: string, z: number) => <mesh position={[0, z, 0]}><cylinderGeometry args={[r, r, .1, 64]}/><meshStandardMaterial color={color} metalness={.7} roughness={.3}/></mesh>
  return <group ref={g}><group rotation={[Math.PI / 2, 0, 0]}>{ring(2, '#b3202a', 0)}{ring(1.6, '#e8e8ea', .12)}{ring(1.2, '#b3202a', .24)}{ring(.8, '#1d3c8c', .36)}</group>
    <mesh position={[0, 0, .45]}><shapeGeometry args={[star]}/><meshStandardMaterial color="#f2f2f2" emissive="#ffffff" emissiveIntensity={.3} side={DoubleSide}/></mesh></group>
}

/* ---------- Spider-Man: thwip! web nets across the screen ---------- */
function Spider({ c, t }: { c: Color; t: React.MutableRefObject<number> }) {
  const geo = useMemo(() => {
    const p: number[] = []
    const spokes = 16, rings = 9
    for (let s = 0; s < spokes; s++) { const a = s / spokes * Math.PI * 2; p.push(0, 0, 0, Math.cos(a) * 14, Math.sin(a) * 14, 0) }
    for (let r = 1; r <= rings; r++) for (let s = 0; s < spokes; s++) {
      const a1 = s / spokes * Math.PI * 2, a2 = (s + 1) / spokes * Math.PI * 2, rr = r * 1.5, sag = .85
      p.push(Math.cos(a1) * rr, Math.sin(a1) * rr, 0, Math.cos((a1 + a2) / 2) * rr * sag, Math.sin((a1 + a2) / 2) * rr * sag, 0)
      p.push(Math.cos((a1 + a2) / 2) * rr * sag, Math.sin((a1 + a2) / 2) * rr * sag, 0, Math.cos(a2) * rr, Math.sin(a2) * rr, 0)
    }
    return new BufferGeometry().setAttribute('position', new BufferAttribute(new Float32Array(p), 3))
  }, [])
  const shots = useMemo(() => new BufferGeometry(), [])
  const net = useRef<Group>(null)
  const mat = useRef<LineBasicMaterial>(null)
  useFrame(() => {
    const k = t.current
    const shoot = Math.min(1, k / .45)
    shots.setAttribute('position', new BufferAttribute(new Float32Array([-12, -8, 3, -12 + 12 * shoot, -8 + 8 * shoot, 0, 12, -8, 3, 12 - 12 * shoot, -8 + 8 * shoot, 0]), 3))
    if (net.current) {
      const open = Math.max(0, Math.min(1, (k - .4) / .5))
      net.current.scale.setScalar(.05 + open * (1 - open) * .6 + open)
      net.current.rotation.z = k * .15
      // pull the web down and away at the end
      net.current.position.y = k > 1.8 ? -((k - 1.8) ** 2) * 18 : 0
    }
    if (mat.current) mat.current.opacity = k > 2.2 ? Math.max(0, 1 - (k - 2.2) * 3) : 1
  })
  return <><lineSegments geometry={shots}><lineBasicMaterial color="#ffffff" transparent/></lineSegments>
    <group ref={net}><lineSegments geometry={geo}><lineBasicMaterial ref={mat} color="#f4f4f4" transparent/></lineSegments>
      <mesh position={[0, 0, -.1]}><circleGeometry args={[.5, 32]}/><meshBasicMaterial color={c}/></mesh></group></>
}

/* ---------- Doctor Strange: sling-ring portal of sparks ---------- */
function sparks(n: number) {
  const p = new Float32Array(n * 3); const seed = new Float32Array(n)
  for (let i = 0; i < n; i++) seed[i] = Math.random()
  return { geo: new BufferGeometry().setAttribute('position', new BufferAttribute(p, 3)), seed }
}
function Strange({ c, d, t }: { c: Color; d: Color; t: React.MutableRefObject<number> }) {
  const ring = useMemo(() => sparks(2600), [])
  const pts = useRef<Points>(null)
  const runes = useRef<Group>(null)
  useFrame(() => {
    const k = t.current
    const open = Math.min(1, k / .9) * (k > 2.1 ? Math.max(0, 1 - (k - 2.1) * 2) : 1)
    const R = 4.2 * (1 - (1 - open) ** 3)
    const pos = ring.geo.getAttribute('position'); const arr = pos.array as Float32Array
    for (let i = 0; i < ring.seed.length; i++) {
      const s = ring.seed[i] ?? 0
      const a = s * Math.PI * 2 + k * 5
      const fly = (s * 37 + k * 2) % 1
      const r = R + (i % 4 === 0 ? fly * 2.4 : (Math.random() - .5) * .25)
      arr[i * 3] = Math.cos(a) * r
      arr[i * 3 + 1] = Math.sin(a) * r - (i % 4 === 0 ? fly * fly * 2 : 0)
      arr[i * 3 + 2] = (Math.random() - .5) * .3
    }
    pos.needsUpdate = true
    if (runes.current) { runes.current.rotation.z = -k * .8; runes.current.scale.setScalar(Math.max(.01, open)) }
  })
  return <><points ref={pts} geometry={ring.geo}><pointsMaterial color={c} size={.09} transparent blending={AdditiveBlending} depthWrite={false}/></points>
    <group ref={runes}>{[3.2, 2.5].map((r, i) => <mesh key={r}><torusGeometry args={[r, .025, 8, 120]}/><meshBasicMaterial color={i ? d : c} transparent opacity={.8} blending={AdditiveBlending}/></mesh>)}
      {Array.from({ length: 2 }, (_, i) => <mesh key={i} rotation={[0, 0, i * Math.PI / 4]}><ringGeometry args={[2.2, 2.25, 4]}/><meshBasicMaterial color={c} side={DoubleSide} transparent blending={AdditiveBlending}/></mesh>)}</group></>
}

/* ---------- Vision: Mind Stone beam ---------- */
function Vision({ c, d, t }: { c: Color; d: Color; t: React.MutableRefObject<number> }) {
  const beam = useRef<Mesh>(null); const gem = useRef<Mesh>(null)
  useFrame(() => {
    const k = t.current
    if (gem.current) { gem.current.rotation.y = k * 3; gem.current.scale.setScalar(Math.min(1, k * 3) * (1 + Math.sin(k * 20) * .05)) }
    if (beam.current) { const on = k < .5 ? 0 : k < 2.2 ? Math.min(1, (k - .5) * 4) : Math.max(0, 1 - (k - 2.2) * 3); beam.current.scale.set(Math.max(.001, on * (1 + Math.random() * .3)), 1, Math.max(.001, on)) }
  })
  return <><mesh ref={gem} position={[-5, 0, 0]}><octahedronGeometry args={[1, 0]}/><meshStandardMaterial color={c} emissive={c} emissiveIntensity={2} metalness={.3} roughness={.1}/></mesh>
    <mesh ref={beam} position={[5, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.14, .14, 20, 24, 1, true]}/><meshBasicMaterial color={d} transparent opacity={.85} blending={AdditiveBlending}/></mesh></>
}

/* ---------- Black Panther: kinetic energy shockwave ---------- */
function Panther({ c, t }: { c: Color; t: React.MutableRefObject<number> }) {
  const g = useRef<Group>(null)
  useFrame(() => { g.current?.children.forEach((m, i) => { const k = Math.max(0, t.current - i * .18); m.scale.setScalar(.1 + k * 6); ((m as Mesh).material as MeshBasicMaterial).opacity = Math.max(0, 1 - k / 1.6) }) })
  return <group ref={g}>{[0, 1, 2, 3].map(i => <mesh key={i}><torusGeometry args={[1, .04, 8, 96]}/><meshBasicMaterial color={c} transparent blending={AdditiveBlending}/></mesh>)}</group>
}

function Effect({ fx, onDone }: { fx: Fx; onDone: () => void }) {
  const t = useRef(0)
  const c = useMemo(() => new Color(fx.primary), [fx.primary])
  const d = useMemo(() => new Color(fx.detail), [fx.detail])
  useFrame((_, dt) => { t.current += Math.min(dt, .05); if (t.current > DURATION) onDone() })
  return <>
    <ambientLight intensity={.6}/><directionalLight position={[4, 6, 8]} intensity={2.5}/><pointLight position={[0, 0, 6]} intensity={30} color={c}/>
    {fx.hero === 'thor' && <Thor c={c} d={d} t={t}/>}
  </>
}

/** Full-screen, click-through 3D overlay that plays a hero's signature move when their chapter scrolls into view. */
export default function CinematicFx() {
  const [fx, setFx] = useState<Fx | null>(null)
  const lastAt = useRef(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const on = (e: Event) => {
      const detail = (e as CustomEvent<Omit<Fx, 'id'>>).detail
      if (detail?.hero !== 'thor') return
      const now = performance.now()
      if (now - lastAt.current < 350) return
      lastAt.current = now
      setFx({ ...detail, id: now })
    }
    window.addEventListener('hero-fx', on)
    return () => window.removeEventListener('hero-fx', on)
  }, [])
  if (!fx) return null
  return <div className={`cinematic-fx fx-${fx.hero}`} aria-hidden="true" key={fx.id}>
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 12], fov: 55 }} gl={{ alpha: true, antialias: true }}>
      <Effect fx={fx} onDone={() => setFx(null)}/>
    </Canvas>
  </div>
}
