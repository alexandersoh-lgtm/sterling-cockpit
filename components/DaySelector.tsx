'use client'

type Day = { id: string; shortName: string; date: string; fullDate: string }

export default function DaySelector({ days, activeId, onSelect }: {
  days: Day[]; activeId: string; onSelect: (id: string) => void
}) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-0.5 px-5 py-3"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      {days.map(d => {
        const isActive = d.id === activeId
        const isToday = d.fullDate === today
        return (
          <button key={d.id} onClick={() => onSelect(d.id)}
            className="flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg transition-all relative"
            style={isActive
              ? { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }
              : { background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {isToday && (
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500"/>
            )}
            <span className={`sterling-mono text-xs font-bold tracking-wider ${isActive ? 'text-indigo-300' : 'text-slate-500'}`}>
              {d.shortName}
            </span>
            <span className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
              {d.date}
            </span>
          </button>
        )
      })}

      <div className="h-6 w-px mx-2 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.07)' }}/>

      <a href="/weekly" className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 transition-all"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Weekly View
      </a>
    </div>
  )
}
