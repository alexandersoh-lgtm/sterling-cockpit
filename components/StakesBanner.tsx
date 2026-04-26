import { AlertTriangle } from 'lucide-react'

export default function StakesBanner({ stakes }: { stakes: string }) {
  return (
    <div className="relative overflow-hidden px-6 py-8"
      style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.05) 50%, transparent 100%)',
        borderBottom: '1px solid rgba(99,102,241,0.12)'
      }}>

      {/* Decorative line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
        style={{ background: 'linear-gradient(180deg, #6366f1, #8b5cf6)' }} />

      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <AlertTriangle size={15} className="text-indigo-400" />
          </div>
          <div>
            <p className="section-label mb-2">The Week's Stakes</p>
            <p className="text-base md:text-lg text-slate-200 font-medium leading-relaxed max-w-3xl">
              {stakes}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
