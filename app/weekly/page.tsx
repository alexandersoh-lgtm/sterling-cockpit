import weeklyData from '@/data/weekly.json'
import NexusHeader from '@/components/NexusHeader'
import PriorityGrid from '@/components/PriorityGrid'
import MeetingSection from '@/components/MeetingSection'
import TaskList from '@/components/TaskList'
import FollowUps from '@/components/FollowUps'
import { DecisionRegister, StakeholderPulse, WinBank, DeepWorkBlock } from '@/components/RightPanel'

export default function WeeklyPage() {
  const d = weeklyData
  const p0Count = d.priorities.filter(p => p.level === 'P0' || p.level === 'P1').length

  return (
    <div className="min-h-screen dot-grid">
      <NexusHeader
        weekStart={d.meta.weekStart}
        weekEnd={d.meta.weekEnd}
        briefNumber={d.meta.briefNumber}
        p0Count={p0Count}
        meetingCount={d.meetings.length}
        followUpCount={d.followUps.length}
        taskTotal={d.tasks.length}
        taskDone={0}
        stakesCards={d.stakesCards}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] gap-4">

          {/* ── COL 1: Priorities ─────────────────────── */}
          <div className="space-y-4">
            <PriorityGrid priorities={d.priorities} />
          </div>

          {/* ── COL 2: Meetings + Tasks ───────────────── */}
          <div className="space-y-4 min-w-0">
            <MeetingSection meetings={d.meetings} />
            <TaskList tasks={d.tasks} />
          </div>

          {/* ── COL 3: Follow-ups (top) + Decisions + Stakeholders + Wins + Deep Work ── */}
          <div className="space-y-4">
            <FollowUps followUps={d.followUps} />
            <DecisionRegister decisions={d.decisions} />
            <StakeholderPulse stakeholders={d.stakeholders} />
            <WinBank wins={d.winBank} />
            <DeepWorkBlock deepWork={d.deepWork} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 flex items-center justify-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="w-4 h-4 rounded flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#4338ca,#6d28d9)' }}>
            <span className="sterling-mono text-white font-bold" style={{ fontSize: '8px' }}>N</span>
          </div>
          <p className="sterling-mono text-xs text-slate-700 tracking-widest">
            You're ready. Go lead. — Nexus
          </p>
        </div>
      </div>
    </div>
  )
}
