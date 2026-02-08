/**
 * ============================================================================
 * CTF Writeups Website
 * ============================================================================
 * 
 * @author Hercules (Jairoy2426)
 * @license MIT
 * @copyright 2026 Hercules
 * 
 * Made by Hercules
 * GitHub: https://github.com/Jairoy2426
 * 
 * This project is licensed under the MIT License.
 * See the LICENSE file for details.
 * ============================================================================
 */

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'CTF Writeups | Hercules',
  description: 'A collection of CTF writeups and walkthroughs for educational purposes',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
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
