import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sterling — Chief of Staff',
  description: 'Your AI Chief of Staff at Zillow Group',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen" style={{ background: '#07070f' }}>
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
