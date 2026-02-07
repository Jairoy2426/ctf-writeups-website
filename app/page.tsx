/**
 * ============================================================================
 * CTF Writeups - Dashboard Page
 * ============================================================================
 * 
 * @author Hercules (Jairoy2426)
 * @license MIT
 * @copyright 2026 Hercules
 * 
 * Made by Hercules
 * ============================================================================
 */

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PlatformCard from '@/components/PlatformCard'
import ErrorMessage from '@/components/ErrorMessage'
import { getPlatforms } from '@/lib/github'

export default async function HomePage() {
  let platforms: Awaited<ReturnType<typeof getPlatforms>>
  let error: string | null = null

  try {
    platforms = await getPlatforms()
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load platforms'
    platforms = []
  }

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-dark-surface border border-dark-border rounded-full mb-6">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-xs text-dark-text-muted font-mono">Educational CTF Resources</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="text-white">CTF</span>
                <span className="text-dark-text-muted"> Writeups</span>
              </h1>
              
              <p className="text-lg md:text-xl text-dark-text-muted leading-relaxed max-w-2xl">
                A curated collection of Capture The Flag writeups and walkthroughs. 
                Learn offensive security techniques through detailed explanations and step-by-step guides.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-10 pt-10 border-t border-dark-border">
                <div>
                  <p className="text-3xl font-bold text-white">{platforms.length}</p>
                  <p className="text-sm text-dark-text-muted">Platforms</p>
                </div>
                <div className="w-px h-12 bg-dark-border" />
                <div>
                  <p className="text-3xl font-bold text-white">∞</p>
                  <p className="text-sm text-dark-text-muted">Learning</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Platforms</h2>
              <p className="text-dark-text-muted">Select a platform to browse writeups</p>
            </div>
          </div>

          {error && (
            <ErrorMessage message={error} />
          )}

          {!error && platforms.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center">
                <svg className="w-8 h-8 text-dark-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No platforms yet</h3>
              <p className="text-dark-text-muted max-w-md mx-auto">
                Add folders to your GitHub repository to create platform sections. Each folder will appear as a card here.
              </p>
            </div>
          )}

          {!error && platforms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform, index) => (
                <div key={platform.name} className="stagger-item">
                  <PlatformCard name={platform.name} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
