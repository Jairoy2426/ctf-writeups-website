import Link from 'next/link'

interface PlatformCardProps {
  name: string
  count?: number
}

const platformIcons: Record<string, string> = {
  htb: '🎯',
  tryhackme: '🔐',
  picoctf: '🏴',
  hackthebox: '🎯',
  vulnhub: '💀',
  overthewire: '🔓',
  portswigger: '🕸️',
  default: '📁',
}

const platformDescriptions: Record<string, string> = {
  htb: 'Hack The Box challenges and machines',
  tryhackme: 'TryHackMe rooms and learning paths',
  picoctf: 'PicoCTF competition challenges',
  hackthebox: 'Hack The Box challenges and machines',
  vulnhub: 'VulnHub vulnerable VMs',
  overthewire: 'OverTheWire wargames',
  portswigger: 'Web Security Academy labs',
  default: 'CTF challenges and writeups',
}

export default function PlatformCard({ name, count }: PlatformCardProps) {
  const displayName = name.toUpperCase()
  const href = `/${name}`
  const icon = platformIcons[name.toLowerCase()] || platformIcons.default
  const description = platformDescriptions[name.toLowerCase()] || platformDescriptions.default

  return (
    <Link href={href} className="block">
      <div className="group relative bg-dark-surface border border-dark-border rounded-xl p-6 card-hover glow-border overflow-hidden">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          {/* Icon and Title */}
          <div className="flex items-start justify-between mb-4">
            <div className="text-3xl">{icon}</div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-dark-bg rounded-full border border-dark-border">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-xs text-dark-text-muted font-mono">
                {count !== undefined ? count : '—'}
              </span>
            </div>
          </div>

          {/* Platform Name */}
          <h3 className="text-xl font-bold mb-2 text-dark-text group-hover:text-white transition-colors tracking-tight">
            {displayName}
          </h3>

          {/* Description */}
          <p className="text-sm text-dark-text-muted leading-relaxed mb-4">
            {description}
          </p>

          {/* Action indicator */}
          <div className="flex items-center gap-2 text-dark-text-muted group-hover:text-white transition-colors">
            <span className="text-sm font-medium">View writeups</span>
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
      </div>
    </Link>
  )
}
