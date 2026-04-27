'use client'
import { useState } from 'react'
import dailyData from '@/data/daily.json'
import DaySelector from '@/components/DaySelector'
import DayTimeline from '@/components/DayTimeline'
import DailyMeetingPrep from '@/components/DailyMeetingPrep'
import DailyTaskList from '@/components/DailyTaskList'
import FollowUps from '@/components/FollowUps'

// ── inline stat pill ──────────────────────────────────────────
function StatPill({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
      style={{ background: `${color}0f`, border: `1px solid ${color}22` }}>
      <span style={{ color }}>{icon}</span>
      <span className="text-xs font-semibold" style={{ color }}>{value}</span>
      <span className="text-xs text-slate-600">{label}</span>
    </div>
  )
}

// ── win conditions ────────────────────────────────────────────
function WinConditions({ targets }: { targets: string[] }) {
  return (
    <div className="rounded-xl p-4"
      style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(109,40,217,0.08) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
      <p className="section-label mb-3 text-indigo-500">Today is a win if you:</p>
      <div className="space-y-2.5">
        {targets.map((t, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="sterling-mono text-sm font-extrabold flex-shrink-0 leading-snug"
              style={{ color: '#4f46e5', minWidth: '20px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-sm text-slate-200 leading-snug font-medium">{t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── task schedule sidebar ─────────────────────────────────────
function TaskSchedule({ blocks }: { blocks: { time: string; label: string; tasks: string[]; type: string }[] }) {
  const DOT: Record<string, string> = {
    meeting:'#6366f1', work:'#f97316', deep:'#8b5cf6', travel:'#0ea5e9'
  }
  return (
    <div>
      <p className="section-label mb-2">Task Schedule</p>
      <div className="space-y-1.5">
        {blocks.map((b, i) => (
          <div key={i} className="glass px-3 py-2">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: DOT[b.type] || '#475569' }}/>
              <div>
                <p className="text-xs text-slate-300 leading-snug">{b.label}</p>
                <p className="sterling-mono text-xs text-slate-600 mt-0.5">{b.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── page ──────────────────────────────────────────────────────
export default function DailyPage() {
  const days = dailyData.days
  const today = new Date().toISOString().split('T')[0]
  const [activeId, setActiveId] = useState(days.find(d => d.fullDate === today)?.id || days[0].id)
  const day = days.find(d => d.id === activeId) || days[0]

  const meetingCount = day.meetings?.length || 0
  const taskCount = day.topTasks?.length || 0
  const followUpCount = day.followUps?.length || 0
  const p0Count = day.topTasks?.filter((t: {level:string}) => t.level === 'P0').length || 0

  return (
    <div className="min-h-screen dot-grid">

      {/* ── HEADER ── */}
      <header style={{ background: 'linear-gradient(180deg,#0a0a18 0%,#07070f 100%)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1440px] mx-auto">

          {/* Brand row */}
          <div className="flex items-center justify-between px-5 h-12"
            style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background:'linear-gradient(135deg,#4338ca,#6d28d9)', boxShadow:'0 0 12px rgba(99,102,241,0.4)' }}>
                <span className="sterling-mono text-white font-extrabold text-xs">N</span>
              </div>
              <span className="sterling-mono font-bold text-white tracking-[0.15em] text-xs">NEXUS</span>
              <span className="text-slate-700 text-xs">·</span>
              <span className="sterling-mono text-xs font-semibold tracking-widest" style={{ color:'#6366f1' }}>DAILY BRIEF</span>
            </div>
            <a href="/weekly"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-slate-500 hover:text-slate-300 transition-all"
              style={{ border:'1px solid rgba(255,255,255,0.07)' }}>
              ← Weekly View
            </a>
          </div>

          {/* Day tabs */}
          <DaySelector days={days} activeId={activeId} onSelect={setActiveId} />

          {/* Day headline + theme + stats */}
          <div className="px-5 pt-3 pb-4">
            <div className="flex items-baseline gap-3 mb-1.5">
              <h1 className="text-2xl font-bold text-white tracking-tight">{day.dayName}</h1>
              <span className="text-slate-500">{day.date}, 2026</span>
            </div>
            <p className="text-sm text-slate-400 italic mb-3 max-w-2xl">"{day.theme}"</p>

            {/* Stat pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {p0Count > 0 && (
                <StatPill color="#ef4444" value={p0Count} label="fires"
                  icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>}
                />
              )}
              <StatPill color="#6366f1" value={taskCount} label="tasks"
                icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
              />
              {meetingCount > 0 && (
                <StatPill color="#8b5cf6" value={meetingCount} label={meetingCount === 1 ? 'meeting' : 'meetings'}
                  icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                />
              )}
              {followUpCount > 0 && (
                <StatPill color="#f59e0b" value={followUpCount} label="follow-ups"
                  icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                />
              )}
              {meetingCount === 0 && (
                <StatPill color="#22c55e" value="Clear" label="calendar"
                  icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>}
                />
              )}
            </div>
          </div>
        </div>
        <div className="h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.3) 30%,rgba(139,92,246,0.3) 70%,transparent)' }}/>
      </header>

      {/* ── MAIN: left = action, right = structure ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

          {/* LEFT — action column: what to do */}
          <div className="space-y-5 min-w-0">
            <WinConditions targets={day.endOfDayTarget} />
            <DailyTaskList tasks={day.topTasks} />
            {meetingCount > 0 && <DailyMeetingPrep meetings={day.meetings} />}
            {followUpCount > 0 && <FollowUps followUps={day.followUps} />}
          </div>

          {/* RIGHT — structure column: when to do it */}
          <div className="space-y-5">
            <DayTimeline timeline={day.timeline} energy={day.energy} />
            {day.taskSchedule?.length > 0 && <TaskSchedule blocks={day.taskSchedule} />}
          </div>
        </div>

        <div className="mt-10 pt-5 flex items-center justify-center gap-2"
          style={{ borderTop:'1px solid rgba(255,255,255,0.04)' }}>
          <div className="w-4 h-4 rounded flex items-center justify-center"
            style={{ background:'linear-gradient(135deg,#4338ca,#6d28d9)' }}>
            <span className="sterling-mono text-white font-bold" style={{ fontSize:'8px' }}>N</span>
          </div>
          <p className="sterling-mono text-xs text-slate-700 tracking-widest">You're ready. Go lead. — Nexus</p>
        </div>
      </div>
    </div>
  )
}
