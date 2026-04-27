'use client'
import { RefreshCw } from 'lucide-react'

type StakesCard = { id: string; level: string; icon: string; headline: string; sub: string }

type Props = {
  weekStart: string; weekEnd: string; briefNumber: number
  p0Count: number; meetingCount: number; followUpCount: number
  taskTotal: number; taskDone: number
  stakesCards: StakesCard[]
}

const LEVEL_STYLE: Record<string, { bar: string; badge: string; text: string; icon: string }> = {
  P0: { bar: '#ef4444', badge: 'rgba(239,68,68,0.12)', text: '#fca5a5', icon: '🔴' },
  P1: { bar: '#f97316', badge: 'rgba(249,115,22,0.10)', text: '#fdba74', icon: '🟠' },
  P2: { bar: '#eab308', badge: 'rgba(234,179,8,0.08)',  text: '#fde68a', icon: '🟡' },
}

const ICONS: Record<string, React.ReactNode> = {
  fire: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  plane: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-1.5 0-2.5.5-4 2L3 13l2 2 3.5-1.5 1.5 1.5-1.5 3.5L10 21l7.8-1.8z"/>
    </svg>
  ),
  doc: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
}

export default function NexusHeader({ weekStart, weekEnd, briefNumber, p0Count, meetingCount, followUpCount, taskTotal, taskDone, stakesCards }: Props) {
  const fmt = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <header className="relative" style={{
      background: 'linear-gradient(180deg, #0a0a18 0%, #07070f 100%)',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      {/* Ambient glow — top left only, subtle */}
      <div className="absolute top-0 left-0 w-[500px] h-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(79,70,229,0.09) 0%, transparent 65%)' }}/>

      <div className="relative max-w-[1600px] mx-auto px-5">

        {/* Top row: brand ↔ meta */}
        <div className="flex items-center justify-between h-14">

          {/* Brand */}
          <div className="flex items-center gap-3">
            {/* N mark */}
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)', boxShadow: '0 0 0 1px rgba(99,102,241,0.4), 0 4px 16px rgba(79,70,229,0.35)' }}>
              <span className="sterling-mono text-white font-extrabold text-sm leading-none">N</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="sterling-mono font-bold text-white tracking-[0.15em] text-sm">NEXUS</span>
              <span className="text-slate-700 text-xs">·</span>
              <span className="text-xs text-slate-500">Weekly Nexus Brief</span>
              <span className="text-slate-700 text-xs hidden sm:block">·</span>
              <span className="sterling-mono text-xs hidden sm:block" style={{ color: '#6366f1' }}>
                {fmt(weekStart)} – {fmt(weekEnd)}
              </span>
            </div>
          </div>

          {/* Right: status + brief # + refresh */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="relative flex h-1.5 w-1.5">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"/>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"/>
              </div>
              <span className="sterling-mono text-xs text-slate-600">#{String(briefNumber).padStart(3,'0')}</span>
            </div>
            <a href="/daily"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white transition-all"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="hidden sm:inline">Daily</span>
            </a>
            <button onClick={() => window.location.reload()}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <RefreshCw size={12}/>
            </button>
          </div>
        </div>

        {/* Stat pills row */}
        <div className="flex items-center gap-2 pb-3 flex-wrap">
          <StatPill color="#ef4444" bg="rgba(239,68,68,0.09)" border="rgba(239,68,68,0.20)" pulse>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            {p0Count} fire items
          </StatPill>
          <StatPill color="#6366f1" bg="rgba(99,102,241,0.09)" border="rgba(99,102,241,0.20)">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {meetingCount} meetings
          </StatPill>
          <StatPill color="#f59e0b" bg="rgba(245,158,11,0.08)" border="rgba(245,158,11,0.18)">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            {followUpCount} follow-ups
          </StatPill>
          <StatPill color="#475569" bg="rgba(255,255,255,0.04)" border="rgba(255,255,255,0.08)">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            {taskDone}/{taskTotal} tasks
          </StatPill>

          <div className="flex-1 hidden sm:block"/>
          <span className="hidden sm:flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center sterling-mono text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#4338ca,#6d28d9)' }}>A</div>
            <span className="text-xs text-slate-600">Alexander Sohn</span>
          </span>
        </div>
      </div>

      {/* Stakes strip */}
      <StakesStrip cards={stakesCards}/>

      {/* Bottom line */}
      <div className="h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.25) 25%, rgba(139,92,246,0.25) 75%, transparent 100%)' }}/>
    </header>
  )
}

function StatPill({ children, color, bg, border, pulse }: {
  children: React.ReactNode; color: string; bg: string; border: string; pulse?: boolean
}) {
  return (
    <div className="stat-pill" style={{ background: bg, border: `1px solid ${border}`, color }}>
      {pulse && (
        <div className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span className="ping-slow absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: color }}/>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: color }}/>
        </div>
      )}
      {children}
    </div>
  )
}

function StakesStrip({ cards }: { cards: StakesCard[] }) {
  return (
    <div className="max-w-[1600px] mx-auto px-5 py-2.5">
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
        <span className="section-label flex-shrink-0 hidden sm:block mr-1">Week's stakes</span>
        {cards.map(c => {
          const s = LEVEL_STYLE[c.level] || LEVEL_STYLE.P2
          return (
            <div key={c.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg flex-shrink-0 transition-all"
              style={{ background: s.badge, border: `1px solid ${s.bar}22`, borderLeft: `2px solid ${s.bar}` }}>
              <div style={{ color: s.text }} className="flex-shrink-0">
                {ICONS[c.icon] || ICONS.doc}
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight" style={{ color: s.text }}>{c.headline}</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">{c.sub}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
