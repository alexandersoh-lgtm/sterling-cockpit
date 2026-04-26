'use client'
import { useEffect, useState, useCallback } from 'react'
import { X, Copy, Check, MessageSquare, Mail } from 'lucide-react'

type FollowUp = {
  id: string; channel: string; person: string; channelName: string;
  preview: string; sentAt: string; urgency: string; draft: string;
}

export default function DraftModal({ item, onClose }: { item: FollowUp | null; onClose: () => void }) {
  const [phase, setPhase] = useState<'thinking' | 'typing' | 'done'>('thinking')
  const [displayedText, setDisplayedText] = useState('')
  const [copied, setCopied] = useState(false)

  const startTyping = useCallback((fullText: string) => {
    setPhase('typing')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayedText(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(interval)
        setPhase('done')
      }
    }, 18)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!item) return
    setPhase('thinking')
    setDisplayedText('')
    setCopied(false)
    const t = setTimeout(() => startTyping(item.draft), 1400)
    return () => clearTimeout(t)
  }, [item, startTyping])

  const copy = () => {
    if (!item) return
    navigator.clipboard.writeText(item.draft)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}>

      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#0e0e1a', border: '1px solid rgba(99,102,241,0.25)', boxShadow: '0 0 60px rgba(99,102,241,0.12)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(99,102,241,0.06)' }}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #4338ca, #6d28d9)', boxShadow: '0 0 12px rgba(99,102,241,0.4)' }}>
              <span className="sterling-mono text-white text-xs font-bold">N</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Nexus's Draft</p>
              <p className="text-xs text-slate-500">Reply to {item.person}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-400 transition-colors p-1 rounded">
            <X size={16} />
          </button>
        </div>

        {/* Context card */}
        <div className="px-5 py-3 mx-5 mt-4 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2 mb-1">
            {item.channel === 'slack'
              ? <MessageSquare size={11} className="text-indigo-400" />
              : <Mail size={11} className="text-indigo-400" />
            }
            <span className="text-xs text-slate-500">{item.channel === 'slack' ? 'Slack' : 'Email'} · {item.channelName} · {item.sentAt}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{item.preview}</p>
        </div>

        {/* Draft area */}
        <div className="px-5 pb-5 mt-4">
          <p className="section-label mb-2">Draft Reply</p>

          {phase === 'thinking' && (
            <div className="flex items-center gap-3 py-8 justify-center">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                    style={{ animation: `ping-slow 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
              <span className="text-sm text-slate-500 italic">Nexus is composing...</span>
            </div>
          )}

          {(phase === 'typing' || phase === 'done') && (
            <div className="rounded-xl p-4 min-h-[100px]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className={`text-sm text-slate-200 leading-relaxed whitespace-pre-wrap ${phase === 'typing' ? 'cursor-blink' : ''}`}>
                {displayedText}
              </p>
            </div>
          )}

          {/* Actions */}
          {phase === 'done' && (
            <div className="flex items-center gap-2 mt-3">
              <button onClick={copy}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all-200 flex-1 justify-center"
                style={{ background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(99,102,241,0.15)',
                         border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(99,102,241,0.3)'}`,
                         color: copied ? '#86efac' : '#a5b4fc' }}>
                {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Draft</>}
              </button>
              <button onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-300 transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                Close
              </button>
            </div>
          )}

          {/* Nexus signature */}
          {phase === 'done' && (
            <p className="text-xs text-slate-600 text-right mt-3 sterling-mono">
              — Nexus
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
