'use client'
import { useState } from 'react'
import { CheckCircle2, Circle, ExternalLink, CornerDownLeft } from 'lucide-react'

type Link = { label: string; url: string; type: string }
type Task = { id: string; level: string; title: string; due: string; carryover?: boolean; note: string; links?: Link[] }

const LC: Record<string, string> = { P0:'#ef4444', P1:'#f97316', P2:'#eab308', P3:'#6366f1' }
const LI: Record<string, string> = { jira:'🎯', doc:'📄', sheet:'📊', tracker:'🔗' }

export default function DailyTaskList({ tasks: init }: { tasks: Task[] }) {
  const [done, setDone] = useState<Set<string>>(new Set())
  const toggle = (id: string) => setDone(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })

  const remaining = init.filter(t => !done.has(t.id)).length

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="section-label">Top Tasks Today</p>
        <span className="sterling-mono text-xs text-slate-600">{remaining} remaining</span>
      </div>

      <div className="space-y-2">
        {init.map(task => {
          const col = LC[task.level] || '#6366f1'
          const isDone = done.has(task.id)

          return (
            <div key={task.id} className="rounded-xl overflow-hidden transition-all"
              style={{
                background: isDone ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.032)',
                border: `1px solid ${isDone ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.09)'}`,
                borderLeft: `3px solid ${isDone ? '#1e293b' : col}`
              }}>

              {/* Main row */}
              <button onClick={() => toggle(task.id)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left group">
                <div className="flex-shrink-0 mt-0.5">
                  {isDone
                    ? <CheckCircle2 size={15} className="text-emerald-500"/>
                    : <Circle size={15} className="text-slate-600 group-hover:text-slate-400 transition-colors"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="sterling-mono text-xs font-bold" style={{ color: isDone ? '#334155' : col }}>
                      {task.level}
                    </span>
                    {task.carryover && !isDone && (
                      <span className="flex items-center gap-0.5 text-xs" style={{ color:'#f97316', opacity:0.7 }}>
                        <CornerDownLeft size={9}/> carried
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-snug font-medium ${isDone ? 'line-through text-slate-600' : 'text-white'}`}>
                    {task.title}
                  </p>
                  {!isDone && (
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{task.note}</p>
                  )}
                </div>
                <span className="text-xs text-slate-600 flex-shrink-0 mt-0.5 text-right max-w-[80px] leading-snug">
                  {task.due}
                </span>
              </button>

              {/* Links row */}
              {!isDone && task.links && task.links.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                  {task.links.map((l, i) => (
                    <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2 py-1 rounded text-xs transition-all"
                      style={{ background:'rgba(99,102,241,0.08)', border:'1px solid rgba(99,102,241,0.18)', color:'#818cf8' }}>
                      <span style={{ fontSize:'10px' }}>{LI[l.type]||'🔗'}</span>
                      {l.label}
                      <ExternalLink size={8} className="opacity-50"/>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
