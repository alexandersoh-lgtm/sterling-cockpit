'use client'
import { useState } from 'react'
import { CheckCircle2, Circle, CornerDownLeft } from 'lucide-react'

type Task = { id: string; level: string; title: string; due: string; carryover: boolean; done: boolean }

const LEVEL_COLORS: Record<string, string> = {
  P0: '#ef4444', P1: '#f97316', P2: '#eab308', P3: '#6366f1'
}

const FILTERS = ['All', 'P0', 'P1', 'P2', 'P3']

export default function TaskList({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('All')

  const toggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const filtered = filter === 'All' ? tasks : tasks.filter(t => t.level === filter)
  const done = tasks.filter(t => t.done).length

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="section-label">Task List This Week</p>
        <span className="text-xs text-slate-600">{done}/{tasks.length} done</span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(done / tasks.length) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {FILTERS.map(f => (
          <button key={f}
            onClick={() => setFilter(f)}
            className="px-2.5 py-1 rounded-md text-xs font-medium transition-all-200 sterling-mono"
            style={filter === f
              ? { background: f === 'All' ? 'rgba(99,102,241,0.2)' : `${LEVEL_COLORS[f]}22`,
                  color: f === 'All' ? '#a5b4fc' : LEVEL_COLORS[f],
                  border: `1px solid ${f === 'All' ? 'rgba(99,102,241,0.3)' : LEVEL_COLORS[f] + '40'}` }
              : { background: 'rgba(255,255,255,0.03)', color: '#475569', border: '1px solid rgba(255,255,255,0.06)' }
            }>
            {f}
          </button>
        ))}
      </div>

      {/* Task items */}
      <div className="space-y-1.5">
        {filtered.map(task => {
          const color = LEVEL_COLORS[task.level] || '#6366f1'
          return (
            <button key={task.id}
              onClick={() => toggle(task.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all-200 group"
              style={{ background: task.done ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${task.done ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)'}` }}>

              {/* Checkbox */}
              {task.done
                ? <CheckCircle2 size={15} className="flex-shrink-0 text-emerald-500" />
                : <Circle size={15} className="flex-shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" />
              }

              {/* Priority badge */}
              <span className="sterling-mono text-xs font-bold flex-shrink-0 w-6" style={{ color: task.done ? '#475569' : color }}>
                {task.level}
              </span>

              {/* Title */}
              <span className={`text-xs flex-1 leading-snug transition-all ${task.done ? 'line-through text-slate-600' : 'text-slate-300'}`}>
                {task.title}
              </span>

              {/* Right side */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {task.carryover && !task.done && (
                  <span className="flex items-center gap-0.5 text-xs text-orange-500/70">
                    <CornerDownLeft size={10} /> carried
                  </span>
                )}
                <span className="text-xs text-slate-600">{task.due}</span>
              </div>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-xs text-slate-600 text-center py-6">No tasks for this filter.</p>
      )}
    </div>
  )
}
