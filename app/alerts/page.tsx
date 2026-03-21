// app/alerts/page.tsx
import { Topbar, SectionCard, AlertItem } from '@/components/ui'

const ALERTS = [
  {
    type: 'danger' as const,
    title: 'VT-SWT — C-of-A EXPIRED',
    body: 'Expired 18 Mar 2026. Aircraft AOG. Cannot be rostered until new C-of-A issued by DGCA regional office.',
    time: '2d ago',
  },
  {
    type: 'warn' as const,
    title: 'R. Mehta — FDTL Daily Limit',
    body: '6h flown today vs 7h CAR 7J3 max. Only 1 further sortie (≤1h) possible. Roster system blocking additional scheduling.',
    time: '1h ago',
  },
  {
    type: 'warn' as const,
    title: 'A. Sharma — Air Navigation Paper Overdue',
    body: '30+ days overdue. CPL progression halted per Schedule II Section J until exam cleared.',
    time: '3d ago',
  },
  {
    type: 'info' as const,
    title: 'VT-SKY — 100h Inspection Due',
    body: '8 flying hours remaining before mandatory 100h check. Schedule maintenance before 28 Mar 2026.',
    time: 'Today',
  },
  {
    type: 'warn' as const,
    title: 'A. Singh — Annual Hours Approaching Limit',
    body: '820h this year vs 1000h CAR 7J3 annual max. 180h remaining for Q2/Q3 planning.',
    time: 'Today',
  },
]

export default function AlertsPage() {
  const counts = {
    danger: ALERTS.filter(a => a.type === 'danger').length,
    warn:   ALERTS.filter(a => a.type === 'warn').length,
    info:   ALERTS.filter(a => a.type === 'info').length,
  }

  return (
    <>
      <Topbar title="Alerts" sub="Active" />
      <div className="p-6 space-y-4">
        {/* Summary row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Critical',  count: counts.danger, color: '#ff5c5c', border: 'rgba(255,92,92,.2)'  },
            { label: 'Warnings',  count: counts.warn,   color: '#f5a623', border: 'rgba(245,166,35,.2)' },
            { label: 'Info',      count: counts.info,   color: '#4f8bff', border: 'rgba(79,139,255,.2)' },
          ].map(s => (
            <div key={s.label}
              className="card p-4 relative before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:content-['']"
              style={{ '--tw-border-opacity': 1 } as React.CSSProperties}
            >
              <div style={{ borderTop: `2px solid ${s.color}`, margin: '-16px -16px 12px', borderRadius: '12px 12px 0 0' }} />
              <div className="text-[10px] uppercase tracking-widest text-[#555d78] font-mono mb-1">{s.label}</div>
              <div className="font-head text-3xl font-bold" style={{ color: s.color }}>{s.count}</div>
            </div>
          ))}
        </div>

        <SectionCard title="All Active Alerts" count={`${ALERTS.length} alerts`}>
          <div className="p-3.5 flex flex-col gap-2">
            {ALERTS.map((a, i) => (
              <AlertItem key={i} type={a.type} title={a.title} body={a.body} time={a.time} />
            ))}
          </div>
        </SectionCard>

        {/* DGCA reference */}
        <SectionCard title="Alert Thresholds — Regulatory Reference">
          <div className="p-4">
            <table className="data-table">
              <thead>
                <tr><th>Trigger</th><th>Threshold</th><th>Regulatory Source</th><th>Severity</th></tr>
              </thead>
              <tbody>
                {[
                  { trigger: 'C-of-A Expired',           threshold: 'Date passed',       source: 'Aircraft Rules 1937, Rule 49',           sev: 'Critical' },
                  { trigger: 'C-of-A Expiry < 30 days',  threshold: '< 30 days',         source: 'Aircraft Rules 1937, Rule 49',           sev: 'Warning'  },
                  { trigger: 'Instructor daily FDTL',     threshold: '≥ 6h / max 7h',     source: 'CAR-FTS 7J3',                           sev: 'Warning'  },
                  { trigger: 'Instructor weekly FDTL',    threshold: '≥ 27h / max 30h',   source: 'CAR-FTS 7J3',                           sev: 'Warning'  },
                  { trigger: 'Instructor annual FDTL',    threshold: '≥ 900h / max 1000h', source: 'CAR-FTS 7J3',                          sev: 'Warning'  },
                  { trigger: '100h Check Due',            threshold: '< 10h remaining',   source: 'CAR Part M',                            sev: 'Warning'  },
                  { trigger: 'Student exam overdue',      threshold: '> 30 days pending', source: 'Schedule II, Section J — Aircraft Rules 1937', sev: 'Warning' },
                  { trigger: 'Medical expiry < 30 days',  threshold: '< 30 days',         source: 'Aircraft Rules 1937, Rule 41',           sev: 'Warning'  },
                ].map((r, i) => (
                  <tr key={i}>
                    <td className="font-medium">{r.trigger}</td>
                    <td className="font-mono text-[11px] text-[#8b91a8]">{r.threshold}</td>
                    <td className="text-[11px] text-[#555d78] font-mono">{r.source}</td>
                    <td>
                      <span className={`badge ${r.sev === 'Critical' ? 'badge-red' : 'badge-amber'}`}>{r.sev}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </>
  )
}
