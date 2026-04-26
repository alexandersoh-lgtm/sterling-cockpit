import weeklyData from '@/data/weekly.json'
import Navbar from '@/components/Navbar'
import StakesBanner from '@/components/StakesBanner'
import PriorityGrid from '@/components/PriorityGrid'
import MeetingSection from '@/components/MeetingSection'
import TaskList from '@/components/TaskList'
import FollowUps from '@/components/FollowUps'
import { DecisionRegister, StakeholderPulse, WinBank, DeepWorkBlock } from '@/components/RightPanel'

export default function WeeklyPage() {
  const data = weeklyData

  return (
    <div className="min-h-screen dot-grid">
      <Navbar weekStart={data.meta.weekStart} weekEnd={data.meta.weekEnd} />
      <StakesBanner stakes={data.stakes} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Sterling sign-in line */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <p className="text-xs text-slate-600 sterling-mono tracking-widest">
            BRIEF #{String(data.meta.briefNumber).padStart(3,'0')} · ALEXANDER SOHN · ZILLOW GROUP
          </p>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-8 min-w-0">
            <PriorityGrid priorities={data.priorities} />
            <MeetingSection meetings={data.meetings} />
            <TaskList tasks={data.tasks} />
            <FollowUps followUps={data.followUps} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            <DecisionRegister decisions={data.decisions} />
            <StakeholderPulse stakeholders={data.stakeholders} />
            <WinBank wins={data.winBank} />
            <DeepWorkBlock deepWork={data.deepWork} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 flex items-center justify-center gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="w-5 h-5 rounded flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <span className="sterling-mono text-white text-xs font-bold">S</span>
          </div>
          <p className="text-xs text-slate-600 sterling-mono tracking-widest">
            You're ready. Go lead. — Sterling
          </p>
        </div>
      </div>
    </div>
  )
}
