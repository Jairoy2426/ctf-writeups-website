import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'CTF Writeups',
  description: 'A collection of CTF writeups and walkthroughs for educational purposes',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-dark-text min-h-screen flex flex-col">
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
