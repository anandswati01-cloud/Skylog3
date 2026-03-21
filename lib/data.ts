// lib/data.ts
import { Student, Instructor, Aircraft, FlyingStage, ExamMeta } from './types'

export const EXAMS: ExamMeta[] = [
  { key: 'airReg',   name: 'Air Regulations',      ref: 'Sch.II Sec.J(d)' },
  { key: 'airNav',   name: 'Air Navigation',        ref: 'CAR 7 Ser.B Pt.IV' },
  { key: 'met',      name: 'Aviation Meteorology',  ref: 'CAR 7 Ser.B Pt.IV' },
  { key: 'techGen',  name: 'Technical General',     ref: 'CAR 7 Ser.B Pt.IV' },
  { key: 'techSpec', name: 'Technical Specific',    ref: 'CAR 7 Ser.B Pt.IV' },
  { key: 'rtr',      name: 'Radio Telephony (RTR)', ref: 'Sch.II Sec.J(g)' },
]

export const STAGES: FlyingStage[] = [
  { id: 'gs',  name: 'Ground School',    detail: 'Aircraft systems, air law, meteorology, navigation theory' },
  { id: 'ppt', name: 'Pre-Solo Dual',    detail: 'Ex.1–12 (CAR 7 Ser.C Pt.I): controls, S&L, turns, stalling, circuits — with FI' },
  { id: 'fs',  name: 'First Solo',       detail: 'SPL exercised. Solo circuits at home aerodrome under FI ground supervision' },
  { id: 'dn',  name: 'Dual Navigation',  detail: 'Ex.17–18: dual cross-country. FI signs off nav competency before solo nav authorised' },
  { id: 'sn',  name: 'Solo Navigation',  detail: 'Solo x-country. Must include ≥300nm flight with full-stop ldgs at 2 aerodromes (Sch.II Sec.J(ii))' },
  { id: 'nr',  name: 'Night Rating',     detail: 'Min 5h night P1 + 10 T/Os & 10 landings as PIC (Sch.II Sec.J(iv)). Prior dual night required' },
  { id: 'ir',  name: 'Instrument (IF)',  detail: 'Min 10h instrument time; max 5h on approved simulator (Sch.II Sec.J(iii)). IRI required' },
  { id: 'cpl', name: 'CPL Skill Test',   detail: 'Sch.II Sec.J(h): GFT day + night + X-country day ≥250nm + X-country night ≥120nm with DE' },
]

export const FDTL_LIMITS = {
  dayH: 7,
  weekH: 30,
  monthH: 100,
  yearH: 1000,
  minRest: 12,
  maxFDP: 10,
}

export const CPL_REQS = {
  totalH: 200,
  p1H: 100,
  xcH: 20,
  instH: 10,
  nightH: 5,
  nightOps: 10,
  recentP1: 15,
}

