// app/page.tsx
import { StatCard, SectionCard, AlertItem, Topbar } from '@/components/ui'
import { Badge } from '@/components/ui'

export default function Dashboard() {
  return (
    <>
      <Topbar title="Dashboard" sub="Overview" />
      <div className="p-6 flex-1">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-3.5 mb-5">
          <StatCard label="Active Students"       value={24} sub="6 on leave · 2 exam hold" accent="blue"   />
          <StatCard label="Instructors Available" value={5}  sub="3 flying today · 1 FDTL limit" accent="green"  />
          <StatCard label="Aircraft Serviceable"  value={6}  sub="2 AOG · 1 maintenance"     accent="amber"  />
          <StatCard label="Sorties Today"         value={11} sub="4 done · 7 scheduled"       accent="purple" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Alerts */}
          <SectionCard title="Active Alerts" count="4 open" actions={
            <a href="/alerts" className="btn-sm">View all</a>
          }>
            <div className="p-3.5 flex flex-col gap-1.5">
              <AlertItem type="danger" title="VT-SWT — C-of-A EXPIRED" body="18 Mar 2026. Aircraft AOG until renewed with DGCA." time="2d ago" />
              <AlertItem type="warn"   title="R. Mehta FDTL limit" body="6h/7h daily max (CAR 7J3). 1 sortie remaining today." time="1h ago" />
              <AlertItem type="warn"   title="A. Sharma — Air Navigation overdue" body="30+ days overdue. CPL progression blocked." time="3d ago" />
              <AlertItem type="info"   title="VT-SKY — 100h check due" body="8 flying hours remaining. Schedule maintenance." time="Today" />
            </div>
          </SectionCard>

          {/* Today's sorties */}
          <SectionCard title="Today's Sorties" count="11 sorties">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th><th>Instr.</th><th>Acft</th><th>Slot</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { s: 'P. Verma',  i: 'R. Mehta', a: 'VT-SKY', t: '0700–0830', status: 'Done',      sv: 'green'  },
                  { s: 'S. Kumar',  i: 'A. Singh',  a: 'VT-ACE', t: '0900–1030', status: 'Done',      sv: 'green'  },
                  { s: 'K. Nair',   i: 'R. Mehta',  a: 'VT-SKY', t: '1100–1230', status: 'In Progress', sv: 'amber' },
                  { s: 'D. Patel',  i: 'V. Rao',    a: 'VT-FLY', t: '1400–1530', status: 'Scheduled', sv: 'purple' },
                  { s: 'M. Iyer',   i: 'A. Singh',  a: 'VT-ACE', t: '1600–1730', status: 'Scheduled', sv: 'purple' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="font-medium">{row.s}</td>
                    <td className="text-[#8b91a8]">{row.i}</td>
                    <td><Badge v="blue">{row.a}</Badge></td>
                    <td className="font-mono text-[11px] text-[#8b91a8]">{row.t}</td>
                    <td><Badge v={row.sv as any}>{row.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>

        {/* DGCA CPL requirements reference */}
        <SectionCard title="CPL Requirements Reference" count="Aircraft Rules 1937 · Schedule II, Section J">
          <div className="p-4">
            <div className="grid grid-cols-5 gap-3 mb-3">
              {[
                { label: 'Total flight time',  req: '200h', note: 'P1 + Dual' },
                { label: 'Pilot-in-Command',   req: '100h', note: 'incl. 15h recency' },
                { label: 'Cross-country P1',   req: '20h',  note: '≥300nm flight req.' },
                { label: 'Instrument time',    req: '10h',  note: 'max 5h simulator' },
                { label: 'Night P1',           req: '5h',   note: '+ 10 T/Os & ldgs' },
              ].map(r => (
                <div key={r.label} className="bg-bg-3 border border-border rounded-lg p-3">
                  <div className="text-[10px] text-[#555d78] mb-1">{r.label}</div>
                  <div className="font-mono text-base font-medium text-accent">{r.req}</div>
                  <div className="text-[10px] text-[#555d78] mt-1">{r.note}</div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-[#555d78] font-mono">
              Written exams (6 papers): Air Regulations · Air Navigation · Aviation Meteorology · Technical General · Technical Specific · Radio Telephony (RTR Licence)
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  )
}
