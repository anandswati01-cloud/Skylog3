# SkyLog ERP — Indian FTO Management System

A production-ready SaaS ERP for Indian Flying Training Organisations (FTOs), built with Next.js 14, TypeScript, and Tailwind CSS.

---

## Stack

| Layer       | Technology                     | Why                                               |
|-------------|-------------------------------|---------------------------------------------------|
| Framework   | **Next.js 14** (App Router)   | SSR, file-based routing, API routes built-in      |
| Language    | **TypeScript**                | Type safety across all data models                |
| Styling     | **Tailwind CSS**              | Utility-first, consistent dark theme              |
| Icons       | **Lucide React**              | Consistent aviation-adjacent iconography          |
| Database    | *(add Supabase / PlanetScale)* | See roadmap below                                |
| Auth        | *(add NextAuth.js)*           | Per-FTO login isolation                           |

---

## Quick Start

```bash
# 1. Clone / unzip this project
cd skylog

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open browser
open http://localhost:3000
```

Node.js 18+ required. No environment variables needed for the demo build.

---

## Project Structure

```
skylog/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (sidebar + fonts)
│   ├── page.tsx                # Dashboard
│   ├── globals.css             # Tailwind base + component classes
│   ├── students/
│   │   ├── page.tsx            # Students list
│   │   └── [id]/page.tsx       # Student detail (hours, exams, stage)
│   ├── instructors/
│   │   ├── page.tsx            # Instructors list
│   │   └── [id]/page.tsx       # Instructor FDTL detail
│   ├── aircraft/
│   │   ├── page.tsx            # Aircraft list
│   │   └── [reg]/page.tsx      # Aircraft maintenance detail
│   ├── roster/page.tsx         # Weekly grid + FDTL summary
│   └── alerts/page.tsx         # Active alerts + threshold reference
│
├── components/
│   ├── Sidebar.tsx             # Navigation sidebar
│   └── ui.tsx                  # Shared primitives (Badge, ProgBar, StatCard…)
│
├── lib/
│   ├── types.ts                # All TypeScript interfaces
│   ├── data.ts                 # Sample data + regulatory constants
│   └── utils.ts                # calcDayFdtl(), cplProgress(), fmtH()…
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## Regulatory Compliance Built-In

All FDTL limits and CPL hour requirements are sourced from primary Indian aviation legislation.

### CPL Hour Requirements — Aircraft Rules 1937, Schedule II, Section J (Aeroplanes)

| Requirement            | Minimum  | Notes                                              |
|------------------------|----------|----------------------------------------------------|
| Total flight time      | 200h     | Within 5 years of application date                |
| Pilot-in-Command (P1)  | 100h     | incl. 15h within 6 months preceding application   |
| Cross-country as P1    | 20h      | incl. 1 flight ≥300nm, full-stop ldgs at 2 aerodromes |
| Instrument time        | 10h      | max 5h on approved simulator                       |
| Night flight (P1)      | 5h       | incl. 10 T/Os + 10 landings as PIC                |

### Written Exams — Schedule II Sec.J(d) + CAR Section 7, Series B, Part IV

1. Air Regulations
2. Air Navigation
3. Aviation Meteorology
4. Technical General
5. Technical Specific (aircraft-type paper)
6. Radio Telephony (RTR Licence) — Sch.II Sec.J(g)

### Instructor FDTL Limits — CAR-FTS 7J3

| Period       | Limit    |
|--------------|----------|
| Daily        | 7h       |
| 7 days       | 30h      |
| 28-day rolling | 100h   |
| Calendar year | 1000h  |
| Min rest between duties | 12h |
| Max Flight Duty Period | 10h |

### FDTL Calculation Logic

Day FDTL is computed live from each person's `reportTime` and `todaySorties`:

```typescript
// lib/utils.ts
export function calcDayFdtl(reportTime: string | null, sorties: Sortie[]): DayFdtl {
  const totalFlying = sorties.reduce((s, x) => s + x.dur, 0)
  const firstStart  = Math.min(...sorties.map(x => toDecimalHours(x.start)))
  const lastEnd     = Math.max(...sorties.map(x => toDecimalHours(x.start) + x.dur))
  const reportH     = reportTime ? toDecimalHours(reportTime) : firstStart
  return {
    flyingH: totalFlying,        // used for FDTL compliance check
    dutyH:   lastEnd - reportH,  // full duty period for display
    ...
  }
}
```

---

## Roadmap — Turning This Into a SaaS

### Phase 1 — Real Data (Week 1–2)
Add a database so data persists between sessions.

```bash
npm install @supabase/supabase-js
```

Create tables: `schools`, `students`, `instructors`, `aircraft`, `sorties`, `users`

Replace `lib/data.ts` imports with Supabase queries in each page:

```typescript
// Example: app/students/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function StudentsPage() {
  const supabase = createClient()
  const { data: students } = await supabase
    .from('students')
    .select('*')
    .eq('school_id', currentSchoolId)
  // ...
}
```

### Phase 2 — Authentication (Week 2–3)
Each FTO gets its own login. Data is isolated by `school_id`.

```bash
npm install next-auth @auth/supabase-adapter
```

Add `app/login/page.tsx` with email/password or Google OAuth.
Middleware in `middleware.ts` protects all routes.

### Phase 3 — Live Sortie Scheduling (Week 3–4)
Wire up the "New Sortie" modal to:
1. Write to `sorties` table
2. Recalculate `fdtlD` in real time
3. Block scheduling if CAR 7J3 limit would be breached
4. Send WhatsApp/SMS via Twilio to instructor + student

### Phase 4 — DGCA Report Generation (Week 4–6)
Auto-generate the monthly compliance report schools need to submit:
- Student progress summary
- Instructor FDTL log
- Aircraft utilisation report
- Exportable as PDF via `@react-pdf/renderer`

### Phase 5 — Mobile App (Month 2+)
Students check their own hours, instructors log flights from their phones.
Options: React Native (Expo) sharing the same `lib/` utilities, or a PWA.

---

## Deployment

### Vercel (recommended for Next.js)
```bash
npm install -g vercel
vercel
```
Free tier covers the demo. Add a Postgres database (Vercel Postgres or Supabase) when you go live.

### Self-hosted (for schools that want on-premise)
```bash
npm run build
npm start
# runs on port 3000 — put Nginx in front
```

---

## Pricing Model (Suggested)

| Tier      | Price/month   | Schools           | Features                              |
|-----------|--------------|-------------------|---------------------------------------|
| Starter   | ₹8,000       | Up to 20 students | Core ERP: students, aircraft, roster  |
| Growth    | ₹18,000      | Up to 60 students | + FDTL enforcement, alerts, reports   |
| Pro       | ₹35,000      | Unlimited          | + Multi-base, API access, PDF reports |

Sales angle for Category C schools: *"DGCA re-ranking mid-2026. SkyLog makes compliance automatic."*

---

## License

Private / proprietary. All rights reserved.
