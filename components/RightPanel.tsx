import { Gavel, Trophy, BrainCog, Clock } from 'lucide-react'

type Decision = { id:string; title:string; context:string; where:string; urgency:string }
type Stakeholder = { id:string; name:string; role:string; initials:string; status:string; lastTouch:string; note:string }
type DeepWork = { window:string; reasoning:string; suggestion:string }

const UG: Record<string,{dot:string;label:string;bg:string}> = {
  overdue:     {dot:'#ef4444', label:'Overdue',    bg:'rgba(239,68,68,0.1)'},
  'this-week': {dot:'#f97316', label:'This week',  bg:'rgba(249,115,22,0.1)'},
  upcoming:    {dot:'#eab308', label:'Upcoming',   bg:'rgba(234,179,8,0.08)'},
}
const SC: Record<string,{dot:string;bg:string;label:string}> = {
  hot:    {dot:'#22c55e', bg:'rgba(34,197,94,0.10)',   label:'Hot'},
  warm:   {dot:'#f97316', bg:'rgba(249,115,22,0.08)',  label:'Warm'},
  action: {dot:'#ef4444', bg:'rgba(239,68,68,0.10)',   label:'Action needed'},
  cold:   {dot:'#6366f1', bg:'rgba(99,102,241,0.08)', label:'Needs attention'},
}

export function DecisionRegister({ decisions }: { decisions: Decision[] }) {
  return (
    <div>
      <p className="section-label mb-2 flex items-center gap-1.5"><Gavel size={8}/> Decision Register</p>
      <div className="glass overflow-hidden">
        {decisions.map((d, i) => {
          const u = UG[d.urgency] || UG.upcoming
          return (
            <div key={d.id} className={`px-3 py-2.5 ${i !== 0 ? 'border-t border-white/[0.04]' : ''}`}>
              <div className="flex items-start gap-2">
                <span className="sterling-mono text-xs font-bold mt-0.5 flex-shrink-0 text-slate-700">{String(i+1).padStart(2,'0')}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-white leading-snug">{d.title}</p>
                    <span className="px-1.5 py-0.5 rounded sterling-mono text-xs flex-shrink-0"
                      style={{ background: u.bg, color: u.dot, border:`1px solid ${u.dot}25` }}>{u.label}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{d.context}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color:'#6366f1', opacity: 0.7 }}>→ {d.where}</p>
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
      <p className="section-label mb-2">Stakeholder Pulse</p>
      <div className="grid grid-cols-2 gap-1.5">
        {stakeholders.map(s => {
          const sc = SC[s.status] || SC.warm
          return (
            <div key={s.id} className="glass p-2.5 group cursor-default relative">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md flex items-center justify-center sterling-mono text-xs font-bold text-white flex-shrink-0"
                  style={{ background: sc.bg, border:`1px solid ${sc.dot}20` }}>{s.initials}</div>
                <div className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  {s.status === 'action' && <span className="ping-slow absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: sc.dot }}/>}
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: sc.dot }}/>
                </div>
              </div>
              <p className="text-xs font-medium text-white leading-tight truncate">{s.name.split(' ')[0]} {s.name.split(' ')[1]?.[0]}.</p>
              <p className="text-xs text-slate-600 leading-tight truncate">{s.role.split('/')[0].split(',')[0].trim()}</p>
              {/* Hover tooltip */}
              <div className="absolute bottom-full left-0 mb-1.5 z-20 w-52 rounded-lg p-2.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150"
                style={{ background:'#0e0e1a', border:'1px solid rgba(255,255,255,0.12)', boxShadow:'0 8px 32px rgba(0,0,0,0.5)' }}>
                <p className="text-xs font-semibold text-white mb-0.5">{s.name}</p>
                <p className="text-xs text-slate-500 mb-1.5">{s.lastTouch}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{s.note}</p>
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
      <p className="section-label mb-2 flex items-center gap-1.5"><Trophy size={8}/> Win Bank — Last Week</p>
      <div className="glass p-3 space-y-2" style={{ borderColor:'rgba(34,197,94,0.1)' }}>
        {wins.map((w, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background:'#22c55e' }}/>
            <p className="text-xs text-slate-400 leading-relaxed">{w}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DeepWorkBlock({ deepWork }: { deepWork: DeepWork }) {
  return (
    <div>
      <p className="section-label mb-2 flex items-center gap-1.5"><BrainCog size={8}/> Deep Work Block</p>
      <div className="glass p-3" style={{ background:'rgba(99,102,241,0.04)', borderColor:'rgba(99,102,241,0.13)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <Clock size={12} className="text-indigo-400 flex-shrink-0"/>
          <p className="text-xs font-semibold text-white">{deepWork.window}</p>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-2">{deepWork.reasoning}</p>
        <p className="text-xs text-indigo-300 leading-relaxed">{deepWork.suggestion}</p>
      </div>
    </div>
  )
}
