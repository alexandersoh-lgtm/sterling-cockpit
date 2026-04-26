'use client'
import { RefreshCw } from 'lucide-react'

type Props = {
  stakes: string
  weekStart: string
  weekEnd: string
  briefNumber: number
  p0Count: number
  meetingCount: number
  followUpCount: number
  taskTotal: number
  taskDone: number
}

export default function SterlingHeader({ stakes, weekStart, weekEnd, briefNumber, p0Count, meetingCount, followUpCount, taskTotal, taskDone }: Props) {
  const fmtDate = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <header className="header-gradient relative overflow-hidden">
      {/* Glowing top-left orb inside header */}
      <div className="absolute top-0 left-0 w-96 h-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '256px 256px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Row 1: brand + meta + refresh */}
        <div className="flex items-start justify-between pt-5 pb-3">
          <div className="flex items-center gap-4">
            {/* Sterling mark */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 24px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
                <span className="sterling-mono text-white text-base font-bold">S</span>
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-xl" style={{ boxShadow: '0 0 0 1px rgba(99,102,241,0.3)' }} />
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <span className="sterling-mono text-white font-bold tracking-[0.18em] text-lg">STERLING</span>
                <span className="text-slate-600 text-xs">·</span>
                <span className="text-slate-500 text-xs tracking-wide">Chief of Staff, Zillow Group</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="sterling-mono text-xs font-semibold tracking-widest" style={{ color: '#6366f1' }}>WEEKLY BRIEF</span>
                <span className="text-slate-700 text-xs">·</span>
                <span className="text-slate-500 text-xs">{fmtDate(weekStart)} – {fmtDate(weekEnd)}, 2026</span>
                <span className="text-slate-700 text-xs">·</span>
                <span className="sterling-mono text-xs text-slate-600">#{String(briefNumber).padStart(3,'0')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-1.5">
              <div className="relative flex h-1.5 w-1.5">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </div>
              <span className="text-xs text-slate-600 hidden sm:block">Apr 26, 6:05 PM</span>
            </div>
            <button onClick={() => window.location.reload()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-300 transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <RefreshCw size={11} />
            </button>
          </div>
        </div>

        {/* Row 2: Stakes */}
        <div className="pb-4 max-w-4xl">
          <p className="section-label mb-1.5">The Week's Stakes</p>
          <p className="text-sm text-slate-300 leading-relaxed font-medium" style={{ fontStyle: 'italic' }}>
            "{stakes}"
          </p>
        </div>

        {/* Row 3: Stat pills */}
        <div className="flex items-center gap-2 pb-5 flex-wrap">
          {/* P0 count */}
          <div className="stat-pill" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.22)', color: '#fca5a5' }}>
            <div className="relative flex h-1.5 w-1.5">
              <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </div>
            {p0Count} Fire items
          </div>

          {/* Meetings */}
          <div className="stat-pill" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.22)', color: '#a5b4fc' }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {meetingCount} meetings
          </div>

          {/* Follow-ups */}
          <div className="stat-pill" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.20)', color: '#fde68a' }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {followUpCount} follow-ups
          </div>

          {/* Tasks */}
          <div className="stat-pill" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: '#64748b' }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            {taskDone}/{taskTotal} tasks
          </div>

          <div className="flex-1" />

          {/* Alexander */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center sterling-mono text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>A</div>
            <span className="text-xs text-slate-600">Alexander Sohn</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4) 30%, rgba(139,92,246,0.4) 70%, transparent)' }} />
    </header>
  )
}
