// components/ui.tsx
'use client'
import clsx from 'clsx'
import { TrafficLight, TL_COLOR, pct } from '@/lib/utils'

// ── Badge ─────────────────────────────────────────────────────
type BadgeVariant = 'green' | 'amber' | 'red' | 'blue' | 'purple' | 'gray' | 'teal'
export function Badge({ v, children }: { v: BadgeVariant; children: React.ReactNode }) {
  return <span className={`badge badge-${v}`}>{children}</span>
}

// ── Progress bar ──────────────────────────────────────────────
export function ProgBar({
  value, max, color = 'blue', showPct = true, showVal = false, height = 4,
}: {
  value: number; max: number; color?: TrafficLight | 'blue'; showPct?: boolean; showVal?: boolean; height?: number
}) {
  const p = pct(value, max)
  const fillClass = {
    green: 'prog-fill-green', amber: 'prog-fill-amber',
    red: 'prog-fill-red',     blue: 'prog-fill-blue',
  }[color]

  return (
    <div className="flex items-center gap-2">
      {showVal && (
        <span className="font-mono text-[11px] min-w-[34px]">{value}h</span>
      )}
      <div className="prog-track min-w-[50px]" style={{ height }}>
        <div className={fillClass} style={{ width: `${p}%` }} />
      </div>
      {showPct && (
        <span className="font-mono text-[10px] text-[#555d78] min-w-[28px]">{p}%</span>
      )}
    </div>
  )
}

// ── Stat card ─────────────────────────────────────────────────
export function StatCard({
  label, value, sub, accent,
}: { label: string; value: string | number; sub: string; accent: 'blue' | 'green' | 'amber' | 'purple' }) {
  const val = { blue: 'text-accent', green: 'text-sky-green', amber: 'text-sky-amber', purple: 'text-sky-purple' }[accent]
  const strip = `stat-strip-${accent}`
  return (
    <div className={clsx('card relative overflow-hidden p-4 before:content-[""]', strip)}>
      <div className="text-[10px] uppercase tracking-[1.5px] text-[#555d78] font-mono mb-1">{label}</div>
      <div className={clsx('font-head text-[26px] font-bold my-1', val)}>{value}</div>
      <div className="text-[11px] text-[#555d78]">{sub}</div>
    </div>
  )
}

// ── Section card ──────────────────────────────────────────────
export function SectionCard({
  title, count, actions, children, className,
}: {
  title: string; count?: string | number; actions?: React.ReactNode; children: React.ReactNode; className?: string
}) {
  return (
    <div className={clsx('card', className)}>
      <div className="card-head">
        <span className="font-head text-[13px] font-semibold">{title}</span>
        {count !== undefined && (
          <span className="bg-bg-3 border border-border text-[10px] text-[#555d78] px-1.5 py-0.5 rounded font-mono">
            {count}
          </span>
        )}
        {actions && <div className="ml-auto flex gap-2 items-center">{actions}</div>}
      </div>
      {children}
    </div>
  )
}

// ── Info card (detail page) ───────────────────────────────────
export function InfoCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="card p-3.5">
      <div className="text-[10px] uppercase tracking-[1.5px] text-[#555d78] font-mono mb-1.5">{label}</div>
      <div className="text-[15px] font-medium font-mono" style={color ? { color } : undefined}>{value}</div>
      {sub && <div className="text-[11px] text-[#555d78] mt-0.5 leading-relaxed">{sub}</div>}
    </div>
  )
}

// ── Detail hero ───────────────────────────────────────────────
export function DetailHero({
  init, color, name, badges, meta, actions,
}: {
  init: string; color: 'blue' | 'green' | 'amber'; name: string;
  badges: React.ReactNode; meta: string[]; actions?: React.ReactNode
}) {
  const avatarStyle = {
    blue:   { bg: 'rgba(79,139,255,.15)',  border: 'rgba(79,139,255,.3)',  text: '#4f8bff'  },
    green:  { bg: 'rgba(46,201,138,.15)',  border: 'rgba(46,201,138,.3)',  text: '#2ec98a'  },
    amber:  { bg: 'rgba(245,166,35,.15)',  border: 'rgba(245,166,35,.3)',  text: '#f5a623'  },
  }[color]

  return (
    <div className="card p-5 mb-4 flex gap-5 items-start">
      <div
        className="w-13 h-13 rounded-xl flex items-center justify-center font-head text-[18px] font-bold flex-shrink-0 border"
        style={{ background: avatarStyle.bg, borderColor: avatarStyle.border, color: avatarStyle.text, width: 52, height: 52 }}
      >
        {init}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-head text-[19px] font-bold mb-1.5">{name}</div>
        <div className="flex gap-2 flex-wrap mb-2">{badges}</div>
        <div className="font-mono text-[10px] text-[#555d78] leading-loose">
          {meta.map((m, i) => <span key={i}>{i > 0 && <> · </>}{m}</span>)}
        </div>
      </div>
      {actions && <div className="flex gap-2 flex-shrink-0">{actions}</div>}
    </div>
  )
}

