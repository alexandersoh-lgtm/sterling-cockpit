'use client'
import { useState } from 'react'
import { MessageSquare, Mail, Sparkles, AlertCircle, Clock } from 'lucide-react'
import DraftModal from './DraftModal'

type FollowUp = {
  id: string; channel: string; person: string; channelName: string;
  preview: string; sentAt: string; urgency: string; draft: string;
}

export default function FollowUps({ followUps }: { followUps: FollowUp[] }) {
  const [active, setActive] = useState<FollowUp | null>(null)

  const URGENCY_CONFIG: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    high:   { color: '#ef4444', icon: <AlertCircle size={10} />, label: 'High' },
    medium: { color: '#eab308', icon: <Clock size={10} />,       label: 'Medium' },
    low:    { color: '#6366f1', icon: <Clock size={10} />,       label: 'Low' },
  }

  return (
    <>
      <div>
        <p className="section-label mb-3">Follow-Ups Needed</p>
        <div className="space-y-2">
          {followUps.map(fu => {
            const ug = URGENCY_CONFIG[fu.urgency] || URGENCY_CONFIG['medium']
            return (
              <div key={fu.id} className="glass p-4 transition-all-200"
                style={{ borderLeft: `3px solid ${ug.color}55` }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Channel icon */}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: fu.channel === 'slack' ? 'rgba(99,102,241,0.1)' : 'rgba(14,165,233,0.1)',
                               border: `1px solid ${fu.channel === 'slack' ? 'rgba(99,102,241,0.2)' : 'rgba(14,165,233,0.2)'}` }}>
                      {fu.channel === 'slack'
                        ? <MessageSquare size={14} className="text-indigo-400" />
                        : <Mail size={14} className="text-sky-400" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-white">{fu.person}</span>
                        <span className="text-xs text-slate-600">·</span>
                        <span className="text-xs text-slate-500">{fu.channelName}</span>
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs sterling-mono"
                          style={{ color: ug.color, background: `${ug.color}12`, border: `1px solid ${ug.color}25` }}>
                          {ug.icon} {ug.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{fu.preview}</p>
                      <p className="text-xs text-slate-600 mt-1">{fu.sentAt}</p>
                    </div>
                  </div>
                </div>

                {/* Draft button */}
                <button
                  onClick={() => setActive(fu)}
                  className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all-200"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))',
                    border: '1px solid rgba(99,102,241,0.25)',
                    color: '#a5b4fc'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(99,102,241,0.22), rgba(139,92,246,0.22))'
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99,102,241,0.45)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))'
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99,102,241,0.25)'
                  }}>
                  <Sparkles size={13} />
                  Draft this with Sterling →
                </button>
              </div>
            )
          })}

          {followUps.length === 0 && (
            <div className="glass p-6 text-center">
              <p className="text-sm text-emerald-400 font-medium">Inbox clear.</p>
              <p className="text-xs text-slate-600 mt-1">No outstanding questions. Sterling approves.</p>
            </div>
          )}
        </div>
      </div>

      <DraftModal item={active} onClose={() => setActive(null)} />
    </>
  )
}
