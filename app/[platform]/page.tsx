import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WriteupCard from '@/components/WriteupCard'
import ErrorMessage from '@/components/ErrorMessage'
import { getWriteups, fetchFileContent, GitHubFile } from '@/lib/github'
import { parseFrontMatter, WriteupMetadata } from '@/lib/frontmatter'
import Link from 'next/link'

interface PlatformPageProps {
  params: {
    platform: string
  }
}

interface WriteupWithMetadata extends GitHubFile {
  metadata?: WriteupMetadata
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { platform } = params
  let writeups: WriteupWithMetadata[]
  let error: string | null = null

  try {
    const files = await getWriteups(platform)
    
    // Fetch metadata for each writeup
    writeups = await Promise.all(
      files.map(async (file): Promise<WriteupWithMetadata> => {
        try {
          const content = await fetchFileContent(file.path)
          const { metadata } = parseFrontMatter(content)
          return { ...file, metadata }
        } catch {
          return { ...file, metadata: undefined }
        }
      })
    )
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load writeups'
    writeups = []
  }

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Navigation />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="relative overflow-hidden border-b border-dark-border">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-dark-text-muted hover:text-white transition-colors mb-6 group"
            >
              <svg 
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="text-sm font-medium">Back to platforms</span>
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                {platform}
              </h1>
              <span className="px-3 py-1 bg-dark-surface border border-dark-border rounded-full text-sm text-dark-text-muted font-mono">
                {writeups.length} writeup{writeups.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <p className="text-dark-text-muted text-lg">
              Browse all writeups from {platform.toUpperCase()}
            </p>
          </div>
        </section>

        {/* Writeups Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error && (
            <ErrorMessage message={error} />
          )}

          {!error && writeups.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center">
                <svg className="w-8 h-8 text-dark-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No writeups yet</h3>
              <p className="text-dark-text-muted max-w-md mx-auto">
                Add .md files to the {platform} folder in your GitHub repository to see them here.
              </p>
            </div>
          )}

          {!error && writeups.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {writeups.map((writeup, index) => (
                <div key={writeup.name} className="stagger-item">
                  <WriteupCard
                    name={writeup.name}
                    platform={platform}
                    metadata={writeup.metadata}
                  />
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
