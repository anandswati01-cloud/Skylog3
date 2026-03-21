// app/instructors/page.tsx
import Link from 'next/link'
import { instructors } from '@/lib/data'
import { calcDayFdtl, pct, fmtH } from '@/lib/utils'
import { Topbar, SectionCard, Badge } from '@/components/ui'

export default function InstructorsPage() {
  return (
    <>
      <Topbar title="Instructors" sub="Database" actions={
        <button className="btn-primary">+ Add Instructor</button>
      } />
      <div className="p-6">
        <SectionCard title="Instructor Database" count={`${instructors.length} instructors`} actions={
          <button className="btn-primary">+ Add Instructor</button>
        }>
          <table className="data-table">
            <thead>
              <tr>
                <th>Instructor</th>
                <th>License / Rating</th>
                <th>Total Hrs</th>
                <th>FDTL Today</th>
                <th>FDTL Week</th>
                <th>Availability</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {instructors.map(i => {
                const day = calcDayFdtl(i.reportTime, i.todaySorties)
                const tp = pct(day.flyingH, 7)
                const wp = pct(i.fdtlW, 30)
                const tColor = tp >= 86 ? '#ff5c5c' : tp >= 66 ? '#f5a623' : '#2ec98a'
                const wColor = wp >= 86 ? '#ff5c5c' : wp >= 66 ? '#f5a623' : '#2ec98a'
                const statusBadge: Record<string, React.ReactNode> = {
                  available: <Badge v="green">Available</Badge>,
                  limited:   <Badge v="amber">FDTL Limited</Badge>,
                  leave:     <Badge v="gray">On Leave</Badge>,
                }
                return (
                  <tr key={i.id} className="clickable">
                    <td>
                      <Link href={`/instructors/${i.id}`} className="block">
                        <div className="font-medium hover:text-accent transition-colors">{i.name}</div>
                        <div className="text-[10px] text-[#555d78] font-mono">{i.id}</div>
                      </Link>
                    </td>
                    <td><Badge v="blue">{i.lic}</Badge></td>
                    <td>
                      <span className="font-mono">{i.total.toLocaleString()}h</span>
                      <span className="text-[#555d78] text-[11px]"> ({i.instr.toLocaleString()}h FI)</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] min-w-[34px]">{fmtH(day.flyingH)}</span>
                        <div className="prog-track min-w-[50px]">
                          <div className="h-full rounded-full" style={{ width: `${tp}%`, background: tColor }} />
                        </div>
                        <span className="font-mono text-[10px] text-[#555d78]">{tp}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] min-w-[30px]">{i.fdtlW}h</span>
                        <div className="prog-track min-w-[50px]">
                          <div className="h-full rounded-full" style={{ width: `${wp}%`, background: wColor }} />
                        </div>
                        <span className="font-mono text-[10px] text-[#555d78]">{wp}%</span>
                      </div>
                    </td>
                    <td className="text-[#8b91a8] text-xs">{i.avail}</td>
                    <td>{statusBadge[i.status]}</td>
                    <td>
                      <Link href={`/instructors/${i.id}`} className="text-accent text-[10px] font-mono hover:underline">
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
