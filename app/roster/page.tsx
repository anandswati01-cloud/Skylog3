// app/roster/page.tsx
import { students, instructors, FDTL_LIMITS } from '@/lib/data'
import { calcDayFdtl, pct, fmtH } from '@/lib/utils'
import { Topbar, SectionCard, Badge } from '@/components/ui'

// ── Roster data (today = Thursday 20 Mar 2026, column index 3) ──
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const DATES = ['17', '18', '19', '20', '21', '22', '23']
const SLOTS = ['0600', '0730', '0900', '1030', '1200', '1400', '1530', '1700']

type SortieCell = { label: string; type: 'dual' | 'solo' | 'test' | 'conflict' }
type RosterData = Record<string, Record<number, SortieCell>>

const ROSTER: RosterData = {
  '0': { 0: { label: 'P.Verma/SKY',   type: 'dual'     }, 3: { label: 'D.Patel/FLY', type: 'dual'     } },
  '1': { 1: { label: 'S.Kumar/ACE',   type: 'solo'     }, 4: { label: 'M.Iyer/ACE',  type: 'dual'     } },
  '2': { 2: { label: 'K.Nair/SKY',    type: 'test'     }, 5: { label: 'P.Verma/WIN', type: 'dual'     } },
  '3': { 0: { label: 'D.Patel/FLY',   type: 'solo'     }, 3: { label: 'S.Kumar/SKY', type: 'dual'     }, 6: { label: 'FDTL Conflict', type: 'conflict' } },
  '4': { 1: { label: 'M.Iyer/ACE',    type: 'dual'     }, 4: { label: 'K.Nair/SKY',  type: 'solo'     } },
  '5': { 2: { label: 'P.Verma/WIN',   type: 'test'     } },
  '6': {},
}

const SORTIE_STYLES: Record<string, string> = {
  dual:     'sortie-block sortie-dual',
  solo:     'sortie-block sortie-solo',
  test:     'sortie-block sortie-test',
  conflict: 'sortie-block sortie-conflict',
}

