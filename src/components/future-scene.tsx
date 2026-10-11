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
    if (!paused) { elapsed.current += dt; knot.current.rotation.z += dt * .13 }
    group.current.position.lerp(new Vector3(size.width < 640 ? 0 : 2.7, size.width < 640 ? -1.65 : .05, 0), 1 - Math.exp(-4 * dt))
    group.current.rotation.x += (pointer.y * .15 - group.current.rotation.x) * (1 - Math.exp(-3 * dt))
    group.current.rotation.y += (pointer.x * .2 - group.current.rotation.y) * (1 - Math.exp(-3 * dt))
    group.current.scale.setScalar(size.width < 640 ? .64 : .98)
  })
  return <group ref={group} position={[2.7,.05,0]} rotation={[.08,-.12,.05]}>
    <group ref={knot}>
      {[1.15,1.58,1.92,2.13].map((r,i)=><mesh key={r} position={[0,0,-i*.1]}><torusGeometry args={[r,i===2?.13:.035,12,120]}/><meshStandardMaterial color={i===2?palette.metal:palette.cyan} metalness={.85} roughness={.24} emissive={i===2?palette.metal:palette.cyan} emissiveIntensity={i===2?.04:1.5}/></mesh>)}
      {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <group key={i} position={[Math.sin(a)*1.36,Math.cos(a)*1.36,.08]} rotation={[0,0,-a]}><mesh><boxGeometry args={[.3,.46,.2]}/><meshPhysicalMaterial color={palette.metal} metalness={.95} roughness={.26}/></mesh><mesh position={[0,0,.115]}><boxGeometry args={[.09,.33,.025]}/><meshStandardMaterial color={palette.cyan} emissive={palette.cyan} emissiveIntensity={2}/></mesh></group>})}
      {Array.from({length:48},(_,i)=>{const a=i*Math.PI/24;return <mesh key={i} position={[Math.sin(a)*2.25,Math.cos(a)*2.25,0]} rotation={[0,0,-a]}><boxGeometry args={[.025,i%4===0?.14:.065,.025]}/><meshBasicMaterial color={palette.lime}/></mesh>})}
    </group>
    <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.96,.96,.18,64]}/><meshStandardMaterial color={palette.cyan} emissive={palette.cyan} emissiveIntensity={1.5} metalness={.3} roughness={.25}/></mesh>
    <mesh position={[0,0,.15]} rotation={[0,0,Math.PI/2]}><ringGeometry args={[.52,.62,3]}/><meshBasicMaterial color={palette.metal}/></mesh>
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
  return <><div className="future-canvas" aria-label="Animated 3D arc reactor"><Canvas dpr={[1,1.5]} camera={{position:[0,0,8.5], fov:42}} gl={{alpha:true,antialias:true}}><ambientLight intensity={.65}/><directionalLight position={[3,5,5]} intensity={3}/><directionalLight position={[-4,0,2]} color={palette.cyan} intensity={2}/><Environment resolution={128}><Lightformer position={[0,5,3]} intensity={4} scale={[10,5,1]}/><Lightformer position={[-5,0,2]} rotation={[0,Math.PI/2,0]} color={palette.cyan} intensity={3} scale={[5,8,1]}/><Lightformer position={[4,1,3]} color={palette.lime} intensity={2} scale={[3,7,1]}/></Environment><Sculpture palette={palette} paused={paused}/></Canvas></div><Button className="scene-pause" variant="outline" size="icon" aria-label={paused ? 'Play 3D animation' : 'Pause 3D animation'} title={paused ? 'Play 3D animation' : 'Pause 3D animation'} onClick={() => setPaused(!paused)}>{paused ? <Play/> : <Pause/>}</Button></>
}
