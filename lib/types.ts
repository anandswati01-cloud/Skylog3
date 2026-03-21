// lib/types.ts

export type StudentStatus = 'active' | 'leave' | 'exam-hold' | 'ground'
export type InstructorStatus = 'available' | 'limited' | 'leave'
export type AircraftStatus = 'serviceable' | 'aog' | 'maintenance'
export type FlyingStageId = 'gs' | 'ppt' | 'fs' | 'dn' | 'sn' | 'nr' | 'ir' | 'cpl'
export type SortieType = 'dual' | 'solo' | 'test' | 'instrument' | 'night' | 'conflict'

export interface Sortie {
  start: string   // "HH:MM"
  dur: number     // decimal hours
  type?: SortieType
  acft?: string
  exercise?: string
}

export interface ExamRecord {
  airReg: boolean
  airNav: boolean
  met: boolean
  techGen: boolean
  techSpec: boolean
  rtr: boolean
}

export interface ExamScores {
  airReg?: number
  airNav?: number
  met?: number
  techGen?: number
  techSpec?: number
  rtr?: number
}

export interface Student {
  id: string
  name: string
  init: string
  lic: string
  stage: FlyingStageId
  p1: number          // P1 hours
  p2: number          // Dual hours
  xc: number          // Cross-country P1
  inst: number        // Instrument hours
  night: number       // Night P1 hours
  nOps: number        // Night T/Os + landings
  fdtlW: number       // Week FDTL hours
  reportTime: string | null
  todaySorties: Sortie[]
  exams: ExamRecord
  scores: ExamScores
  med: string
  leave: string | null
  status: StudentStatus
  enrolled: string
  dob: string
}

export interface Instructor {
  id: string
  name: string
  init: string
  lic: string
  total: number
  instr: number
  fdtlW: number
  fdtlM: number
  fdtlY: number
  reportTime: string | null
  todaySorties: Sortie[]
  avail: string
  status: InstructorStatus
  med: string
  fiExp: string
  joined: string
  spec: string
}

export interface Aircraft {
  reg: string
  type: string
  year: number
  engine: string
  afHrs: number
  engOH: number
  tbo: number
  s100: number
  coaN: string
  coaE: string
  corN: string
  annual: string
  status: AircraftStatus
  base: string
  snag: string
}

export interface FlyingStage {
  id: FlyingStageId
  name: string
  detail: string
}

export interface ExamMeta {
  key: keyof ExamRecord
  name: string
  ref: string
}
