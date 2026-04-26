'use client'
import { useState } from 'react'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Flame, Zap, ArrowUp, Minus } from 'lucide-react'

type Priority = { id: string; level: string; title: string; why: string; actions: string[]; due: string }

const CFG: Record<string, { color: string; bg: string; border: string; glow: string; icon: React.ReactNode; label: string }> = {
  P0: { color:'#ef4444', bg:'rgba(239,68,68,0.07)', border:'rgba(239,68,68,0.22)', glow:'glow-red',    icon:<Flame size={11} className="text-red-400"/>,   label:'FIRE'      },
  P1: { color:'#f97316', bg:'rgba(249,115,22,0.07)',border:'rgba(249,115,22,0.20)', glow:'glow-orange', icon:<Zap size={11} className="text-orange-400"/>,  label:'CRITICAL'  },
  P2: { color:'#eab308', bg:'rgba(234,179,8,0.06)', border:'rgba(234,179,8,0.18)', glow:'glow-yellow', icon:<ArrowUp size={11} className="text-yellow-400"/>,label:'IMPORTANT' },
  P3: { color:'#6366f1', bg:'rgba(99,102,241,0.06)',border:'rgba(99,102,241,0.18)', glow:'glow-indigo', icon:<Minus size={11} className="text-indigo-400"/>, label:'QUEUE'     },
}

function CompactCard({ p, selected, onClick }: { p: Priority; selected: boolean; onClick: () => void }) {
  const c = CFG[p.level] || CFG.P3
  return (
    <button onClick={onClick} className={`w-full text-left rounded-lg px-3 py-2.5 transition-all cursor-pointer ${c.glow}`}
      style={{ background: selected ? c.bg : 'rgba(255,255,255,0.025)', border: `1px solid ${selected ? c.border : 'rgba(255,255,255,0.07)'}`, borderLeft: `3px solid ${c.color}` }}>
      <div className="flex items-center gap-2">
        <span className="sterling-mono text-xs font-bold flex-shrink-0" style={{ color: c.color }}>{p.level}</span>
        {p.level === 'P0' && (
          <div className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="ping-slow absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: c.color }}/>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: c.color }}/>
          </div>
        )}
        <span className={`text-xs font-medium flex-1 leading-tight ${selected ? 'text-white' : 'text-slate-300'}`}>{p.title}</span>
        <span className="text-xs text-slate-600 flex-shrink-0">{p.due}</span>
        {selected ? <ChevronUp size={11} className="text-slate-500 flex-shrink-0"/> : <ChevronDown size={11} className="text-slate-600 flex-shrink-0"/>}
      </div>
    </button>
  )
}

function DetailPanel({ p }: { p: Priority }) {
  const [done, setDone] = useState<Set<number>>(new Set())
  const c = CFG[p.level] || CFG.P3

  const toggle = (i: number) => setDone(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n })

  return (
    <div className="fade-up rounded-lg p-4 mt-1"
      style={{ background: c.bg, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.color}` }}>
      <p className="text-xs text-slate-400 leading-relaxed mb-3">{p.why}</p>
      <p className="section-label mb-2">Actions</p>
      <div className="space-y-2">
        {p.actions.map((a, i) => (
          <button key={i} onClick={() => toggle(i)} className="flex items-start gap-2 w-full text-left group">
            {done.has(i)
              ? <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5 text-emerald-500"/>
              : <Circle size={13} className="flex-shrink-0 mt-0.5 text-slate-600 group-hover:text-slate-400 transition-colors"/>}
            <span className={`text-xs leading-relaxed ${done.has(i) ? 'line-through text-slate-600' : 'text-slate-300'}`}>{a}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function PriorityGrid({ priorities }: { priorities: Priority[] }) {
  const [selected, setSelected] = useState<string>('p1')

  const toggle = (id: string) => setSelected(prev => prev === id ? '' : id)

  return (
    <div>
      <p className="section-label mb-2">Top Priorities</p>
      <div className="space-y-1.5">
        {priorities.map(p => (
          <div key={p.id}>
            <CompactCard p={p} selected={selected === p.id} onClick={() => toggle(p.id)} />
            {selected === p.id && <DetailPanel p={p} />}
          </div>
        ))}
      </div>
    </div>
  )
}