// ── Topbar ────────────────────────────────────────────────────
export function Topbar({ title, sub, actions }: { title: string; sub?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center px-6 h-14 border-b border-border bg-bg-2 sticky top-0 z-40 gap-3">
      <span className="font-head text-[15px] font-semibold">
        {title}
        {sub && <small className="text-[#555d78] font-normal text-xs ml-2 font-body">{sub}</small>}
      </span>
      {actions && <div className="ml-auto flex gap-2">{actions}</div>}
    </div>
  )
}

// ── Alert item ────────────────────────────────────────────────
export function AlertItem({ type, title, body, time }: { type: 'danger' | 'warn' | 'info'; title: string; body: string; time: string }) {
  const styles = {
    danger: { wrap: 'bg-[rgba(255,92,92,.08)] border-[rgba(255,92,92,.2)]',  dot: '#ff5c5c' },
    warn:   { wrap: 'bg-[rgba(245,166,35,.08)] border-[rgba(245,166,35,.2)]', dot: '#f5a623' },
    info:   { wrap: 'bg-[rgba(79,139,255,.08)] border-[rgba(79,139,255,.2)]', dot: '#4f8bff' },
  }[type]
  return (
    <div className={clsx('flex items-start gap-2.5 p-3 rounded-lg border text-xs', styles.wrap)}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: styles.dot }} />
      <div className="flex-1 text-[#8b91a8] leading-relaxed">
        <strong className="text-white font-medium">{title}</strong>
        {body && <><br />{body}</>}
      </div>
      <span className="font-mono text-[10px] text-[#555d78] whitespace-nowrap">{time}</span>
    </div>
  )
}

// ── Maint row ─────────────────────────────────────────────────
export function MaintRow({ label, value, status }: { label: string; value: string; status: 'ok' | 'warn' | 'overdue' }) {
  const c = { ok: '#2ec98a', warn: '#f5a623', overdue: '#ff5c5c' }[status]
  return (
    <div className="flex items-start justify-between px-4 py-2.5 border-b border-border last:border-0 gap-3 text-xs">
      <span className="text-[#8b91a8] flex-1">{label}</span>
      <span className="font-mono text-[11px] text-right" style={{ color: c }}>{value}</span>
    </div>
  )
}

// ── CAR compliance panel ──────────────────────────────────────
export function CarPanel({ title, checks }: { title: string; checks: { label: string; ok: 'ok' | 'warn' | 'fail' }[] }) {
  const dot = { ok: '#2ec98a', warn: '#f5a623', fail: '#ff5c5c' }
  return (
    <div className="bg-[rgba(79,139,255,.06)] border border-[rgba(79,139,255,.2)] rounded-xl p-3 mb-3.5">
      <div className="text-[10px] text-accent font-mono tracking-widest uppercase mb-2">{title}</div>
      <div className="grid grid-cols-2 gap-1.5">
        {checks.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px] text-[#8b91a8]">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot[c.ok] }} />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Stage timeline ────────────────────────────────────────────
import { STAGES } from '@/lib/data'
export function StageTimeline({ currentStage }: { currentStage: string }) {
  const idx = STAGES.findIndex(s => s.id === currentStage)
  return (
    <div className="p-3.5 flex flex-col">
      {STAGES.map((st, i) => {
        const done = i < idx, active = i === idx
        return (
          <div key={st.id} className="flex gap-3 items-start">
            <div className="flex flex-col items-center w-4 flex-shrink-0">
              <div className={clsx(
                'w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border-2 flex-shrink-0',
                done ? 'stage-dot-done' : active ? 'stage-dot-active' : 'stage-dot-pending'
              )}>
                {done ? '✓' : i + 1}
              </div>
              {i < STAGES.length - 1 && (
                <div className={clsx('w-0.5 flex-1 min-h-[18px] my-0.5', done ? 'bg-sky-green' : 'bg-border')} />
              )}
            </div>
            <div className="flex-1 pb-3.5">
              <div className="text-xs font-medium mb-0.5" style={{
                color: active ? '#4f8bff' : done ? '#2ec98a' : '#555d78'
              }}>
                {st.name}{active ? ' — Current' : done ? ' — Complete' : ''}
              </div>
              <div className="text-[11px] text-[#555d78] leading-relaxed">{st.detail}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
