'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp, MapPin, Clock, Users, Target, Gavel, History, MessageSquare, BookOpen, Repeat, Tent, CalendarDays } from 'lucide-react'

type Meeting = {
  id: string; title: string; day: string; time: string; location: string;
  attendees: string[]; goal: string; role: string; decision: string;
  history: string; talkingPoints: string[]; preReads: string[]; type: string;
}

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  retreat:   { icon: <Tent size={11} />,       color: '#6366f1', label: 'Retreat' },
  session:   { icon: <CalendarDays size={11} />, color: '#8b5cf6', label: 'Session' },
  recurring: { icon: <Repeat size={11} />,      color: '#0ea5e9', label: 'Recurring' },
}

function MeetingCard({ meeting }: { meeting: Meeting }) {
  const [open, setOpen] = useState(false)
  const tc = TYPE_CONFIG[meeting.type] || TYPE_CONFIG['recurring']

  return (
    <div className="glass transition-all-200" style={{ overflow: 'hidden' }}>
      {/* Header — always visible */}
      <button className="w-full text-left p-4 flex items-start justify-between gap-3"
        onClick={() => setOpen(!open)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {/* Type badge */}
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full sterling-mono text-xs"
              style={{ background: `${tc.color}18`, color: tc.color, border: `1px solid ${tc.color}28` }}>
              {tc.icon} {tc.label}
            </span>
            {/* Day */}
            <span className="text-xs text-slate-500">{meeting.day}</span>
            {/* Time */}
            {meeting.time !== 'TBC' && meeting.time !== 'All week, in-person' && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={10} /> {meeting.time}
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug">{meeting.title}</h3>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={10} /> {meeting.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Users size={10} /> {meeting.attendees.length} attendees
            </span>
          </div>
        </div>
        <div className="text-slate-600 flex-shrink-0 mt-1">
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t px-4 pb-5 pt-4 space-y-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>

          {/* Attendees */}
          <div>
            <p className="section-label mb-2">Attendees</p>
            <div className="flex flex-wrap gap-1.5">
              {meeting.attendees.map((a, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full text-xs text-slate-400"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Goal + Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg p-3" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.12)' }}>
              <p className="section-label mb-1.5 flex items-center gap-1"><Target size={9} /> Goal</p>
              <p className="text-xs text-slate-300 leading-relaxed">{meeting.goal}</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="section-label mb-1.5">Your Role</p>
              <p className="text-xs text-slate-300 leading-relaxed">{meeting.role}</p>
            </div>
          </div>

          {/* Decision */}
          {meeting.decision && meeting.decision !== 'None' && (
            <div className="rounded-lg p-3" style={{ background: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.15)' }}>
              <p className="section-label mb-1.5 flex items-center gap-1 text-yellow-600"><Gavel size={9} /> Decision on the Table</p>
              <p className="text-xs text-slate-300 leading-relaxed">{meeting.decision}</p>
            </div>
          )}

          {/* History */}
          <div>
            <p className="section-label mb-1.5 flex items-center gap-1"><History size={9} /> History</p>
            <p className="text-xs text-slate-400 leading-relaxed">{meeting.history}</p>
          </div>

          {/* Talking Points */}
          <div>
            <p className="section-label mb-2 flex items-center gap-1"><MessageSquare size={9} /> Your Talking Points</p>
            <div className="space-y-2">
              {meeting.talkingPoints.map((tp, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#6366f1' }} />
                  <p className="text-xs text-slate-300 leading-relaxed italic">{tp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-reads */}
          <div>
            <p className="section-label mb-2 flex items-center gap-1"><BookOpen size={9} /> Pre-Reads</p>
            <div className="space-y-1">
              {meeting.preReads.map((pr, i) => (
                <p key={i} className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-slate-600 mr-1">→</span> {pr}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MeetingSection({ meetings }: { meetings: Meeting[] }) {
  return (
    <div>
      <p className="section-label mb-3">Meeting Preview</p>
      <div className="space-y-2">
        {meetings.map(m => <MeetingCard key={m.id} meeting={m} />)}
      </div>
    </div>
  )
}