export const students: Student[] = [
  {
    id: 'SKY-24-001', name: 'P. Verma',   init: 'PV', lic: 'PPL', stage: 'sn',
    p1: 142, p2: 36, xc: 32, inst: 4,  night: 2, nOps: 8,  fdtlW: 8,
    reportTime: '0640', todaySorties: [{ start: '0700', dur: 1.5 }, { start: '1550', dur: 1.5 }],
    exams: { airReg: true, airNav: true,  met: true,  techGen: true,  techSpec: false, rtr: false },
    scores: { airReg: 72, airNav: 68, met: 75, techGen: 71 },
    med: '12 Aug 2026', leave: null, status: 'active', enrolled: '12 Jan 2024', dob: '04 Mar 2001',
  },
  {
    id: 'SKY-24-002', name: 'S. Kumar',  init: 'SK', lic: 'SPL', stage: 'ppt',
    p1: 89,  p2: 42, xc: 12, inst: 2,  night: 0, nOps: 0,  fdtlW: 9,
    reportTime: '0850', todaySorties: [{ start: '0900', dur: 1.5 }],
    exams: { airReg: true, airNav: false, met: true,  techGen: false, techSpec: false, rtr: false },
    scores: { airReg: 78, met: 81 },
    med: '30 Nov 2026', leave: null, status: 'active', enrolled: '08 Mar 2024', dob: '22 Jul 2002',
  },
  {
    id: 'SKY-23-018', name: 'K. Nair',   init: 'KN', lic: 'PPL', stage: 'ir',
    p1: 188, p2: 28, xc: 48, inst: 8,  night: 5, nOps: 14, fdtlW: 7,
    reportTime: '1045', todaySorties: [{ start: '1100', dur: 1.5 }],
    exams: { airReg: true, airNav: true,  met: true,  techGen: true,  techSpec: true,  rtr: true },
    scores: { airReg: 81, airNav: 79, met: 86, techGen: 74, techSpec: 77, rtr: 82 },
    med: '15 Jun 2026', leave: null, status: 'active', enrolled: '20 Jun 2023', dob: '11 Nov 2000',
  },
  {
    id: 'SKY-25-003', name: 'D. Patel',  init: 'DP', lic: 'SPL', stage: 'gs',
    p1: 55,  p2: 22, xc: 0,  inst: 0,  night: 0, nOps: 0,  fdtlW: 4,
    reportTime: '1330', todaySorties: [{ start: '1400', dur: 1.5 }],
    exams: { airReg: false, airNav: false, met: false, techGen: false, techSpec: false, rtr: false },
    scores: {},
    med: '18 Mar 2027', leave: null, status: 'active', enrolled: '05 Jan 2025', dob: '30 Sep 2003',
  },
  {
    id: 'SKY-24-007', name: 'M. Iyer',   init: 'MI', lic: 'PPL', stage: 'dn',
    p1: 110, p2: 38, xc: 18, inst: 3,  night: 0, nOps: 0,  fdtlW: 8,
    reportTime: '1530', todaySorties: [{ start: '1600', dur: 1.5 }],
    exams: { airReg: true, airNav: true,  met: true,  techGen: false, techSpec: false, rtr: false },
    scores: { airReg: 69, airNav: 73, met: 70 },
    med: '04 Oct 2026', leave: null, status: 'active', enrolled: '15 Apr 2024', dob: '17 Jun 2001',
  },
  {
    id: 'SKY-23-015', name: 'A. Sharma', init: 'AS', lic: 'PPL', stage: 'sn',
    p1: 155, p2: 32, xc: 38, inst: 6,  night: 3, nOps: 6,  fdtlW: 0,
    reportTime: null, todaySorties: [],
    exams: { airReg: true, airNav: false, met: true,  techGen: true,  techSpec: false, rtr: false },
    scores: { airReg: 75, met: 72, techGen: 68 },
    med: '22 Jan 2027', leave: null, status: 'exam-hold', enrolled: '10 Aug 2023', dob: '28 Feb 2000',
  },
  {
    id: 'SKY-24-009', name: 'R. Joshi',  init: 'RJ', lic: 'SPL', stage: 'ppt',
    p1: 35,  p2: 18, xc: 0,  inst: 0,  night: 0, nOps: 0,  fdtlW: 0,
    reportTime: null, todaySorties: [],
    exams: { airReg: true, airNav: false, met: false, techGen: false, techSpec: false, rtr: false },
    scores: { airReg: 71 },
    med: '05 May 2026', leave: '28 Mar 2026', status: 'leave', enrolled: '02 Sep 2024', dob: '14 Apr 2003',
  },
  {
    id: 'SKY-25-001', name: 'T. Pillai', init: 'TP', lic: 'SPL', stage: 'gs',
    p1: 8,   p2: 4,  xc: 0,  inst: 0,  night: 0, nOps: 0,  fdtlW: 2,
    reportTime: '0830', todaySorties: [],
    exams: { airReg: false, airNav: false, met: false, techGen: false, techSpec: false, rtr: false },
    scores: {},
    med: '30 Aug 2026', leave: null, status: 'ground', enrolled: '10 Feb 2025', dob: '07 Dec 2004',
  },
]

export const instructors: Instructor[] = [
  {
    id: 'SKY-I-001', name: 'R. Mehta',   init: 'RM', lic: 'CPL/FI(A)',
    total: 4200, instr: 1800, fdtlW: 22, fdtlM: 68,  fdtlY: 412,
    reportTime: '0630', todaySorties: [
      { start: '0700', dur: 1.5 }, { start: '1100', dur: 1.5 },
      { start: '1330', dur: 1.5 }, { start: '1545', dur: 1.5 },
    ],
    avail: 'PM Only', status: 'limited',
    med: '14 Jul 2026', fiExp: '30 Sep 2026', joined: '12 Mar 2020',
    spec: 'Circuits, Navigation, Night rating',
  },
  {
    id: 'SKY-I-002', name: 'A. Singh',   init: 'AS', lic: 'CPL/FI(A)/IRI',
    total: 6800, instr: 3200, fdtlW: 18, fdtlM: 72,  fdtlY: 820,
    reportTime: '0845', todaySorties: [
      { start: '0900', dur: 1.5 }, { start: '1600', dur: 1.5 }, { start: '1730', dur: 1.5 },
    ],
    avail: 'Full Day', status: 'available',
    med: '20 Nov 2026', fiExp: '15 Jan 2027', joined: '08 Jun 2018',
    spec: 'Instrument rating, Multi-engine',
  },
  {
    id: 'SKY-I-003', name: 'V. Rao',     init: 'VR', lic: 'CPL/FI(A)',
    total: 3100, instr: 900,  fdtlW: 14, fdtlM: 55,  fdtlY: 380,
    reportTime: '1330', todaySorties: [{ start: '1400', dur: 1.5 }, { start: '1545', dur: 0.5 }],
    avail: 'Full Day', status: 'available',
    med: '02 Apr 2027', fiExp: '18 Jun 2026', joined: '01 Feb 2022',
    spec: 'PPL phase, pre-solo students',
  },
  {
    id: 'SKY-I-004', name: 'S. Kapoor',  init: 'SK', lic: 'ATPL/FI(A)/IRI',
    total: 9200, instr: 2100, fdtlW: 10, fdtlM: 41,  fdtlY: 295,
    reportTime: '0700', todaySorties: [],
    avail: 'AM Only', status: 'available',
    med: '08 Jan 2027', fiExp: '22 Mar 2027', joined: '15 Sep 2019',
    spec: 'Instrument, CRM, multi-engine',
  },
  {
    id: 'SKY-I-005', name: 'P. Nambiar', init: 'PN', lic: 'CPL/FI(A)',
    total: 2800, instr: 600,  fdtlW: 0,  fdtlM: 0,   fdtlY: 180,
    reportTime: null, todaySorties: [],
    avail: 'On Leave', status: 'leave',
    med: '17 Dec 2026', fiExp: '04 Aug 2026', joined: '20 Apr 2023',
    spec: 'Circuits, first solo, PPL phase',
  },
]

