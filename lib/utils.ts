// lib/utils.ts
import { Student, Instructor, Sortie } from './types'
import { CPL_REQS, STAGES } from './data'

// ── Time helpers ──────────────────────────────────────────────
export function toDecimalHours(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h + m / 60
}

export function fmtH(h: number): string {
  if (h <= 0) return '0h'
  const hrs = Math.floor(h)
  const mins = Math.round((h - hrs) * 60)
  if (mins === 0) return `${hrs}h`
  return `${hrs}h ${mins}m`
}

// ── FDTL ──────────────────────────────────────────────────────
export interface DayFdtl {
  flyingH: number
  dutyH: number
  sortieCount: number
  firstSortie: string | null
  lastEnd: number | null
}

export function calcDayFdtl(
  reportTime: string | null,
  sorties: Sortie[]
): DayFdtl {
  if (!sorties || sorties.length === 0) {
    return { flyingH: 0, dutyH: 0, sortieCount: 0, firstSortie: null, lastEnd: null }
  }
  const totalFlying = sorties.reduce((s, x) => s + x.dur, 0)
  const firstStart = Math.min(...sorties.map(x => toDecimalHours(x.start)))
  const lastEnd = Math.max(...sorties.map(x => toDecimalHours(x.start) + x.dur))
  const reportH = reportTime ? toDecimalHours(reportTime) : firstStart
  const dutyH = lastEnd - reportH
  return {
    flyingH: Math.round(totalFlying * 100) / 100,
    dutyH: Math.round(dutyH * 100) / 100,
    sortieCount: sorties.length,
    firstSortie: sorties[0].start,
    lastEnd,
  }
}

// ── CPL progress ──────────────────────────────────────────────
export function cplProgress(s: Student): number {
  const checks = [
    (s.p1 + s.p2) >= CPL_REQS.totalH,
    s.p1 >= CPL_REQS.p1H,
    s.xc >= CPL_REQS.xcH,
    s.inst >= CPL_REQS.instH,
    s.night >= CPL_REQS.nightH,
    s.nOps >= CPL_REQS.nightOps,
    examsDone(s) === 6,
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export function examsDone(s: Student): number {
  return Object.values(s.exams).filter(Boolean).length
}

export function stageName(id: string): string {
  return STAGES.find(x => x.id === id)?.name ?? id
}

// ── Percentage & colour ───────────────────────────────────────
export function pct(v: number, max: number): number {
  return Math.min(100, Math.round((v / max) * 100))
}

export type TrafficLight = 'green' | 'amber' | 'red'

export function trafficLight(p: number): TrafficLight {
  if (p >= 86) return 'red'
  if (p >= 66) return 'amber'
  return 'green'
}

export const TL_COLOR: Record<TrafficLight, string> = {
  green: '#2ec98a',
  amber: '#f5a623',
  red:   '#ff5c5c',
}

export const TL_CLASS: Record<TrafficLight, string> = {
  green: 'text-sky-green',
  amber: 'text-sky-amber',
  red:   'text-sky-red',
}

// ── Status helpers ─────────────────────────────────────────────
export function studentStatusColor(s: Student['status']): string {
  return { active: '#2ec98a', leave: '#8b91a8', 'exam-hold': '#f5a623', ground: '#4f8bff' }[s] ?? '#8b91a8'
}

export function instrStatusColor(s: Instructor['status']): string {
  return { available: '#2ec98a', limited: '#f5a623', leave: '#8b91a8' }[s] ?? '#8b91a8'
}

export function acftStatusColor(status: string): string {
  return { serviceable: '#2ec98a', aog: '#ff5c5c', maintenance: '#f5a623' }[status] ?? '#8b91a8'
}

// ── Misc ──────────────────────────────────────────────────────
export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}
