'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Target, Gavel, MessageSquare, BookOpen, History, Users, ExternalLink } from 'lucide-react'

type Link = { label: string; url: string; type: string }
type Meeting = {
  id: string; title: string; day: string; time: string; location: string;
  attendees: string[]; goal: string; role: string; decision: string;
  history: string; talkingPoints: string[]; preReads: string[]; type: string; links?: Link[]
}

const LINK_ICON: Record<string,string> = { jira:'🎯', doc:'📄', sheet:'📊', slides:'📑', tracker:'🔗' }
function LinkChips({ links }: { links: Link[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {links.map((l,i) => (
        <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all"
          style={{ background:'rgba(99,102,241,0.08)', border:'1px solid rgba(99,102,241,0.18)', color:'#818cf8' }}>
          <span>{LINK_ICON[l.type]||'🔗'}</span>{l.label}<ExternalLink size={9} className="opacity-60"/>
        </a>
      ))}
    </div>
  )
}

const TYPE_COLORS: Record<string, string> = {
  retreat: '#6366f1', session: '#8b5cf6', recurring: '#0ea5e9'
}

export default function MeetingSection({ meetings }: { meetings: Meeting[] }) {
  const [idx, setIdx] = useState(0)
  const m = meetings[idx]
  const color = TYPE_COLORS[m.type] || '#6366f1'

  return (
    <div>
      <p className="section-label mb-2">Meeting Preview</p>

      {/* Tab bar */}
      <div className="flex items-center gap-1 mb-3 overflow-x-auto pb-0.5">
        {meetings.map((mt, i) => (
          <button key={mt.id} onClick={() => setIdx(i)}
            className="flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            style={idx === i
              ? { background: `${TYPE_COLORS[mt.type] || '#6366f1'}18`, color: TYPE_COLORS[mt.type] || '#a5b4fc', border: `1px solid ${TYPE_COLORS[mt.type] || '#6366f1'}30` }
              : { background: 'rgba(255,255,255,0.03)', color: '#475569', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="hidden sm:inline">{mt.title.split('—')[0].split('↔')[0].split('|')[0].trim().substring(0, 22)}{mt.title.length > 22 ? '…' : ''}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        ))}
        {/* Nav arrows */}
        <div className="flex gap-1 ml-auto flex-shrink-0">
          <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}
            className="p-1 rounded text-slate-600 hover:text-slate-400 disabled:opacity-30 transition-colors">
            <ChevronLeft size={13} />
          </button>
          <button onClick={() => setIdx(i => Math.min(meetings.length - 1, i + 1))} disabled={idx === meetings.length - 1}
            className="p-1 rounded text-slate-600 hover:text-slate-400 disabled:opacity-30 transition-colors">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Meeting card */}
      <div key={m.id} className="glass fade-up" style={{ borderLeft: `3px solid ${color}` }}>
        {/* Header */}
        <div className="px-4 pt-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-white leading-snug">{m.title}</h3>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-xs text-slate-500">{m.day}</span>
                {m.time !== 'TBC' && m.time !== 'All week, in-person' && (
                  <span className="text-xs text-slate-500">{m.time}</span>
                )}
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <MapPin size={9}/> {m.location}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Users size={10} className="text-slate-600"/>
              <span className="text-xs text-slate-600">{m.attendees.length}</span>
            </div>
          </div>
        </div>

        {/* Body — compact 2-col grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* Goal + Role */}
          <div className="space-y-3">
            <div>
              <p className="section-label mb-1 flex items-center gap-1"><Target size={8}/> Goal</p>
              <p className="text-xs text-slate-300 leading-relaxed">{m.goal}</p>
            </div>
            <div>
              <p className="section-label mb-1">Your Role</p>
              <p className="text-xs text-slate-400 leading-relaxed">{m.role}</p>
            </div>
            {m.decision && m.decision !== 'None' && (
              <div className="rounded-lg p-2.5" style={{ background: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.13)' }}>
                <p className="section-label mb-1 flex items-center gap-1 text-yellow-700"><Gavel size={8}/> Decision on the Table</p>
                <p className="text-xs text-slate-300 leading-relaxed">{m.decision}</p>
              </div>
            )}
          </div>

          {/* Talking points + pre-reads */}
          <div className="space-y-3">
            <div>
              <p className="section-label mb-1.5 flex items-center gap-1"><MessageSquare size={8}/> Your Talking Points</p>
              <div className="space-y-1.5">
                {m.talkingPoints.map((tp, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }}/>
                    <p className="text-xs text-slate-300 leading-relaxed italic">{tp}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="section-label mb-1 flex items-center gap-1"><History size={8}/> History</p>
              <p className="text-xs text-slate-500 leading-relaxed">{m.history}</p>
            </div>
            {m.preReads[0] !== 'None — you know this material' && (
              <div>
                <p className="section-label mb-1 flex items-center gap-1"><BookOpen size={8}/> Pre-Reads</p>
                {m.preReads.map((pr, i) => (
                  <p key={i} className="text-xs text-slate-500 leading-relaxed"><span className="text-slate-700">→</span> {pr}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Links */}
        {m.links && m.links.length > 0 && (
          <div className="px-4 pb-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <p className="section-label mb-2">Reference Materials</p>
            <LinkChips links={m.links} />
          </div>
        )}

        {/* Counter */}
        <div className="px-4 pb-3 flex justify-end">
          <span className="sterling-mono text-xs text-slate-700">{idx + 1} / {meetings.length}</span>
        </div>
      </div>
    </div>
  )
}
