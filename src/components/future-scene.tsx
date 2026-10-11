import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { Button } from '@/components/ui/button'
import { Pause, Play } from 'lucide-react'

type Palette = { metal: string; cyan: string; lime: string }
function Sculpture({ palette, paused }: { palette: Palette; paused: boolean }) {
  const group = useRef<Group>(null)
  const knot = useRef<Mesh>(null)
  const elapsed = useRef(0)
  useFrame(({ pointer, size }, rawDelta) => {
    if (!group.current || !knot.current) return
    const dt = Math.min(rawDelta, .05)
    if (!paused) { elapsed.current += dt; knot.current.rotation.y += dt * .18; knot.current.rotation.z += dt * .09 }
    group.current.position.lerp(new Vector3(size.width < 640 ? 0 : 2.5, size.width < 640 ? -1.2 : .1, 0), 1 - Math.exp(-4 * dt))
    group.current.rotation.x += (pointer.y * .15 - group.current.rotation.x) * (1 - Math.exp(-3 * dt))
    group.current.rotation.y += (pointer.x * .2 - group.current.rotation.y) * (1 - Math.exp(-3 * dt))
    group.current.scale.setScalar(size.width < 640 ? .85 : 1)
  })
  return <group ref={group} position={[2.5,.1,0]} rotation={[.2,0,.2]}>
    <mesh ref={knot} rotation={[.35,.2,.2]}><torusKnotGeometry args={[1.25,.34,180,24,2,3]}/><meshPhysicalMaterial color={palette.metal} metalness={.95} roughness={.17} clearcoat={1}/></mesh>
    <mesh rotation={[1.1,.3,.4]}><torusGeometry args={[2.05,.015,8,140]}/><meshStandardMaterial color={palette.cyan} emissive={palette.cyan} emissiveIntensity={1.2}/></mesh>
    <mesh rotation={[.6,1.1,-.4]}><torusGeometry args={[2.2,.012,8,140]}/><meshStandardMaterial color={palette.lime} emissive={palette.lime} emissiveIntensity={.6}/></mesh>
  </group>
}
function tokenColor(name: string) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return 'silver'
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); ctx.fillRect(0,0,1,1)
  const data = ctx.getImageData(0,0,1,1).data
  return `rgb(${data[0]},${data[1]},${data[2]})`
}
export default function FutureScene() {
  const [palette, setPalette] = useState<Palette>()
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    setPalette({metal:tokenColor('--scene-metal'),cyan:tokenColor('--primary'),lime:tokenColor('--scene-highlight')})
    const query = matchMedia('(prefers-reduced-motion: reduce)'); setPaused(query.matches)
    const change = () => setPaused(query.matches); query.addEventListener('change',change)
    return () => query.removeEventListener('change',change)
  },[])
  if (!palette) return null
  return <><div className="future-canvas" aria-label="Animated metallic knot with orbital rings"><Canvas dpr={[1,1.5]} camera={{position:[0,0,8.5], fov:42}} gl={{alpha:true,antialias:true}}><ambientLight intensity={.65}/><directionalLight position={[3,5,5]} intensity={3}/><directionalLight position={[-4,0,2]} color={palette.cyan} intensity={2}/><Environment resolution={128}><Lightformer position={[0,5,3]} intensity={4} scale={[10,5,1]}/><Lightformer position={[-5,0,2]} rotation={[0,Math.PI/2,0]} color={palette.cyan} intensity={3} scale={[5,8,1]}/><Lightformer position={[4,1,3]} color={palette.lime} intensity={2} scale={[3,7,1]}/></Environment><Sculpture palette={palette} paused={paused}/></Canvas></div><Button className="scene-pause" variant="outline" size="icon" aria-label={paused ? 'Play 3D animation' : 'Pause 3D animation'} title={paused ? 'Play 3D animation' : 'Pause 3D animation'} onClick={() => setPaused(!paused)}>{paused ? <Play/> : <Pause/>}</Button></>
}
