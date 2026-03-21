// app/students/[id]/page.tsx
import { notFound } from 'next/navigation'
import { students, EXAMS, CPL_REQS } from '@/lib/data'
import { cplProgress, examsDone, pct, calcDayFdtl } from '@/lib/utils'
import {
  Topbar, Badge, InfoCard, DetailHero, SectionCard,
  StageTimeline, MaintRow,
} from '@/components/ui'

export default function StudentDetail({ params }: { params: { id: string } }) {
  const s = students.find(x => x.id === params.id)
  if (!s) notFound()

  const cp = cplProgress(s)
  const hrs = s.p1 + s.p2
  const ec = examsDone(s)
  const day = calcDayFdtl(s.reportTime, s.todaySorties)

  const cpColor = cp >= 80 ? '#2ec98a' : cp >= 50 ? '#4f8bff' : '#f5a623'

  const statusBadge: Record<string, React.ReactNode> = {
    'active':    <Badge v="green">Active</Badge>,
    'leave':     <Badge v="gray">On Leave</Badge>,
    'exam-hold': <Badge v="amber">Exam Hold</Badge>,
    'ground':    <Badge v="blue">Ground School</Badge>,
  }

  // Hour requirements rows
  const reqs = [
    { label: 'Total flight time (P1+P2)',         req: CPL_REQS.totalH, act: hrs,    unit: 'h' },
    { label: 'Pilot-in-Command (P1)',              req: CPL_REQS.p1H,    act: s.p1,  unit: 'h' },
    { label: 'Cross-country as P1 (Sec.J(ii))',   req: CPL_REQS.xcH,    act: s.xc,  unit: 'h' },
    { label: 'Instrument time (Sec.J(iii))',       req: CPL_REQS.instH,  act: s.inst, unit: 'h' },
    { label: 'Night flight P1 (Sec.J(iv))',        req: CPL_REQS.nightH, act: s.night, unit: 'h' },
    { label: 'Night T/Os + landings as PIC',       req: CPL_REQS.nightOps, act: s.nOps, unit: ' ops' },
  ]

  return (
    <>
      <Topbar
        title={s.name}
        sub="Student Detail"
        actions={
          <div className="flex gap-2">
            <button className="btn">+ Sortie</button>
            <button className="btn-primary">Edit</button>
          </div>
        }
      />
      <div className="p-6">
        {/* Hero */}
        <DetailHero
          init={s.init}
          color="blue"
          name={s.name}
          badges={<>
            <Badge v="blue">{s.lic}</Badge>
            {statusBadge[s.status]}
            <Badge v="teal">{s.stage.toUpperCase()}</Badge>
          </>}
          meta={[s.id, `DOB: ${s.dob}`, `Enrolled: ${s.enrolled}`, `Medical Class 1 · Exp: ${s.med}`,
            ...(s.leave ? [`On leave until: ${s.leave}`] : [])
          ]}
        />

        {/* 6-card info grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <InfoCard label="Total Flight Time" value={`${hrs}h`}
            sub={`P1: ${s.p1}h · Dual (P2): ${s.p2}h`} color="#4f8bff" />
          <InfoCard label="CPL Progress (Sch.II Sec.J)" value={`${cp}%`}
            sub="Aircraft Rules 1937" color={cpColor} />
          <InfoCard label="Exams Cleared" value={`${ec} / 6`}
            sub="All 6 papers required for CPL" color={ec === 6 ? '#2ec98a' : '#f5a623'} />
          <InfoCard label="X-Country (P1)" value={`${s.xc}h`}
            sub="Min 20h · incl. 1 flight ≥300nm" color={s.xc >= 20 ? '#2ec98a' : '#f5a623'} />
          <InfoCard label="Instrument Time" value={`${s.inst}h`}
            sub="Min 10h · max 5h simulator" color={s.inst >= 10 ? '#2ec98a' : '#f5a623'} />
          <InfoCard label="Night P1 · Ops" value={`${s.night}h / ${s.nOps} ops`}
            sub="Min 5h + 10 T/Os & ldgs as PIC"
            color={s.night >= 5 && s.nOps >= 10 ? '#2ec98a' : '#f5a623'} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Hour requirements */}
          <SectionCard title="Hour Requirements" count="Aircraft Rules 1937 · Sch.II Sec.J">
            <table className="data-table">
              <thead>
                <tr><th>Requirement</th><th>Min</th><th>Actual</th><th>Progress</th></tr>
              </thead>
              <tbody>
                {reqs.map(r => {
                  const ok = r.act >= r.req
                  const p = Math.min(100, pct(r.act, r.req))
                  return (
                    <tr key={r.label}>
                      <td className="text-[#8b91a8]">{r.label}</td>
                      <td className="font-mono text-[11px] text-[#555d78]">{r.req}{r.unit}</td>
                      <td className="font-mono text-[11px]" style={{ color: ok ? '#2ec98a' : '#f5a623' }}>
                        {r.act}{r.unit}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="prog-track min-w-[60px]">
                            <div className="h-full rounded-full" style={{
                              width: `${p}%`, background: ok ? '#2ec98a' : '#f5a623',
                            }} />
                          </div>
                          <span className="font-mono text-[10px] text-[#555d78]">{p}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="px-4 py-2 text-[10px] text-[#555d78] border-t border-border font-mono">
              All hours within 5 years of application · 15h P1 recency required within last 6 months
            </div>
          </SectionCard>

          {/* Flying stage */}
          <SectionCard title="Flying Stage" count="CAR Sec.7 Ser.C Pt.I">
            <StageTimeline currentStage={s.stage} />
          </SectionCard>
        </div>

        {/* Exam cards */}
        <SectionCard title="DGCA Written Examinations" count="Sch.II Sec.J(d) + CAR 7 Ser.B Pt.IV · 6 papers">
          <div className="grid grid-cols-3 gap-2.5 p-3.5">
            {EXAMS.map(e => {
              const done = s.exams[e.key]
              const sc = s.scores[e.key as keyof typeof s.scores]
              return (
                <div key={e.key} className="bg-bg-3 border border-border rounded-lg p-3">
                  <div className="text-xs font-medium mb-1">{e.name}</div>
                  <div className="text-[10px] text-[#555d78] font-mono mb-2">{e.ref}</div>
                  <div className="flex items-center justify-between">
                    <Badge v={done ? 'green' : 'red'}>{done ? 'Passed' : 'Pending'}</Badge>
                    {sc !== undefined && (
                      <span className="font-mono text-[11px] text-[#8b91a8]">{sc}%</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </>
  )
}
