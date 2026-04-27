'use client'
import { useEffect, useState } from 'react'

type Block = { time: string; end: string; type: string; label: string; sub: string }

const TYPE = {
  meeting: { color: '#6366f1', bg: 'rgba(99,102,241,0.10)',  border: 'rgba(99,102,241,0.28)', glow: 'rgba(99,102,241,0.2)',  icon: '📅', tag: 'MEETING'   },
  work:    { color: '#f97316', bg: 'rgba(249,115,22,0.09)',  border: 'rgba(249,115,22,0.25)', glow: 'rgba(249,115,22,0.18)', icon: '⚡', tag: 'WORK'      },
  deep:    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.10)',  border: 'rgba(139,92,246,0.28)', glow: 'rgba(139,92,246,0.2)',  icon: '🧠', tag: 'DEEP WORK' },
  travel:  { color: '#0ea5e9', bg: 'rgba(14,165,233,0.09)',  border: 'rgba(14,165,233,0.25)', glow: 'rgba(14,165,233,0.18)', icon: '✈', tag: 'TRAVEL'    },
  free:    { color: '#334155', bg: 'rgba(255,255,255,0.025)',border: 'rgba(255,255,255,0.08)', glow: 'transparent',           icon: '○', tag: 'FREE'      },
}

const ENERGY = {
  high:   { pct: 88, color: '#22c55e', label: 'High',   glow: 'rgba(34,197,94,0.3)'  },
  medium: { pct: 55, color: '#f59e0b', label: 'Medium', glow: 'rgba(245,158,11,0.3)' },
  low:    { pct: 28, color: '#ef4444', label: 'Low',    glow: 'rgba(239,68,68,0.3)'  },
}

function parseMinutes(t: string): number {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!m) return 0
  let h = parseInt(m[1]), min = parseInt(m[2])
  if (m[3].toUpperCase() === 'PM' && h !== 12) h += 12
  if (m[3].toUpperCase() === 'AM' && h === 12) h = 0
  return h * 60 + min
}

export default function DayTimeline({ timeline, energy }: {
  timeline: Block[]
  energy: { morning: string; afternoon: string; note: string }
}) {
  const [nowMins, setNowMins] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => {
      const n = new Date()
      setNowMins(n.getHours() * 60 + n.getMinutes())
    }
    update()
    const id = setInterval(update, 60000)
    return () => clearInterval(id)
  }, [])

  const nowLabel = nowMins !== null
    ? (() => {
        const h = Math.floor(nowMins / 60)
        const m = nowMins % 60
        const ampm = h >= 12 ? 'PM' : 'AM'
        const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
        return `${h12}:${String(m).padStart(2,'0')} ${ampm}`
      })()
    : null

  let nowInserted = false

  return (
    <div className="space-y-5">
      <div>
        <p className="section-label mb-3">Day at a Glance</p>

        {/* Rail + blocks */}
        <div className="relative">
          {/* Vertical rail */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(180deg, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0.1) 100%)' }}/>

          <div className="space-y-0">
            {timeline.map((block, i) => {
              const cfg = TYPE[block.type as keyof typeof TYPE] || TYPE.free
              const startM = parseMinutes(block.time)
              const endM   = parseMinutes(block.end)
              const isPast    = nowMins !== null && endM < nowMins
              const isActive  = nowMins !== null && startM <= nowMins && endM > nowMins
              const showNow   = mounted && nowMins !== null && !nowInserted && startM > nowMins
              if (showNow) nowInserted = true

              return (
                <div key={i}>
                  {/* NOW indicator */}
                  {showNow && (
                    <div className="flex items-center gap-3 py-2 pl-0">
                      <div className="relative flex w-[37px] justify-center flex-shrink-0">
                        <div className="relative flex h-3 w-3">
                          <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"/>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"/>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(34,197,94,0.6) 0%, transparent 100%)' }}/>
                        <span className="sterling-mono text-xs font-bold text-emerald-400 flex-shrink-0">
                          NOW · {nowLabel}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className={`flex items-start gap-3 pb-2 transition-all ${isPast ? 'opacity-40' : ''}`}>
                    {/* Time + dot */}
                    <div className="flex flex-col items-center flex-shrink-0 w-[37px]">
                      <p className="sterling-mono text-xs text-slate-600 leading-tight mb-1 text-right w-full"
                        style={{ fontSize: '10px' }}>{block.time}</p>
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 border-2 ${isActive ? 'animate-pulse' : ''}`}
                        style={{
                          background: isActive ? cfg.color : `${cfg.color}50`,
                          borderColor: cfg.color,
                          boxShadow: isActive ? `0 0 10px ${cfg.glow}` : 'none'
                        }}/>
                    </div>

                    {/* Block card */}
                    <div className={`flex-1 rounded-xl overflow-hidden transition-all`}
                      style={{
                        background: cfg.bg,
                        border: `1px solid ${cfg.border}`,
                        borderLeft: `3px solid ${cfg.color}`,
                        boxShadow: isActive ? `0 0 16px ${cfg.glow}` : 'none'
                      }}>
                      <div className="px-3 py-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm">{cfg.icon}</span>
                              <p className="text-xs font-semibold text-white leading-snug">{block.label}</p>
                              {isActive && (
                                <span className="sterling-mono text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                                  style={{ background:`${cfg.color}25`, color: cfg.color, fontSize:'9px' }}>
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            {block.sub && (
                              <p className="text-xs text-slate-500 leading-snug ml-6">{block.sub}</p>
                            )}
                          </div>
                          <div className="flex flex-col items-end flex-shrink-0">
                            <span className="sterling-mono text-xs flex-shrink-0"
                              style={{ color: cfg.color, fontSize:'9px', opacity:0.8 }}>
                              {cfg.tag}
                            </span>
                            <span className="sterling-mono text-xs text-slate-700" style={{ fontSize:'9px' }}>
                              → {block.end}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* NOW at end if past all blocks */}
            {mounted && nowMins !== null && !nowInserted && (
              <div className="flex items-center gap-3 py-1 pl-0">
                <div className="w-[37px] flex justify-center">
                  <div className="relative flex h-3 w-3">
                    <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"/>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"/>
                  </div>
                </div>
                <span className="sterling-mono text-xs font-bold text-emerald-400">NOW · {nowLabel}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Energy map */}
      <div>
        <p className="section-label mb-3">Energy Map</p>
        <div className="rounded-xl overflow-hidden" style={{ border:'1px solid rgba(255,255,255,0.07)' }}>
          {(['morning','afternoon'] as const).map((period, pi) => {
            const lvl = energy[period] as keyof typeof ENERGY
            const e = ENERGY[lvl] || ENERGY.medium
            return (
              <div key={period} className={`px-4 py-3 ${pi === 0 ? 'border-b' : ''}`}
                style={{ borderColor:'rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 capitalize font-medium">{period}</span>
                  <span className="sterling-mono text-xs font-bold" style={{ color: e.color }}>{e.label}</span>
                </div>
                {/* Segmented bar */}
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, si) => {
                    const filled = (si + 1) <= Math.round(e.pct / 10)
                    return (
                      <div key={si} className="h-2 flex-1 rounded-sm transition-all"
                        style={{
                          background: filled ? e.color : 'rgba(255,255,255,0.07)',
                          boxShadow: filled ? `0 0 4px ${e.glow}` : 'none'
                        }}/>
                    )
                  })}
                </div>
              </div>
            )
          })}
          <div className="px-4 py-2.5" style={{ background:'rgba(99,102,241,0.04)' }}>
            <p className="text-xs text-slate-500 leading-relaxed italic">{energy.note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
