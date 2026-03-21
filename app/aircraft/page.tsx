// app/aircraft/page.tsx
import Link from 'next/link'
import { aircraft } from '@/lib/data'
import { pct } from '@/lib/utils'
import { Topbar, SectionCard, Badge } from '@/components/ui'

export default function AircraftPage() {
  return (
    <>
      <Topbar title="Aircraft" sub="Fleet Status" actions={
        <button className="btn-primary">+ Add Aircraft</button>
      } />
      <div className="p-6">
        <SectionCard title="Aircraft Database" count={`${aircraft.length} aircraft`} actions={
          <button className="btn-primary">+ Add Aircraft</button>
        }>
          <table className="data-table">
            <thead>
              <tr>
                <th>Registration</th>
                <th>Type · Year</th>
                <th>Airframe Hrs</th>
                <th>Next 100h Check</th>
                <th>C-of-A Expiry</th>
                <th>Annual Check</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {aircraft.map(a => {
                const rem = 100 - a.s100
                const p100 = pct(a.s100, 100)
                const exp = a.coaE.includes('✕')
                const remColor = rem < 10 ? '#ff5c5c' : rem < 25 ? '#f5a623' : '#2ec98a'
                const statusBadge: Record<string, React.ReactNode> = {
                  serviceable: <Badge v="green">Serviceable</Badge>,
                  aog:         <Badge v="red">AOG</Badge>,
                  maintenance: <Badge v="amber">Maintenance</Badge>,
                }
                return (
                  <tr key={a.reg} className="clickable">
                    <td>
                      <Link href={`/aircraft/${a.reg}`} className="block">
                        <span className="font-mono font-semibold text-accent hover:underline">{a.reg}</span>
                      </Link>
                    </td>
                    <td>
                      {a.type}
                      <div className="text-[10px] text-[#555d78]">{a.year}</div>
                    </td>
                    <td className="font-mono">{a.afHrs.toLocaleString()}h</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="prog-track min-w-[60px]">
                          <div className="h-full rounded-full" style={{ width: `${p100}%`, background: remColor }} />
                        </div>
                        <span className="font-mono text-[10px]" style={{ color: remColor }}>{rem}h left</span>
                      </div>
                    </td>
                    <td className="text-xs" style={{ color: exp ? '#ff5c5c' : '#8b91a8' }}>{a.coaE}</td>
                    <td className="text-xs text-[#8b91a8]">{a.annual}</td>
                    <td>{statusBadge[a.status]}</td>
                    <td>
                      <Link href={`/aircraft/${a.reg}`} className="text-accent text-[10px] font-mono hover:underline">
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
