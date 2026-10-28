import { Component, useEffect, useState, type ReactNode } from 'react'

function canUseWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    if (!gl) return false
    ;(gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  override componentDidCatch(e: unknown) { console.warn('3D scene disabled:', e) }
  override render() { return this.state.failed ? null : this.props.children }
}

/** Renders 3D children only when WebGL works; otherwise renders nothing instead of crashing the page. */
export function WebGLGuard({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState(false)
  useEffect(() => { setOk(canUseWebGL()) }, [])
  return ok ? <Boundary>{children}</Boundary> : null
}
