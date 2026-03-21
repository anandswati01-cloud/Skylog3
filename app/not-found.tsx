// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 p-6">
      <div className="font-mono text-[#555d78] text-sm">404</div>
      <div className="font-head text-2xl font-bold">Page not found</div>
      <Link href="/" className="btn-primary">← Back to Dashboard</Link>
    </div>
  )
}
