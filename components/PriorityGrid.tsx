'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Flame, Zap, ArrowUp, Minus } from 'lucide-react'

type Priority = {
  id: string; level: string; title: string; why: string;
  actions: string[]; due: string;
}

const LEVEL_CONFIG: Record<string, { color: string; bg: string; border: string; glow: string; icon: React.ReactNode; label: string }> = {
  P0: {
    color: '#ef4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.25)',
    glow: 'glow-red', icon: <Flame size={13} className="text-red-400" />, label: 'FIRE'
  },
  P1: {
    color: '#f97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.22)',
    glow: 'glow-orange', icon: <Zap size={13} className="text-orange-400" />, label: 'CRITICAL'
  },
  P2: {
    color: '#eab308', bg: 'rgba(234,179,8,0.05)', border: 'rgba(234,179,8,0.20)',
    glow: 'glow-yellow', icon: <ArrowUp size={13} className="text-yellow-400" />, label: 'IMPORTANT'
  },
  P3: {
    color: '#6366f1', bg: 'rgba(99,102,241,0.05)', border: 'rgba(99,102,241,0.20)',
    glow: 'glow-indigo', icon: <Minus size={13} className="text-indigo-400" />, label: 'QUEUE'
  },
}

function PriorityCard({ priority }: { priority: Priority }) {
  const [expanded, setExpanded] = useState(priority.level === 'P0')
  const [doneActions, setDoneActions] = useState<Set<number>>(new Set())
  const cfg = LEVEL_CONFIG[priority.level] || LEVEL_CONFIG['P3']

  const toggleAction = (i: number) => {
    setDoneActions(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div className={`glass ${cfg.glow} transition-all-200 cursor-pointer`}
      style={{ borderLeft: `3px solid ${cfg.color}`, background: cfg.bg, borderTop: `1px solid ${cfg.border}`, borderRight: `1px solid ${cfg.border}`, borderBottom: `1px solid ${cfg.border}` }}
      onClick={() => setExpanded(!expanded)}>

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Badge */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded flex-shrink-0"
              style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.color}30` }}>
              {cfg.icon}
              <span className="sterling-mono text-xs font-bold" style={{ color: cfg.color }}>
                {priority.level}
              </span>
            </div>
            {/* P0 pulse indicator */}
            {priority.level === 'P0' && (
              <div className="relative flex-shrink-0">
                <span className="ping-slow absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </div>
            )}
          </div>
          {/* Due date */}
          <span className="text-xs text-slate-500 flex-shrink-0 mt-0.5">Due {priority.due}</span>
        </div>

        <h3 className="text-sm font-semibold text-white mb-1 leading-snug">{priority.title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{priority.why}</p>

        {/* Expand toggle */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-slate-600">{priority.actions.length} action{priority.actions.length !== 1 ? 's' : ''}</span>
          <div className="text-slate-600 hover:text-slate-400 transition-colors">
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </div>
      </div>

      {/* Expanded section */}
      {expanded && (
        <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: `${cfg.color}18` }}
          onClick={e => e.stopPropagation()}>
          <p className="section-label mb-2.5">Actions</p>
          <div className="space-y-2">
            {priority.actions.map((action, i) => (
              <button key={i}
                className="flex items-start gap-2.5 w-full text-left group"
                onClick={() => toggleAction(i)}>
                {doneActions.has(i)
                  ? <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                  : <Circle size={15} className="mt-0.5 flex-shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" />
                }
                <span className={`text-xs leading-relaxed transition-all ${doneActions.has(i) ? 'line-through text-slate-600' : 'text-slate-300'}`}>
                  {action}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function PriorityGrid({ priorities }: { priorities: Priority[] }) {
  return (
    <div>
      <p className="section-label mb-3">Top Priorities This Week</p>
      <div className="grid grid-cols-1 gap-3">
        {priorities.map(p => <PriorityCard key={p.id} priority={p} />)}
      </div>
    </div>
  )
}
