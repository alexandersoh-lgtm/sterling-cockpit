'use client'
import { useState } from 'react'
import { MessageSquare, Sparkles, AlertCircle, Clock } from 'lucide-react'
import DraftModal from './DraftModal'

type FollowUp = { id:string; channel:string; person:string; channelName:string; preview:string; sentAt:string; urgency:string; draft:string }

const UG: Record<string,{color:string;icon:React.ReactNode}> = {
  high:   {color:'#ef4444', icon:<AlertCircle size={9}/>},
  medium: {color:'#eab308', icon:<Clock size={9}/>},
}

export default function FollowUps({ followUps }: { followUps: FollowUp[] }) {
  const [active, setActive] = useState<FollowUp|null>(null)

  if (followUps.length === 0) return (
    <div>
      <p className="section-label mb-2">Follow-Ups Needed</p>
      <div className="glass p-4 text-center">
        <p className="text-xs text-emerald-400 font-medium">Inbox clear. No outstanding questions.</p>
      </div>
    </div>
  )

  return (
    <>
      <div>
        <p className="section-label mb-2">Follow-Ups Needed</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {followUps.map(fu => {
            const u = UG[fu.urgency] || UG.medium
            return (
              <div key={fu.id} className="glass p-3 flex flex-col gap-2"
                style={{ borderLeft:`2px solid ${u.color}55` }}>
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.2)' }}>
                    <MessageSquare size={13} className="text-indigo-400"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-semibold text-white">{fu.person}</span>
                      <span className="flex items-center gap-0.5 text-xs" style={{ color: u.color }}>{u.icon}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{fu.channelName}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{fu.preview}</p>
                <p className="text-xs text-slate-600">{fu.sentAt}</p>
                <button onClick={() => setActive(fu)}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{ background:'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.12))', border:'1px solid rgba(99,102,241,0.25)', color:'#a5b4fc' }}>
                  <Sparkles size={11}/> Draft with Sterling →
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <DraftModal item={active} onClose={() => setActive(null)}/>
    </>
  )
}
