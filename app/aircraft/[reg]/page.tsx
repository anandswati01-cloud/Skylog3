// app/aircraft/[reg]/page.tsx
import { notFound } from 'next/navigation'
import { aircraft } from '@/lib/data'
import { pct } from '@/lib/utils'
import { Topbar, Badge, InfoCard, DetailHero, SectionCard, MaintRow } from '@/components/ui'

export default function AircraftDetail({ params }: { params: { reg: string } }) {
  const a = aircraft.find(x => x.reg === params.reg)
  if (!a) notFound()

  const rem100 = 100 - a.s100
  const engRem = a.tbo - a.engOH
  const engPct = pct(a.engOH, a.tbo)
  const exp = a.coaE.includes('✕')

  const statusBadge: Record<string, React.ReactNode> = {
    serviceable: <Badge v="green">Serviceable</Badge>,
    aog:         <Badge v="red">AOG</Badge>,
    maintenance: <Badge v="amber">Maintenance</Badge>,
  }

  const maintRows: { label: string; value: string; status: 'ok' | 'warn' | 'overdue' }[] = [
    {
      label: '100-Hour Inspection',
      value: `Due at ${a.afHrs - a.s100 + 100}h · ${rem100}h remaining`,
      status: rem100 < 10 ? 'overdue' : rem100 < 25 ? 'warn' : 'ok',
    },
    {
      label: 'Annual Check / C-of-A Renewal',
      value: a.annual,
      status: exp ? 'overdue' : 'ok',
    },
    {
      label: 'Engine Since Overhaul',
      value: `${a.engOH}h since OH · ${a.tbo}h TBO · ${engRem}h remaining`,
      status: engRem < 100 ? 'warn' : 'ok',
    },
    {
      label: 'Certificate of Airworthiness (C-of-A)',
      value: a.coaE,
      status: exp ? 'overdue' : 'ok',
    },
    {
      label: 'Certificate of Registration (C-of-R)',
      value: a.corN,
      status: 'ok',
    },
    {
      label: 'Current Snag / Defect',
      value: a.snag,
      status: a.snag === 'Nil' ? 'ok' : 'warn',
    },
  ]

  return (
    <>
      <Topbar title={`${a.reg} — ${a.type}`} sub="Aircraft Detail" actions={
        <button className="btn-primary">Edit</button>
      } />
      <div className="p-6">
        <DetailHero
          init={a.reg.replace('VT-', '')}
          color="amber"
          name={`${a.reg} — ${a.type}`}
          badges={<>
            {statusBadge[a.status]}
            <Badge v="gray">{a.year}</Badge>
            <Badge v="blue">{a.base}</Badge>
          </>}
          meta={[`Engine: ${a.engine}`, `C-of-A: ${a.coaN}`, `C-of-R: ${a.corN}`]}
        />

        <div className="grid grid-cols-3 gap-3 mb-4">
          <InfoCard
            label="Airframe Hours (Total)"
            value={`${a.afHrs.toLocaleString()}h`}
            sub="Total since new"
            color="#4f8bff"
          />
          <InfoCard
            label="Engine Since Overhaul"
            value={`${a.engOH.toLocaleString()}h`}
            sub={`TBO: ${a.tbo}h · ${engRem}h remaining`}
            color={engPct > 80 ? '#f5a623' : '#2ec98a'}
          />
          <InfoCard
            label="Next 100h Inspection"
            value={`${rem100}h remaining`}
            sub={`${a.s100}h since last check`}
            color={rem100 < 10 ? '#ff5c5c' : rem100 < 25 ? '#f5a623' : '#2ec98a'}
          />
        </div>

        <SectionCard title="Maintenance &amp; Airworthiness" count="CAR Part M" className="mb-4">
          {maintRows.map(r => (
            <MaintRow key={r.label} label={r.label} value={r.value} status={r.status} />
          ))}
        </SectionCard>

        {a.snag !== 'Nil' && (
          <SectionCard title="Active Snag / Defect" actions={
            exp ? <Badge v="red">AOG</Badge> : <Badge v="amber">Unserviceable</Badge>
          }>
            <div className="px-4 py-3 text-sm text-[#8b91a8] leading-relaxed">{a.snag}</div>
          </SectionCard>
        )}
      </div>
    </>
  )
}
