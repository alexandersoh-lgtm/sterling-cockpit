'use client'
import { useState, useEffect } from 'react'
import dailyData from '@/data/daily.json'
import DaySelector from '@/components/DaySelector'
import DayTimeline from '@/components/DayTimeline'
import DailyMeetingPrep from '@/components/DailyMeetingPrep'
import DailyTaskList from '@/components/DailyTaskList'
import FollowUps from '@/components/FollowUps'

// ── helpers ───────────────────────────────────────────────────
function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

// ── stat pill ─────────────────────────────────────────────────
function Pill({ icon, value, sub, color, pulse }: {
  icon: React.ReactNode; value: string; sub: string; color: string; pulse?: boolean
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
      style={{ background:`${color}10`, border:`1px solid ${color}28` }}>
      {pulse && (
        <div className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span className="ping-slow absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background:color }}/>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background:color }}/>
        </div>
      )}
      <span style={{ color }}>{icon}</span>
      <span className="text-sm font-bold" style={{ color }}>{value}</span>
      <span className="text-xs text-slate-600">{sub}</span>
    </div>
  )
}

// ── win conditions ────────────────────────────────────────────
function WinConditions({ targets, dayName }: { targets: string[]; dayName: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(49,46,129,0.5) 0%, rgba(30,27,75,0.4) 50%, rgba(15,12,40,0.5) 100%)',
        border: '1px solid rgba(99,102,241,0.25)',
        boxShadow: '0 0 40px rgba(99,102,241,0.08)'
      }}>
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
        style={{ background:'radial-gradient(circle at top right, rgba(139,92,246,0.2) 0%, transparent 70%)' }}/>

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="section-label text-indigo-400 mb-0.5">Mission objectives</p>
            <p className="text-xs text-slate-600">{dayName} is a win if you close these.</p>
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background:'linear-gradient(135deg,#4338ca,#6d28d9)', boxShadow:'0 0 16px rgba(99,102,241,0.4)' }}>
            <span className="sterling-mono text-white font-extrabold text-xs">N</span>
          </div>
        </div>

        {/* Targets */}
        <div className="space-y-3">
          {targets.map((t, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background:`rgba(99,102,241,0.15)`,
                  border:`1px solid rgba(99,102,241,0.3)`,
                  boxShadow:`0 0 12px rgba(99,102,241,0.15)`
                }}>
                <span className="sterling-mono text-xs font-extrabold" style={{ color:'#818cf8' }}>
                  {String(i+1).padStart(2,'0')}
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-snug font-medium pt-1.5">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── task schedule sidebar ─────────────────────────────────────
function TaskSchedule({ blocks }: { blocks: { time:string; label:string; tasks:string[]; type:string }[] }) {
  const DOT: Record<string,string> = { meeting:'#6366f1', work:'#f97316', deep:'#8b5cf6', travel:'#0ea5e9' }
  return (
    <div>
      <p className="section-label mb-2">Task Schedule</p>
      <div className="space-y-1.5">
        {blocks.map((b,i) => (
          <div key={i} className="glass px-3 py-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: DOT[b.type]||'#475569' }}/>
              <div>
                <p className="text-xs text-slate-300 leading-snug">{b.label}</p>
                <p className="sterling-mono mt-0.5" style={{ fontSize:'10px', color:'#475569' }}>{b.time}</p>
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
  const [greet, setGreet] = useState('')
  useEffect(() => setGreet(greeting()), [])

  const day = days.find(d => d.id === activeId) || days[0]
  const meetingCount = day.meetings?.length || 0
  const taskCount    = day.topTasks?.length  || 0
  const followCount  = day.followUps?.length || 0
  const p0Count      = day.topTasks?.filter((t:{level:string}) => t.level==='P0').length || 0

  return (
    <div className="min-h-screen dot-grid">

      {/* ── HEADER ── */}
      <header className="relative overflow-hidden"
        style={{ background:'linear-gradient(160deg,#0d0b1f 0%,#09090f 60%,#07070f 100%)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>

        {/* Ambient top-left glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[200px] pointer-events-none"
          style={{ background:'radial-gradient(ellipse at top left, rgba(79,70,229,0.10) 0%, transparent 65%)' }}/>

        <div className="relative max-w-[1440px] mx-auto">
          {/* Brand bar */}
          <div className="flex items-center justify-between px-5 h-11"
            style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background:'linear-gradient(135deg,#4338ca,#6d28d9)', boxShadow:'0 0 10px rgba(99,102,241,0.4)' }}>
                <span className="sterling-mono text-white font-extrabold" style={{ fontSize:'10px' }}>N</span>
              </div>
              <span className="sterling-mono font-bold text-white tracking-[0.15em]" style={{ fontSize:'11px' }}>NEXUS</span>
              <span className="text-slate-700 text-xs">·</span>
              <span className="sterling-mono text-xs tracking-widest" style={{ color:'#6366f1', fontSize:'10px' }}>DAILY BRIEF</span>
            </div>
            <a href="/weekly"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-slate-500 hover:text-slate-300 transition-all"
              style={{ border:'1px solid rgba(255,255,255,0.07)' }}>
              ← Weekly
            </a>
          </div>

          {/* Day tabs */}
          <DaySelector days={days} activeId={activeId} onSelect={setActiveId} />

          {/* Day hero */}
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              {/* Left: Day name + theme */}
              <div className="min-w-0">
                {greet && (
                  <p className="text-xs text-slate-600 mb-1 sterling-mono">{greet}, Alexander.</p>
                )}
                <h1 className="font-black tracking-tight leading-none mb-1"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    background: 'linear-gradient(135deg, #ffffff 30%, #a5b4fc 70%, #818cf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                  {day.dayName.toUpperCase()}
                </h1>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-8" style={{ background:'rgba(99,102,241,0.4)' }}/>
                  <span className="sterling-mono text-xs text-slate-600">{day.date}, 2026</span>
                </div>
                <blockquote className="max-w-xl">
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    "{day.theme}"
                  </p>
                  <footer className="mt-1 text-xs text-slate-600 not-italic sterling-mono">— Nexus</footer>
                </blockquote>
              </div>

              {/* Right: stat pills */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                {p0Count > 0 && (
                  <Pill pulse color="#ef4444" icon="🔴" value={String(p0Count)} sub={p0Count===1?'fire':'fires'}/>
                )}
                <Pill color="#6366f1" icon="✓" value={String(taskCount)} sub="tasks today"/>
                {meetingCount > 0
                  ? <Pill color="#8b5cf6" icon="📅" value={String(meetingCount)} sub={meetingCount===1?'meeting':'meetings'}/>
                  : <Pill color="#22c55e" icon="✓" value="Clear" sub="calendar"/>
                }
                {followCount > 0 && (
                  <Pill color="#f59e0b" icon="💬" value={String(followCount)} sub="follow-ups"/>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.35) 30%,rgba(139,92,246,0.35) 70%,transparent)' }}/>
      </header>

      {/* ── MAIN ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

          {/* LEFT — action: what to do */}
          <div className="space-y-5 min-w-0">
            <WinConditions targets={day.endOfDayTarget} dayName={day.dayName} />
            <DailyTaskList tasks={day.topTasks} />
            {meetingCount > 0 && <DailyMeetingPrep meetings={day.meetings} />}
            {followCount  > 0 && <FollowUps followUps={day.followUps} />}
          </div>

          {/* RIGHT — structure: when to do it */}
          <div className="space-y-5">
            <DayTimeline timeline={day.timeline} energy={day.energy} />
            {day.taskSchedule?.length > 0 && <TaskSchedule blocks={day.taskSchedule} />}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-5 flex items-center justify-center gap-2"
          style={{ borderTop:'1px solid rgba(255,255,255,0.04)' }}>
          <div className="w-4 h-4 rounded flex items-center justify-center"
            style={{ background:'linear-gradient(135deg,#4338ca,#6d28d9)' }}>
            <span className="sterling-mono text-white font-bold" style={{ fontSize:'8px' }}>N</span>
          </div>
          <p className="sterling-mono text-xs text-slate-700 tracking-widest">
            You're locked in. Go lead. — Nexus
          </p>
        </div>
      </div>
    </div>
  )
}
