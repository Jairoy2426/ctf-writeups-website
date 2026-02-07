import Link from 'next/link'
import type { WriteupMetadata } from '@/lib/frontmatter'

interface WriteupCardProps {
  name: string
  platform: string
  metadata?: WriteupMetadata
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  hard: 'bg-red-500/10 text-red-400 border-red-500/20',
  insane: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  default: 'bg-dark-bg text-dark-text-muted border-dark-border',
}

export default function WriteupCard({ name, platform, metadata }: WriteupCardProps) {
  const title = metadata?.title || name.replace(/-/g, ' ').replace(/\.md$/, '')
  const difficulty = metadata?.difficulty
  const tags = metadata?.tags || []
  const date = metadata?.date
  const href = `/${platform}/${name.replace(/\.md$/, '')}`

  const difficultyClass = difficulty 
    ? difficultyColors[difficulty.toLowerCase()] || difficultyColors.default
    : difficultyColors.default

  return (
    <Link href={href} className="block">
      <article className="group relative bg-dark-surface border border-dark-border rounded-xl p-6 card-hover glow-border overflow-hidden h-full">
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with difficulty badge */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-lg font-semibold text-dark-text group-hover:text-white transition-colors leading-tight flex-1 capitalize">
              {title}
            </h3>
            {difficulty && (
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full border shrink-0 ${difficultyClass}`}>
                {difficulty}
              </span>
            )}
          </div>

          {/* Date */}
          {date && (
            <p className="text-xs text-dark-text-muted mb-3 font-mono">
              {date}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
              {tags.slice(0, 4).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs bg-dark-bg text-dark-text-muted rounded border border-dark-border font-mono"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="px-2 py-0.5 text-xs text-dark-text-muted">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Read indicator */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-dark-border text-dark-text-muted group-hover:text-white transition-colors">
            <span className="text-sm">Read writeup</span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