export default function RosterPage() {
  // ── FDTL summary data ──────────────────────────────────────
  const instrRows = instructors.map(i => {
    const day = calcDayFdtl(i.reportTime, i.todaySorties)
    const dp = pct(day.flyingH, FDTL_LIMITS.dayH)
    const wp = pct(i.fdtlW, FDTL_LIMITS.weekH)
    const mp = pct(i.fdtlM, FDTL_LIMITS.monthH)
    const yp = pct(i.fdtlY, FDTL_LIMITS.yearH)
    return { ...i, day, dp, wp, mp, yp, role: 'Instructor' as const }
  })

  const studentRows = students
    .filter(s => s.status !== 'leave')
    .map(s => {
      const day = calcDayFdtl(s.reportTime, s.todaySorties)
      return { ...s, day, role: 'Student' as const }
    })

  const barColor = (p: number) => p >= 86 ? '#ff5c5c' : p >= 66 ? '#f5a623' : '#2ec98a'

  const MiniBar = ({ val, max, p }: { val: number | string; max: number; p: number }) => (
    <div>
      <div className="font-mono text-[12px] mb-1" style={{ color: barColor(p) }}>
        {typeof val === 'string' ? val : `${val}h`} / {max}h
      </div>
      <div className="prog-track" style={{ height: 3, minWidth: 70 }}>
        <div className="h-full rounded-full" style={{ width: `${p}%`, background: barColor(p) }} />
      </div>
    </div>
  )

  return (
    <>
      <Topbar title="Roster" sub="Sortie Scheduler" actions={
        <button className="btn-primary">+ New Sortie</button>
      } />
      <div className="p-6 space-y-5">

        {/* ── Weekly Grid ── */}
        <SectionCard
          title="Weekly Roster"
          actions={
            <div className="flex items-center gap-4">
              <div className="flex gap-3">
                {[
                  { color: '#4f8bff', label: 'Dual'  },
                  { color: '#2ec98a', label: 'Solo'  },
                  { color: '#f5a623', label: 'Test'  },
                  { color: '#ff5c5c', label: 'FDTL Conflict' },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5 text-[11px] text-[#555d78]">
                    <span className="w-2 h-2 rounded-sm inline-block" style={{ background: l.color }} />
                    {l.label}
                  </div>
                ))}
              </div>
              <button className="btn-primary">+ New Sortie</button>
            </div>
          }
        >
          <div className="p-4">
            {/* Week nav */}
            <div className="flex items-center gap-3 mb-3">
              <button className="btn-sm">‹</button>
              <span className="font-head text-[13px] font-semibold">17 – 23 Mar 2026</span>
              <button className="btn-sm">›</button>
            </div>

            {/* Grid */}
            <div className="overflow-x-auto">
              <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', minWidth: 700 }}>
                {/* Header row */}
                <div className="text-[10px] text-[#555d78] font-mono text-right pr-2 border-b border-[#2a2f40]">Time</div>
                {DAYS.map((d, i) => (
                  <div key={d} className={`text-center py-1.5 text-[10px] font-mono uppercase tracking-widest border-b border-[#2a2f40] ${DATES[i] === '20' ? 'text-accent' : 'text-[#555d78]'}`}>
                    {d}<br />
                    <span className="text-[11px]">{DATES[i]}</span>
                  </div>
                ))}

                {/* Slot rows */}
                {SLOTS.map((t, si) => (
                  <>
                    <div key={`t-${si}`} className="text-[10px] text-[#555d78] font-mono text-right pr-2 border-b border-[#2a2f40]" style={{ lineHeight: '36px', height: 36 }}>
                      {t}
                    </div>
                    {DAYS.map((_, di) => {
                      const cell = (ROSTER[String(di)] ?? {})[si]
                      return (
                        <div key={`${di}-${si}`} className="border-l border-b border-[#2a2f40] relative hover:bg-bg-3 cursor-pointer" style={{ height: 36 }}>
                          {cell && (
                            <div className={SORTIE_STYLES[cell.type]}>
                              {cell.label}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── FDTL Summary ── */}
        <SectionCard
          title="Daily FDTL & Reporting — 20 Mar 2026"
          count="Instructors + Students"
          actions={
            <div className="flex gap-4 text-[10px] text-[#555d78]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm inline-block bg-[rgba(79,139,255,.5)]" />Instructor
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm inline-block bg-[rgba(46,201,138,.5)]" />Student
              </span>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Reporting Time</th>
                  <th>Today's Sorties</th>
                  <th>Flying Hrs Today</th>
                  <th>Day FDTL <span className="text-[#555d78] font-normal">(instr max 7h)</span></th>
                  <th>Week <span className="text-[#555d78] font-normal">(instr)</span></th>
                  <th>28-Day <span className="text-[#555d78] font-normal">(instr)</span></th>
                  <th>Year <span className="text-[#555d78] font-normal">(instr)</span></th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Instructor rows */}
                {instrRows.map(i => {
                  const statusStyle = i.day.flyingH >= 7 ? 'red' : i.day.flyingH >= 5.5 ? 'amber' : i.status === 'leave' ? 'gray' : 'green'
                  const statusLabel = i.day.flyingH >= 7 ? 'At Limit' : i.day.flyingH >= 5.5 ? 'Near Limit' : i.status === 'leave' ? 'On Leave' : 'Within Limits'
                  return (
                    <tr key={i.id} style={{ borderLeft: '3px solid rgba(79,139,255,.4)' }}>
                      <td>
                        <a href={`/instructors/${i.id}`} className="block">
                          <div className="font-medium text-accent hover:underline">{i.name}</div>
                          <div className="text-[10px] text-[#555d78] font-mono">{i.id}</div>
                        </a>
                      </td>
                      <td><Badge v="blue">Instructor</Badge></td>
                      <td>
                        {i.reportTime
                          ? <><span className="font-mono text-[13px] font-medium">{i.reportTime}</span>
                              <div className="text-[10px] text-[#555d78]">{i.day.firstSortie ? `First sortie: ${i.day.firstSortie}` : 'No sorties'}</div></>
                          : <span className="text-[#555d78] text-xs">—</span>
                        }
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {i.todaySorties.length > 0
                            ? i.todaySorties.map((s, idx) => (
                                <span key={idx} className="font-mono text-[10px] bg-bg-3 border border-border rounded px-1.5 py-0.5">
                                  {s.start} ({s.dur}h)
                                </span>
                              ))
                            : <span className="text-[#555d78] text-xs">No sorties</span>
                          }
                        </div>
                      </td>
                      <td>
                        {i.day.flyingH > 0
                          ? <span className="font-mono text-[13px] font-medium">{fmtH(i.day.flyingH)}</span>
                          : <span className="text-[#555d78]">—</span>
                        }
                      </td>
                      <td><MiniBar val={fmtH(i.day.flyingH)} max={7}    p={i.dp} /></td>
                      <td><MiniBar val={i.fdtlW}              max={30}   p={i.wp} /></td>
                      <td><MiniBar val={i.fdtlM}              max={100}  p={i.mp} /></td>
                      <td><MiniBar val={i.fdtlY}              max={1000} p={i.yp} /></td>
                      <td><Badge v={statusStyle as any}>{statusLabel}</Badge></td>
                    </tr>
                  )
                })}

                {/* Student rows */}
                {studentRows.map(s => {
                  const sStatusLabel = s.status === 'exam-hold' ? 'Exam Hold' : s.status === 'ground' ? 'Ground School' : s.day.flyingH > 0 ? 'Flying' : 'Not Flying'
                  const sStatusBadge = s.status === 'exam-hold' ? 'amber' : s.status === 'ground' ? 'blue' : s.day.flyingH > 0 ? 'green' : 'gray'
                  return (
                    <tr key={s.id} style={{ borderLeft: '3px solid rgba(46,201,138,.4)' }}>
                      <td>
                        <a href={`/students/${s.id}`} className="block">
                          <div className="font-medium text-sky-green hover:underline">{s.name}</div>
                          <div className="text-[10px] text-[#555d78] font-mono">{s.id}</div>
                        </a>
                      </td>
                      <td><Badge v="green">Student</Badge><div className="text-[10px] text-[#555d78] mt-0.5">{s.lic}</div></td>
                      <td>
                        {s.reportTime
                          ? <><span className="font-mono text-[13px] font-medium">{s.reportTime}</span>
                              <div className="text-[10px] text-[#555d78]">{s.day.firstSortie ? `First sortie: ${s.day.firstSortie}` : 'Reported, no sorties'}</div></>
                          : <span className="text-[#555d78] text-xs">Not reporting</span>
                        }
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {s.todaySorties.length > 0
                            ? s.todaySorties.map((x, idx) => (
                                <span key={idx} className="font-mono text-[10px] bg-bg-3 border border-border rounded px-1.5 py-0.5">
                                  {x.start} ({x.dur}h)
                                </span>
                              ))
                            : <span className="text-[#555d78] text-xs">No sorties</span>
                          }
                        </div>
                      </td>
                      <td>
                        {s.day.flyingH > 0
                          ? <span className="font-mono text-[13px] font-medium">{fmtH(s.day.flyingH)}</span>
                          : <span className="text-[#555d78]">—</span>
                        }
                      </td>
                      <td>
                        {s.day.flyingH > 0 ? (
                          <div>
                            <div className="font-mono text-[12px] mb-1 text-sky-green">{fmtH(s.day.flyingH)}</div>
                            <div className="prog-track" style={{ height: 3, minWidth: 70 }}>
                              <div className="h-full rounded-full bg-sky-green" style={{ width: `${pct(s.day.flyingH, 8)}%` }} />
                            </div>
                          </div>
                        ) : <span className="text-[#555d78]">—</span>}
                      </td>
                      <td colSpan={3} className="text-[11px] text-[#555d78] text-center">
                        CAR 7J3 limits apply to instructors only
                      </td>
                      <td><Badge v={sStatusBadge as any}>{sStatusLabel}</Badge></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-2.5 text-[10px] text-[#555d78] border-t border-border font-mono">
            CAR-FTS 7J3 · Day FDTL = time from first sortie start to last sortie end · Instructor limits: 7h day / 30h week / 100h 28-day / 1000h year
          </div>
        </SectionCard>

      </div>
    </>
  )
}