export const aircraft: Aircraft[] = [
  { reg: 'VT-SKY', type: 'Cessna 172S',      year: 2019, engine: 'Lycoming IO-360-L2A', afHrs: 1842, engOH: 842,  tbo: 2000, s100: 92, coaN: 'CofA/2019/0841', coaE: '12 Aug 2026', corN: 'CofR/2019/VT-SKY', annual: '12 Aug 2026', status: 'serviceable', base: 'VOBR—Belagavi', snag: 'Nil' },
  { reg: 'VT-ACE', type: 'Cessna 172S',      year: 2020, engine: 'Lycoming IO-360-L2A', afHrs: 1210, engOH: 210,  tbo: 2000, s100: 10, coaN: 'CofA/2020/0312', coaE: '04 Nov 2026', corN: 'CofR/2020/VT-ACE', annual: '04 Nov 2026', status: 'serviceable', base: 'VOBR—Belagavi', snag: 'Nil' },
  { reg: 'VT-FLY', type: 'Piper PA-28-161',  year: 2018, engine: 'Lycoming O-320-D3G',  afHrs: 2340, engOH: 1340, tbo: 2000, s100: 40, coaN: 'CofA/2018/1122', coaE: '30 Jun 2026', corN: 'CofR/2018/VT-FLY', annual: '30 Jun 2026', status: 'serviceable', base: 'VOBR—Belagavi', snag: 'Nil' },
  { reg: 'VT-WIN', type: 'Cessna 172R',      year: 2016, engine: 'Lycoming IO-360-L2A', afHrs: 3102, engOH: 102,  tbo: 2000, s100: 2,  coaN: 'CofA/2016/0756', coaE: '15 Sep 2026', corN: 'CofR/2016/VT-WIN', annual: '15 Sep 2026', status: 'serviceable', base: 'VOBR—Belagavi', snag: 'Nil' },
  { reg: 'VT-ACR', type: 'Cessna 152',       year: 2015, engine: 'Lycoming O-235-L2C',  afHrs: 4210, engOH: 410,  tbo: 2400, s100: 10, coaN: 'CofA/2015/0423', coaE: '22 Jul 2026', corN: 'CofR/2015/VT-ACR', annual: '22 Jul 2026', status: 'serviceable', base: 'VOBR—Belagavi', snag: 'Nil' },
  { reg: 'VT-JET', type: 'Diamond DA40 NG',  year: 2021, engine: 'Continental CD-135',  afHrs: 680,  engOH: 680,  tbo: 2100, s100: 80, coaN: 'CofA/2021/1501', coaE: '01 Dec 2026', corN: 'CofR/2021/VT-JET', annual: '01 Dec 2026', status: 'serviceable', base: 'VOBR—Belagavi', snag: 'Nil' },
  { reg: 'VT-SWT', type: 'Cessna 172S',      year: 2017, engine: 'Lycoming IO-360-L2A', afHrs: 2890, engOH: 890,  tbo: 2000, s100: 90, coaN: 'CofA/2017/0924', coaE: '18 Mar 2026 ✕', corN: 'CofR/2017/VT-SWT', annual: '18 Mar 2026', status: 'aog',        base: 'VOBR—Belagavi', snag: 'C-of-A expired 18 Mar 2026. Contact DGCA regional office for renewal. Aircraft AOG.' },
  { reg: 'VT-BRD', type: 'Beechcraft A23',   year: 2014, engine: 'Lycoming IO-360-A1B6',afHrs: 5100, engOH: 300,  tbo: 2000, s100: 0,  coaN: 'CofA/2014/0187', coaE: '08 May 2026', corN: 'CofR/2014/VT-BRD', annual: '22 Mar 2026', status: 'maintenance', base: 'VOBR—Belagavi', snag: 'Scheduled 100h inspection 22 Mar 2026. Est. return 24 Mar 2026.' },
]
