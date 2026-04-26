'use client'
import { RefreshCw, Calendar } from 'lucide-react'

export default function Navbar({ weekStart, weekEnd }: { weekStart: string; weekEnd: string }) {
  const fmt = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <nav className="sticky top-0 z-50 h-14 flex items-center justify-between px-6"
      style={{ background: 'rgba(7,7,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 16px rgba(99,102,241,0.4)' }}>
          <span className="sterling-mono text-white text-sm font-bold">S</span>
        </div>
        <div>
          <div className="sterling-mono text-white text-sm font-semibold tracking-widest">STERLING</div>
          <div className="section-label" style={{ marginTop: '-1px' }}>Chief of Staff</div>
        </div>
      </div>

      {/* Center — view label */}
      <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full"
        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <Calendar size={12} className="text-indigo-400" />
        <span className="sterling-mono text-xs text-indigo-300 font-medium tracking-widest">WEEKLY BRIEF</span>
        <span className="text-slate-500 text-xs">·</span>
        <span className="text-slate-400 text-xs">{fmt(weekStart)} – {fmt(weekEnd)}</span>
      </div>

      {/* Right — status + refresh */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-xs text-slate-500">Generated Apr 26, 6:05 PM</span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white transition-all-200"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <RefreshCw size={12} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </nav>
  )
}
