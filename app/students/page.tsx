// app/students/page.tsx
import Link from 'next/link'
import { students } from '@/lib/data'
import { cplProgress, examsDone, calcDayFdtl, pct, stageName, fmtH } from '@/lib/utils'
import { Topbar, SectionCard, Badge } from '@/components/ui'

export default function StudentsPage() {
  return (
    <>
      <Topbar title="Students" sub="Database" actions={
        <button className="btn-primary">+ Add Student</button>
      } />
      <div className="p-6">
        <SectionCard title="Student Database" count={`${students.length} students`} actions={
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 bg-bg-3 border border-border rounded-lg px-3 py-1.5 text-xs text-[#555d78]">
              ⌕ <span>Search students...</span>
            </div>
            <button className="btn-primary">+ Add Student</button>
          </div>
        }>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>License · Stage</th>
                <th>Total Hrs (P1)</th>
                <th>CPL Progress</th>
                <th>Exams (6 papers)</th>
                <th>Flying Today</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const cp = cplProgress(s)
                const p1p = pct(s.p1, 100)
                const ec = examsDone(s)
                const day = calcDayFdtl(s.reportTime, s.todaySorties)
                const statusBadge: Record<string, React.ReactNode> = {
                  'active':     <Badge v="green">Active</Badge>,
                  'leave':      <Badge v="gray">On Leave</Badge>,
                  'exam-hold':  <Badge v="amber">Exam Hold</Badge>,
                  'ground':     <Badge v="blue">Ground School</Badge>,
                }
                const cpColor = cp >= 80 ? '#2ec98a' : cp >= 50 ? '#4f8bff' : '#f5a623'
                const p1Color = p1p >= 86 ? '#ff5c5c' : p1p >= 66 ? '#f5a623' : '#4f8bff'
                return (
                  <tr key={s.id} className="clickable">
                    <td>
                      <Link href={`/students/${s.id}`} className="block">
                        <div className="font-medium hover:text-accent transition-colors">{s.name}</div>
                        <div className="text-[10px] text-[#555d78] font-mono">{s.id}</div>
                      </Link>
                    </td>
                    <td>
                      <Badge v="blue">{s.lic}</Badge>
                      <div className="text-[10px] text-[#555d78] mt-1">{stageName(s.stage)}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] min-w-[32px]">{s.p1}h</span>
                        <div className="prog-track min-w-[50px]">
                          <div className="h-full rounded-full" style={{ width: `${p1p}%`, background: p1Color }} />
                        </div>
                        <span className="font-mono text-[10px] text-[#555d78]">{p1p}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="prog-track min-w-[60px]">
                          <div className="h-full rounded-full" style={{ width: `${cp}%`, background: cpColor }} />
                        </div>
                        <span className="font-mono text-[10px] text-[#555d78]">{cp}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] min-w-[26px]">{ec}/6</span>
                        <div className="prog-track min-w-[50px]">
                          <div className="h-full rounded-full" style={{
                            width: `${Math.round(ec / 6 * 100)}%`,
                            background: ec === 6 ? '#2ec98a' : ec >= 3 ? '#4f8bff' : '#f5a623',
                          }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-[12px]">{day.flyingH > 0 ? fmtH(day.flyingH) : '—'}</span>
                      {day.sortieCount > 0 && (
                        <div className="text-[10px] text-[#555d78]">{day.sortieCount} sortie{day.sortieCount > 1 ? 's' : ''}</div>
                      )}
                    </td>
                    <td>{statusBadge[s.status]}</td>
                    <td>
                      <Link href={`/students/${s.id}`} className="text-accent text-[10px] font-mono opacity-0 group-hover:opacity-100 hover:underline">
                        View →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </SectionCard>
      </div>
    </>
  )
}
