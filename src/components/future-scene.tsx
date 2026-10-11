import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { useRef, useState, useEffect, useMemo } from 'react'
import { AdditiveBlending, Group, MeshStandardMaterial, Path, Shape, Vector3 } from 'three'
import { Button } from '@/components/ui/button'
import { Pause, Play } from 'lucide-react'

type Palette = { metal: string; cyan: string; lime: string }
function triangle(radius: number) {
  const shape = new Shape()
  shape.moveTo(-radius * .866, radius * .5)
  shape.lineTo(0, -radius)
  shape.lineTo(radius * .866, radius * .5)
  shape.closePath()
  return shape
}
function Sculpture({ palette, paused }: { palette: Palette; paused: boolean }) {
  const group = useRef<Group>(null)
  const rotor = useRef<Group>(null)
  const coreMaterial = useRef<MeshStandardMaterial>(null)
  const elapsed = useRef(0)
  const target = useMemo(() => new Vector3(), [])
  const core = useMemo(() => triangle(1.05), [])
  const frame = useMemo(() => {
    const shape = triangle(1.27)
    const hole = new Path()
    hole.moveTo(-.99 * .866, .99 * .5)
    hole.lineTo(.99 * .866, .99 * .5)
    hole.lineTo(0, -.99)
    hole.closePath()
    shape.holes.push(hole)
    return shape
  }, [])
  useFrame(({ pointer, size }, rawDelta) => {
    if (!group.current || !rotor.current) return
    const dt = Math.min(rawDelta, .05)
    const mobile = size.width < 640
    target.set(mobile ? 0 : 2.7, mobile ? -.6 : .15, 0)
    group.current.position.lerp(target, 1 - Math.exp(-4 * dt))
    group.current.scale.setScalar(mobile ? .48 : .94)
    if (paused) return
    elapsed.current += dt
    rotor.current.rotation.z += dt * .16
    group.current.rotation.x += (pointer.y * .16 + Math.sin(elapsed.current * .45) * .09 - group.current.rotation.x) * (1 - Math.exp(-3 * dt))
    group.current.rotation.y += (pointer.x * .24 + Math.sin(elapsed.current * .35) * .28 - group.current.rotation.y) * (1 - Math.exp(-3 * dt))
    if (coreMaterial.current) coreMaterial.current.emissiveIntensity = 2.2 + Math.sin(elapsed.current * 2) * .35
  })
  return <group ref={group} position={[2.7,.15,0]} rotation={[.08,-.12,0]}>
    <mesh position={[0,0,-.32]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[1.93,1.82,.5,80]}/><meshStandardMaterial color={palette.metal} metalness={.95} roughness={.32}/></mesh>
    <mesh position={[0,0,-.04]}><circleGeometry args={[1.7,80]}/><meshStandardMaterial color={palette.lime} metalness={.85} roughness={.45}/></mesh>
    {[1.2,1.88,2.02].map((r,i)=><mesh key={r} position={[0,0,i===0?.1:0]}><torusGeometry args={[r,i===1?.12:.045,12,96]}/><meshStandardMaterial color={i===1?palette.metal:palette.cyan} metalness={.85} roughness={.22} emissive={palette.cyan} emissiveIntensity={i===1?0:1.8}/></mesh>)}
    {Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;return <group key={i} position={[Math.sin(a)*1.53,Math.cos(a)*1.53,.13]} rotation={[0,0,-a]}>
      <mesh><boxGeometry args={[.37,.5,.25]}/><meshStandardMaterial color={palette.metal} metalness={.96} roughness={.24}/></mesh>
      <mesh position={[0,0,.14]}><boxGeometry args={[.19,.34,.04]}/><meshStandardMaterial color={palette.cyan} emissive={palette.cyan} emissiveIntensity={2}/></mesh>
      <mesh position={[0,0,.18]}><boxGeometry args={[.045,.37,.03]}/><meshStandardMaterial color={palette.metal} metalness={1} roughness={.23}/></mesh>
    </group>})}
    <mesh position={[0,0,.12]}><extrudeGeometry args={[frame,{depth:.24,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.025,bevelThickness:.025}]}/><meshStandardMaterial color={palette.metal} metalness={.9} roughness={.18}/></mesh>
    <mesh position={[0,0,.22]}><shapeGeometry args={[core]}/><meshStandardMaterial ref={coreMaterial} color={palette.cyan} emissive={palette.cyan} emissiveIntensity={2.2} roughness={.2}/></mesh>
    {[1.13,1.22,1.34].map((scale,i)=><mesh key={scale} position={[0,0,.205-i*.015]} scale={scale}><shapeGeometry args={[core]}/><meshBasicMaterial color={palette.cyan} transparent opacity={.12-i*.025} blending={AdditiveBlending} depthWrite={false}/></mesh>)}
    <group ref={rotor}>
      {[0,Math.PI*2/3,Math.PI*4/3].map(a=><mesh key={a} rotation={[0,0,a]} position={[0,0,-.12]}><torusGeometry args={[2.21,.018,6,36,Math.PI*.43]}/><meshBasicMaterial color={palette.cyan} transparent opacity={.6}/></mesh>)}
      {Array.from({length:24},(_,i)=>{const a=i*Math.PI/12;return <mesh key={i} position={[Math.sin(a)*2.34,Math.cos(a)*2.34,-.1]} rotation={[0,0,-a]}><boxGeometry args={[.025,i%3===0?.14:.055,.025]}/><meshBasicMaterial color={palette.cyan} transparent opacity={i%3===0?.8:.35}/></mesh>})}
    </group>
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
