import { Gavel, Activity, Trophy, Clock, BrainCog } from 'lucide-react'

type Decision = { id: string; title: string; context: string; where: string; urgency: string }
type Stakeholder = { id: string; name: string; role: string; initials: string; status: string; lastTouch: string; note: string }
type DeepWork = { window: string; reasoning: string; suggestion: string }

const URGENCY_CONFIG: Record<string, { dot: string; label: string; border: string }> = {
  overdue:    { dot: '#ef4444', label: 'Overdue',    border: 'rgba(239,68,68,0.2)' },
  'this-week':{ dot: '#f97316', label: 'This Week',  border: 'rgba(249,115,22,0.2)' },
  upcoming:   { dot: '#eab308', label: 'Upcoming',   border: 'rgba(234,179,8,0.18)' },
}

const STATUS_CONFIG: Record<string, { dot: string; label: string; initBg: string }> = {
  hot:    { dot: '#22c55e', label: 'Hot',            initBg: 'rgba(34,197,94,0.12)' },
  warm:   { dot: '#f97316', label: 'Warm',           initBg: 'rgba(249,115,22,0.10)' },
  action: { dot: '#ef4444', label: 'Action needed',  initBg: 'rgba(239,68,68,0.10)' },
  cold:   { dot: '#6366f1', label: 'Needs attention',initBg: 'rgba(99,102,241,0.10)' },
}

export function DecisionRegister({ decisions }: { decisions: Decision[] }) {
  return (
    <div>
      <p className="section-label mb-3 flex items-center gap-1.5">
        <Gavel size={9} /> Decision Register
      </p>
      <div className="space-y-2">
        {decisions.map((d, i) => {
          const ug = URGENCY_CONFIG[d.urgency] || URGENCY_CONFIG['upcoming']
          return (
            <div key={d.id} className="glass p-3 transition-all-200"
              style={{ borderLeft: `2px solid ${ug.dot}55` }}>
              <div className="flex items-start gap-2.5">
                <span className="sterling-mono text-xs font-bold mt-0.5 flex-shrink-0"
                  style={{ color: '#475569' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-xs font-semibold text-white">{d.title}</p>
                    <span className="px-1.5 py-0.5 rounded text-xs sterling-mono"
                      style={{ background: `${ug.dot}12`, color: ug.dot, border: `1px solid ${ug.border}` }}>
                      {ug.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{d.context}</p>
                  <p className="text-xs text-indigo-400/70 mt-1 leading-relaxed">→ {d.where}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function StakeholderPulse({ stakeholders }: { stakeholders: Stakeholder[] }) {
  return (
    <div>
      <p className="section-label mb-3 flex items-center gap-1.5">
        <Activity size={9} /> Stakeholder Pulse
      </p>
      <div className="space-y-2">
        {stakeholders.map(s => {
          const sc = STATUS_CONFIG[s.status] || STATUS_CONFIG['warm']
          return (
            <div key={s.id} className="glass p-3 transition-all-200">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 sterling-mono text-xs font-bold text-white"
                  style={{ background: sc.initBg, border: `1px solid ${sc.dot}25` }}>
                  {s.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-semibold text-white">{s.name}</p>
                    {/* Status dot */}
                    <div className="relative flex h-2 w-2 flex-shrink-0">
                      {s.status === 'action' && (
                        <span className="ping-slow absolute inline-flex h-full w-full rounded-full opacity-60"
                          style={{ background: sc.dot }} />
                      )}
                      <span className="relative inline-flex rounded-full h-2 w-2"
                        style={{ background: sc.dot }} />
                    </div>
                    <span className="text-xs" style={{ color: sc.dot }}>{sc.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{s.role}</p>
                  <p className="text-xs text-slate-600 mb-1.5">Last touch: {s.lastTouch}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.note}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function WinBank({ wins }: { wins: string[] }) {
  return (
    <div>
      <p className="section-label mb-3 flex items-center gap-1.5">
        <Trophy size={9} /> Win Bank — Last Week
      </p>
      <div className="glass p-4"
        style={{ background: 'rgba(34,197,94,0.03)', border: '1px solid rgba(34,197,94,0.1)' }}>
        <p className="text-xs text-slate-500 mb-3 italic">Use these when leadership asks what you got done.</p>
        <div className="space-y-3">
          {wins.map((w, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#22c55e' }} />
              <p className="text-xs text-slate-300 leading-relaxed">{w}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DeepWorkBlock({ deepWork }: { deepWork: DeepWork }) {
  return (
    <div>
      <p className="section-label mb-3 flex items-center gap-1.5">
        <BrainCog size={9} /> Deep Work Block
      </p>
      <div className="glass p-4"
        style={{ background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.12)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Clock size={13} className="text-indigo-400 flex-shrink-0" />
          <p className="text-sm font-semibold text-white">{deepWork.window}</p>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">{deepWork.reasoning}</p>
        <div className="rounded-lg p-3" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <p className="text-xs text-indigo-300 leading-relaxed">{deepWork.suggestion}</p>
        </div>
      </div>
    </div>
  )
}
