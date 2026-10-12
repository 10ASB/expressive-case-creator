import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

export function LiveViewers() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => {
    let key: string = crypto.randomUUID()
    try {
      const stored = sessionStorage.getItem('portfolio-presence-key')
      if (stored) key = stored
      else sessionStorage.setItem('portfolio-presence-key', key)
    } catch { /* Presence still works when browser storage is disabled. */ }
    const channel = supabase.channel('portfolio-live-viewers', {
      config: { presence: { key } },
    })
    channel.on('presence', { event: 'sync' }, () => {
      setCount(Object.keys(channel.presenceState()).length)
    }).subscribe(async status => {
      if (status === 'SUBSCRIBED') await channel.track({ online: true })
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') setCount(null)
    })
    return () => { void supabase.removeChannel(channel) }
  }, [])
  return <div className="live-viewers" aria-label="Live viewers"><Users size={14}/><strong>{count ?? '—'}</strong><span>{count === null ? 'CONNECTING' : 'VIEWING NOW'}</span><i className="signal-dot"/></div>
}