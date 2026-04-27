import { MapPin, Target, Gavel, MessageSquare, BookOpen, Users, ExternalLink } from 'lucide-react'

type Link = { label: string; url: string; type: string }
type Meeting = {
  id: string; title: string; time: string; location: string; attendees: string[]
  goal: string; role: string; decision: string; talkingPoints: string[]; preReads: string[]; links?: Link[]
}

const LINK_ICON: Record<string,string> = { jira:'🎯', doc:'📄', sheet:'📊', tracker:'🔗' }

export default function DailyMeetingPrep({ meetings }: { meetings: Meeting[] }) {
  if (!meetings || meetings.length === 0) return (
    <div>
      <p className="section-label mb-2">Today's Meetings</p>
      <div className="glass p-5 text-center">
        <p className="text-sm text-slate-500">No formal meetings today.</p>
        <p className="text-xs text-slate-600 mt-1">Use the time to close open P0s and advance project work.</p>
      </div>
    </div>
  )

  return (
    <div>
      <p className="section-label mb-2">Meeting Prep — Today</p>
      <div className="space-y-3">
        {meetings.map(m => (
          <div key={m.id} className="glass overflow-hidden"
            style={{ borderLeft: '3px solid #6366f1' }}>
            {/* Header */}
            <div className="px-4 pt-3 pb-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(99,102,241,0.04)' }}>
              <h3 className="text-sm font-semibold text-white">{m.title}</h3>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-xs text-indigo-400 font-medium">{m.time}</span>
                <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={9}/> {m.location}</span>
                <span className="flex items-center gap-1 text-xs text-slate-500"><Users size={9}/> {m.attendees.length} attendees</span>
              </div>
              {/* Attendee chips */}
              <div className="flex flex-wrap gap-1 mt-2">
                {m.attendees.map((a,i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded text-xs text-slate-500"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{a}</span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left */}
              <div className="space-y-3">
                <div>
                  <p className="section-label mb-1 flex items-center gap-1"><Target size={8}/> Goal</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.goal}</p>
                </div>
                <div>
                  <p className="section-label mb-1">Your Role</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.role}</p>
                </div>
                {m.decision && (
                  <div className="rounded-lg p-2.5" style={{ background: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.15)' }}>
                    <p className="section-label mb-1 flex items-center gap-1 text-yellow-700"><Gavel size={8}/> Decision</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{m.decision}</p>
                  </div>
                )}
              </div>
              {/* Right */}
              <div className="space-y-3">
                <div>
                  <p className="section-label mb-1.5 flex items-center gap-1"><MessageSquare size={8}/> Your Talking Points</p>
                  <div className="space-y-1.5">
                    {m.talkingPoints.map((tp,i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0 bg-indigo-500"/>
                        <p className="text-xs text-slate-300 leading-relaxed italic">{tp}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {m.preReads && m.preReads[0] !== 'None — you know this cold' && (
                  <div>
                    <p className="section-label mb-1 flex items-center gap-1"><BookOpen size={8}/> Pre-Reads</p>
                    {m.preReads.map((pr,i) => (
                      <p key={i} className="text-xs text-slate-500 leading-relaxed"><span className="text-slate-700">→</span> {pr}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            {m.links && m.links.length > 0 && (
              <div className="px-4 pb-3 pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex flex-wrap gap-1.5">
                  {m.links.map((l,i) => (
                    <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all"
                      style={{ background:'rgba(99,102,241,0.08)', border:'1px solid rgba(99,102,241,0.18)', color:'#818cf8' }}>
                      <span>{LINK_ICON[l.type]||'🔗'}</span>{l.label}<ExternalLink size={9} className="opacity-60"/>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
