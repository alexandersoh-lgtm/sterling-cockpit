type Block = { time: string; end: string; type: string; label: string; sub: string }

const TYPE_CONFIG: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  meeting: { bg: 'rgba(99,102,241,0.10)',  border: 'rgba(99,102,241,0.25)', dot: '#6366f1', label: 'Meeting'   },
  work:    { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.20)', dot: '#f97316', label: 'Work'      },
  deep:    { bg: 'rgba(139,92,246,0.10)',  border: 'rgba(139,92,246,0.25)', dot: '#8b5cf6', label: 'Deep Work' },
  travel:  { bg: 'rgba(14,165,233,0.08)',  border: 'rgba(14,165,233,0.20)', dot: '#0ea5e9', label: 'Travel'    },
  free:    { bg: 'rgba(255,255,255,0.025)',border: 'rgba(255,255,255,0.07)', dot: '#334155', label: 'Open'      },
}

type EnergyLevel = 'high' | 'medium' | 'low'

const ENERGY_BARS: Record<EnergyLevel, { width: string; color: string; label: string }> = {
  high:   { width: '85%',  color: '#22c55e', label: 'High energy'   },
  medium: { width: '55%',  color: '#f59e0b', label: 'Medium energy' },
  low:    { width: '30%',  color: '#ef4444', label: 'Lower energy'  },
}

export default function DayTimeline({ timeline, energy }: {
  timeline: Block[]
  energy: { morning: string; afternoon: string; note: string }
}) {
  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div>
        <p className="section-label mb-2">Day Timeline</p>
        <div className="space-y-1.5">
          {timeline.map((block, i) => {
            const cfg = TYPE_CONFIG[block.type] || TYPE_CONFIG.free
            return (
              <div key={i} className="flex items-start gap-2.5">
                {/* Time */}
                <div className="flex-shrink-0 w-20 pt-2">
                  <p className="sterling-mono text-xs text-slate-600 leading-tight">{block.time}</p>
                </div>
                {/* Dot + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full mt-2.5 flex-shrink-0" style={{ background: cfg.dot }}/>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 min-h-4 mt-1" style={{ background: 'rgba(255,255,255,0.06)' }}/>
                  )}
                </div>
                {/* Card */}
                <div className="flex-1 rounded-lg px-3 py-2 mb-1 min-w-0"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                  <p className="text-xs font-medium text-slate-200 leading-snug">{block.label}</p>
                  {block.sub && <p className="text-xs text-slate-500 mt-0.5 leading-snug">{block.sub}</p>}
                  <p className="text-xs text-slate-700 mt-0.5">{block.end}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Energy Map */}
      <div>
        <p className="section-label mb-2">Energy Map</p>
        <div className="glass p-3 space-y-2.5">
          {(['morning','afternoon'] as const).map(period => {
            const level = energy[period] as EnergyLevel
            const bar = ENERGY_BARS[level] || ENERGY_BARS.medium
            return (
              <div key={period}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500 capitalize">{period}</span>
                  <span className="text-xs" style={{ color: bar.color }}>{bar.label}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: bar.width, background: bar.color }}/>
                </div>
              </div>
            )
          })}
          <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            {energy.note}
          </p>
        </div>
      </div>
    </div>
  )
}
