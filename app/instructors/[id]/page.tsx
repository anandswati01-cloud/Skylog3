// app/instructors/[id]/page.tsx
import { notFound } from 'next/navigation'
import { instructors } from '@/lib/data'
import { calcDayFdtl, pct, fmtH } from '@/lib/utils'
import { Topbar, Badge, InfoCard, DetailHero, SectionCard } from '@/components/ui'
import { FDTL_LIMITS } from '@/lib/data'

export default function InstructorDetail({ params }: { params: { id: string } }) {
  const i = instructors.find(x => x.id === params.id)
  if (!i) notFound()

  const day = calcDayFdtl(i.reportTime, i.todaySorties)
  const dp = pct(day.flyingH, FDTL_LIMITS.dayH)
  const wp = pct(i.fdtlW, FDTL_LIMITS.weekH)
  const mp = pct(i.fdtlM, FDTL_LIMITS.monthH)
  const yp = pct(i.fdtlY, FDTL_LIMITS.yearH)

  const barColor = (p: number) => p >= 86 ? '#ff5c5c' : p >= 66 ? '#f5a623' : '#2ec98a'

  const FdtlBar = ({ label, val, max, p, unit = 'h' }: { label: string; val: number | string; max: number; p: number; unit?: string }) => (
    <div>
      <div className="text-[10px] text-[#555d78] font-mono uppercase tracking-widest mb-1.5">{label} (max {max}{unit})</div>
      <div className="font-mono text-xl font-medium mb-2" style={{ color: barColor(p) }}>
        {typeof val === 'number' ? `${val}${unit}` : val}
      </div>
      <div className="flex items-center gap-2">
        <div className="prog-track" style={{ height: 5 }}>
          <div className="h-full rounded-full" style={{ width: `${p}%`, background: barColor(p) }} />
        </div>
        <span className="font-mono text-[10px] text-[#555d78]">{p}%</span>
      </div>
    </div>
  )

  const statusBadge: Record<string, React.ReactNode> = {
    available: <Badge v="green">Available</Badge>,
    limited:   <Badge v="amber">FDTL Limited</Badge>,
    leave:     <Badge v="gray">On Leave</Badge>,
  }

  const availColor = { available: '#2ec98a', limited: '#f5a623', leave: '#8b91a8' }[i.status] ?? '#8b91a8'

  return (
    <>
      <Topbar title={i.name} sub="Instructor Detail" actions={
        <button className="btn-primary">Edit</button>
      } />
      <div className="p-6">
        <DetailHero
          init={i.init}
          color="green"
          name={i.name}
          badges={<>
            <Badge v="blue">{i.lic}</Badge>
            {statusBadge[i.status]}
          </>}
          meta={[i.id, `Joined: ${i.joined}`, `Medical Class 1 · Exp: ${i.med}`, `FI Rating exp: ${i.fiExp}`, `Speciality: ${i.spec}`]}
        />

        <div className="grid grid-cols-3 gap-3 mb-4">
          <InfoCard label="Total Flying Hours" value={`${i.total.toLocaleString()}h`}
            sub={`Instructional: ${i.instr.toLocaleString()}h`} color="#4f8bff" />
          <InfoCard label="Availability Today" value={i.avail}
            sub="CAR 7J3 limits enforced by system" color={availColor} />
          <InfoCard label="Speciality" value={i.spec.split(',')[0]}
            sub={i.spec} />
        </div>

        {/* FDTL bars */}
        <SectionCard title="FDTL Status — CAR 7J3" count="CAR-FTS · Aircraft Rules 1937">
          <div className="grid grid-cols-2 gap-5 p-5">
            <FdtlBar label="Today"           val={fmtH(day.flyingH)} max={7}    p={dp} />
            <FdtlBar label="This Week"       val={i.fdtlW}           max={30}   p={wp} />
            <FdtlBar label="28-Day Rolling"  val={i.fdtlM}           max={100}  p={mp} />
            <FdtlBar label="Calendar Year"   val={i.fdtlY}           max={1000} p={yp} />
          </div>

          {/* Today's sorties breakdown */}
          {i.todaySorties.length > 0 && (
            <div className="border-t border-border px-5 py-3">
              <div className="text-[10px] text-[#555d78] font-mono uppercase tracking-widest mb-2">Today's Sorties</div>
              <div className="flex flex-wrap gap-2">
                {i.todaySorties.map((s, idx) => (
                  <span key={idx} className="font-mono text-[10px] bg-bg-3 border border-border rounded px-2 py-0.5">
                    {s.start} ({s.dur}h)
                  </span>
                ))}
              </div>
              <div className="text-[10px] text-[#555d78] mt-2">
                Reporting time: <span className="text-white font-mono">{i.reportTime ?? '—'}</span>
                {day.dutyH > 0 && <> · Duty period: <span className="text-white font-mono">{fmtH(day.dutyH)}</span></>}
              </div>
            </div>
          )}

          <div className="px-5 py-2.5 text-[10px] text-[#555d78] border-t border-border font-mono">
            Min 12h rest between duties · Max FDP 10h/duty · Limits: 7h day / 30h week / 100h month / 1000h year
          </div>
        </SectionCard>
      </div>
    </>
  )
}
