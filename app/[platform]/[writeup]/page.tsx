import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import ErrorMessage from '@/components/ErrorMessage'
import { getWriteup } from '@/lib/github'
import { parseFrontMatter, extractTitle } from '@/lib/frontmatter'
import Link from 'next/link'

interface WriteupPageProps {
  params: {
    platform: string
    writeup: string
  }
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  hard: 'bg-red-500/10 text-red-400 border-red-500/20',
  insane: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  default: 'bg-dark-surface text-dark-text-muted border-dark-border',
}

export default async function WriteupPage({ params }: WriteupPageProps) {
  const { platform, writeup } = params
  let content: string | null = null
  let metadata
  let error: string | null = null

  try {
    const markdown = await getWriteup(platform, writeup)
    const parsed = parseFrontMatter(markdown)
    content = parsed.content
    metadata = parsed.metadata
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load writeup'
  }

  const title = metadata?.title || extractTitle(content || '') || writeup.replace(/-/g, ' ')
  const difficultyClass = metadata?.difficulty 
    ? difficultyColors[metadata.difficulty.toLowerCase()] || difficultyColors.default
    : null

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Navigation />
      
      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden border-b border-dark-border">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Link
              href={`/${platform}`}
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
              <span className="text-sm font-medium">Back to {platform.toUpperCase()}</span>
            </Link>

            {!error && (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 capitalize">
                  {title}
                </h1>
                
                {/* Metadata */}
                {metadata && (
                  <div className="flex flex-wrap items-center gap-4">
                    {metadata.difficulty && difficultyClass && (
                      <span className={`px-3 py-1.5 text-sm font-medium rounded-full border ${difficultyClass}`}>
                        {metadata.difficulty}
                      </span>
                    )}
                    {metadata.platform && (
                      <span className="px-3 py-1.5 text-sm bg-dark-surface border border-dark-border rounded-full text-dark-text-muted">
                        {metadata.platform}
                      </span>
                    )}
                    {metadata.date && (
                      <span className="text-sm text-dark-text-muted font-mono">
                        {metadata.date}
                      </span>
                    )}
                    {metadata.author && (
                      <span className="text-sm text-dark-text-muted">
                        by {metadata.author}
                      </span>
                    )}
                  </div>
                )}

                {/* Tags */}
                {metadata?.tags && metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {metadata.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 text-xs bg-dark-surface border border-dark-border text-dark-text-muted rounded font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error && (
            <ErrorMessage message={error} />
          )}

          {!error && content && (
            <article className="bg-dark-surface border border-dark-border rounded-xl p-6 md:p-10">
              <div className="prose prose-invert max-w-none">
                <MarkdownRenderer content={content} />
              </div>
            </article>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
