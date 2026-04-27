'use client'
import { useState, useEffect } from 'react'
import dailyData from '@/data/daily.json'
import DaySelector from '@/components/DaySelector'
import DayTimeline from '@/components/DayTimeline'
import DailyMeetingPrep from '@/components/DailyMeetingPrep'
import DailyTaskPanel from '@/components/DailyTaskPanel'
import FollowUps from '@/components/FollowUps'
import DraftModal from '@/components/DraftModal'

export default function DailyPage() {
  const days = dailyData.days
  const today = new Date().toISOString().split('T')[0]

  const todayDay = days.find(d => d.fullDate === today)
  const [activeId, setActiveId] = useState(todayDay?.id || days[0].id)

  const day = days.find(d => d.id === activeId) || days[0]

  return (
    <div className="min-h-screen dot-grid">
      {/* Compact daily header */}
      <header style={{ background: 'linear-gradient(180deg, #0a0a18 0%, #07070f 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1600px] mx-auto px-5">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background:'linear-gradient(135deg,#4338ca,#6d28d9)', boxShadow:'0 0 16px rgba(99,102,241,0.35)' }}>
                <span className="sterling-mono text-white font-extrabold text-sm">N</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="sterling-mono font-bold text-white tracking-[0.15em] text-sm">NEXUS</span>
                <span className="text-slate-700 text-xs">·</span>
                <span className="sterling-mono text-xs font-semibold tracking-widest" style={{ color:'#6366f1' }}>DAILY BRIEF</span>
              </div>
            </div>
            {/* Right: week link */}
            <a href="/weekly" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-300 transition-all"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Weekly View
            </a>
          </div>
        </div>

        {/* Day selector */}
        <DaySelector days={days} activeId={activeId} onSelect={setActiveId}/>

        {/* Day theme strip */}
        <div className="max-w-[1600px] mx-auto px-5 py-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <span className="text-lg font-bold text-white">{day.dayName}</span>
              <span className="text-slate-500 text-sm ml-2">{day.date}</span>
            </div>
            <div className="h-4 w-px mt-1 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}/>
            <p className="text-sm text-slate-400 leading-relaxed italic">"{day.theme}"</p>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="h-px" style={{ background:'linear-gradient(90deg, transparent, rgba(99,102,241,0.3) 30%, rgba(139,92,246,0.3) 70%, transparent)' }}/>
      </header>

      {/* Main 3-column grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-4">

          {/* COL 1: Timeline + Energy */}
          <div>
            <DayTimeline timeline={day.timeline} energy={day.energy}/>
          </div>

          {/* COL 2: Meeting prep + Follow-ups */}
          <div className="space-y-4 min-w-0">
            <DailyMeetingPrep meetings={day.meetings}/>
            {day.followUps && day.followUps.length > 0 && (
              <FollowUps followUps={day.followUps}/>
            )}
          </div>

          {/* COL 3: Tasks + Schedule + End of day */}
          <div>
            <DailyTaskPanel
              tasks={day.topTasks}
              taskSchedule={day.taskSchedule}
              endOfDayTarget={day.endOfDayTarget}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 flex items-center justify-center gap-2"
          style={{ borderTop:'1px solid rgba(255,255,255,0.04)' }}>
          <div className="w-4 h-4 rounded flex items-center justify-center"
            style={{ background:'linear-gradient(135deg,#4338ca,#6d28d9)' }}>
            <span className="sterling-mono text-white font-bold" style={{ fontSize:'8px' }}>N</span>
          </div>
          <p className="sterling-mono text-xs text-slate-700 tracking-widest">
            You're ready. Go lead. — Nexus
          </p>
        </div>
      </div>
    </div>
  )
}
