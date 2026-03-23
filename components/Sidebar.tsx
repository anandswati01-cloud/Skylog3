'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

type NavItem = {
  href: string
  icon: string
  label: string
  badge?: string
  badgeOk?: boolean
}

type NavSection = {
  label: string
  items: NavItem[]
}

const NAV: NavSection[] = [
  {
    label: 'Operations',
    items: [
      { href: '/',       icon: '◈', label: 'Dashboard' },
      { href: '/roster', icon: '⊞', label: 'Roster', badge: 'Today', badgeOk: true },
    ],
  },
  {
    label: 'Records',
    items: [
      { href: '/students',    icon: '◯', label: 'Students' },
      { href: '/instructors', icon: '◈', label: 'Instructors' },
      { href: '/aircraft',    icon: '△', label: 'Aircraft', badge: '2' },
    ],
  },
  {
    label: 'Compliance',
    items: [
      { href: '/alerts', icon: '◇', label: 'Alerts', badge: '4' },
    ],
  },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="w-[220px] fixed top-0 left-0 h-screen bg-bg-2 border-r border-border flex flex-col z-50 overflow-y-auto">

      <div className="px-4 py-4 border-b border-border flex items-center gap-3">
        <img src="/logo.jpg" alt="V1Rotate" width={40} height={40} className="rounded-lg" />
        <div>
          <div className="font-head text-base font-bold text-white">V1Rotate</div>
          <div className="text-[9px] text-[#555d78] tracking-[2px] uppercase font-mono">FTO Management</div>
        </div>
      </div>

      <div className="flex-1 py-2">
        {NAV.map(section => (
          <div key={section.label} className="px-3 py-2">
            <div className="text-[9px] tracking-[2px] uppercase text-[#555d78] px-2 mb-1 font-mono">
              {section.label}
            </div>
            {section.items.map(item => {
              const active = path === item.href || (item.href !== '/' && path.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] mb-0.5 border transition-all duration-150',
                    active
                      ? 'bg-[rgba(79,139,255,.12)] text-accent border-[rgba(79,139,255,.2)]'
                      : 'text-[#8b91a8] border-transparent hover:bg-bg-3 hover:text-white'
                  )}
                >
                  <span className="w-4 text-center text-sm">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={clsx(
                      'text-[9px] px-1.5 py-0.5 rounded-full font-mono',
                      item.badgeOk ? 'bg-sky-green text-bg' : 'bg-sky-red text-white'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border">
        <div className="bg-bg-3 border border-border rounded-lg p-3">
          <div className="text-[11px] font-medium">Skyward Aviation Academy</div>
          <div className="text-[10px] text-[#555d78] font-mono mt-0.5">DGCA/FTO/2019/041 · VOBR</div>
          <div className="inline-flex items-center gap-1 bg-[rgba(245,166,35,.12)] border border-[rgba(245,166,35,.3)] text-sky-amber text-[9px] px-2 py-0.5 rounded mt-1.5 font-mono tracking-wide">
            ⬡ RANK: C — Under Review
          </div>
        </div>
      </div>

    </aside>
  )
}
