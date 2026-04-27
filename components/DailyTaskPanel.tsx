'use client'
import { useState } from 'react'
import { CheckCircle2, Circle, ExternalLink, Clock } from 'lucide-react'

type Link = { label: string; url: string; type: string }
type Task = { id: string; level: string; title: string; due: string; carryover: boolean; note: string; links?: Link[] }
type ScheduleBlock = { time: string; label: string; tasks: string[]; type: string }

const LC: Record<string,string> = { P0:'#ef4444', P1:'#f97316', P2:'#eab308', P3:'#6366f1' }
const LI: Record<string,string> = { jira:'🎯', doc:'📄', sheet:'📊', tracker:'🔗' }

const SCHED_CFG: Record<string,{bg:string;border:string;dot:string}> = {
  meeting: { bg:'rgba(99,102,241,0.07)',  border:'rgba(99,102,241,0.18)', dot:'#6366f1' },
  work:    { bg:'rgba(249,115,22,0.07)',  border:'rgba(249,115,22,0.18)', dot:'#f97316' },
  deep:    { bg:'rgba(139,92,246,0.07)',  border:'rgba(139,92,246,0.18)', dot:'#8b5cf6' },
  travel:  { bg:'rgba(14,165,233,0.07)',  border:'rgba(14,165,233,0.18)', dot:'#0ea5e9' },
}

export default function DailyTaskPanel({ tasks: initialTasks, taskSchedule, endOfDayTarget }: {
  tasks: Task[]
  taskSchedule: ScheduleBlock[]
  endOfDayTarget: string[]
}) {
  const [done, setDone] = useState<Set<string>>(new Set())
  const toggle = (id: string) => setDone(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <div className="space-y-5">
      {/* End of day target */}
      <div>
        <p className="section-label mb-2">Today Is a Win If You:</p>
        <div className="glass p-3 space-y-2" style={{ borderColor: 'rgba(99,102,241,0.12)', background: 'rgba(99,102,241,0.04)' }}>
          {endOfDayTarget.map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="sterling-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: '#4f46e5' }}>
                {String(i + 1).padStart(2,'0')}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top tasks */}
      <div>
        <p className="section-label mb-2">Top Tasks Today</p>
        <div className="space-y-2">
          {initialTasks.map(task => {
            const col = LC[task.level] || '#6366f1'
            const isDone = done.has(task.id)
            return (
              <div key={task.id} className="rounded-lg overflow-hidden transition-all"
                style={{ background: isDone ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isDone ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)'}`, borderLeft: `3px solid ${isDone ? '#1e293b' : col}` }}>
                <button onClick={() => toggle(task.id)} className="w-full flex items-start gap-2.5 px-3 py-2.5 text-left">
                  {isDone
                    ? <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5 text-emerald-500"/>
                    : <Circle size={14} className="flex-shrink-0 mt-0.5 text-slate-600 hover:text-slate-400 transition-colors"/>}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="sterling-mono text-xs font-bold" style={{ color: isDone ? '#334155' : col }}>{task.level}</span>
                      <span className={`text-xs font-medium leading-snug ${isDone ? 'line-through text-slate-600' : 'text-white'}`}>{task.title}</span>
                    </div>
                    {!isDone && <p className="text-xs text-slate-500 leading-relaxed">{task.note}</p>}
                  </div>
                  <span className="text-xs text-slate-600 flex-shrink-0 mt-0.5">{task.due}</span>
                </button>
                {!isDone && task.links && task.links.length > 0 && (
                  <div className="flex flex-wrap gap-1 px-3 pb-2.5">
                    {task.links.map((l, li) => (
                      <a key={li} href={l.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs transition-all"
                        style={{ background:'rgba(99,102,241,0.07)', border:'1px solid rgba(99,102,241,0.15)', color:'#6366f1' }}>
                        <span style={{ fontSize:'10px' }}>{LI[l.type]||'🔗'}</span>
                        <span className="opacity-80">{l.label}</span>
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

      {/* Task schedule */}
      {taskSchedule.length > 0 && (
        <div>
          <p className="section-label mb-2 flex items-center gap-1"><Clock size={8}/> Task Schedule</p>
          <div className="space-y-1.5">
            {taskSchedule.map((block, i) => {
              const cfg = SCHED_CFG[block.type] || SCHED_CFG.work
              return (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 leading-snug">{block.label}</p>
                    <p className="sterling-mono text-xs text-slate-600">{block.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
