'use client'
import { useState } from 'react'
import { CheckCircle2, Circle, CornerDownLeft, ExternalLink } from 'lucide-react'

type Link = { label: string; url: string; type: string }
type Task = { id: string; level: string; title: string; due: string; carryover: boolean; done: boolean; links?: Link[] }

const LINK_ICON: Record<string,string> = { jira:'🎯', doc:'📄', sheet:'📊', tracker:'🔗' }

const LC: Record<string, string> = { P0:'#ef4444', P1:'#f97316', P2:'#eab308', P3:'#6366f1' }
const FILTERS = ['All','P0','P1','P2','P3']

export default function TaskList({ tasks: init }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(init)
  const [filter, setFilter] = useState('All')

  const toggle = (id: string) => setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const filtered = filter === 'All' ? tasks : tasks.filter(t => t.level === filter)
  const done = tasks.filter(t => t.done).length
  const pct = Math.round((done / tasks.length) * 100)

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <p className="section-label">Tasks This Week</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-20 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#6366f1,#8b5cf6)' }}/>
            </div>
            <span className="sterling-mono text-xs text-slate-600">{done}/{tasks.length}</span>
          </div>
          {/* Filter */}
          <div className="flex gap-1">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="sterling-mono px-2 py-0.5 rounded text-xs transition-all"
                style={filter === f
                  ? { background: f==='All'?'rgba(99,102,241,0.18)':`${LC[f]}18`, color: f==='All'?'#a5b4fc':LC[f], border:`1px solid ${f==='All'?'rgba(99,102,241,0.3)':LC[f]+'35'}` }
                  : { background:'rgba(255,255,255,0.03)', color:'#3f4b5e', border:'1px solid rgba(255,255,255,0.06)' }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task table */}
      <div className="glass overflow-hidden">
        {filtered.map((task, i) => {
          const col = LC[task.level] || '#6366f1'
          return (
            <div key={task.id} className={i !== 0 ? 'border-t border-white/[0.04]' : ''}>
              <button onClick={() => toggle(task.id)}
                className="row-hover w-full flex items-center gap-2.5 px-3 py-2 text-left transition-all group">
                {task.done
                  ? <CheckCircle2 size={13} className="flex-shrink-0 text-emerald-500"/>
                  : <Circle size={13} className="flex-shrink-0 text-slate-700 group-hover:text-slate-500 transition-colors"/>}
                <span className="sterling-mono text-xs font-bold flex-shrink-0 w-5" style={{ color: task.done ? '#334155' : col }}>{task.level}</span>
                <span className={`text-xs flex-1 min-w-0 truncate ${task.done ? 'line-through text-slate-600' : 'text-slate-300'}`}>{task.title}</span>
                {task.carryover && !task.done && (
                  <span className="flex items-center gap-0.5 text-xs flex-shrink-0" style={{ color: '#f97316', opacity: 0.7 }}>
                    <CornerDownLeft size={9}/>
                  </span>
                )}
                <span className="text-xs text-slate-600 flex-shrink-0 w-12 text-right">{task.due}</span>
              </button>
              {!task.done && task.links && task.links.length > 0 && (
                <div className="flex flex-wrap gap-1 px-3 pb-2">
                  {task.links.map((l, li) => (
                    <a key={li} href={l.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs transition-all"
                      style={{ background:'rgba(99,102,241,0.07)', border:'1px solid rgba(99,102,241,0.15)', color:'#6366f1' }}>
                      <span style={{ fontSize:'10px' }}>{LINK_ICON[l.type]||'🔗'}</span>
                      <span className="opacity-80">{l.label}</span>
                      <ExternalLink size={8} className="opacity-50"/>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-xs text-slate-600 text-center py-4">All clear for {filter}.</p>
        )}
      </div>
    </div>
  )
}
