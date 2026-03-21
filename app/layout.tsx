// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'SkyLog ERP — Flying School Management',
  description: 'DGCA-compliant FTO management system for Indian flying schools',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-bg text-white">
        <Sidebar />
        <main className="ml-[220px] flex-1 flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
