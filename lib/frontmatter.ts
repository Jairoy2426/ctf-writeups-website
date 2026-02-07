import matter from 'gray-matter'

export interface WriteupMetadata {
  title?: string
  difficulty?: string
  tags?: string[]
  platform?: string
  date?: string
  author?: string
  [key: string]: unknown
}

export interface ParsedWriteup {
  metadata: WriteupMetadata
  content: string
}

/**
 * Parse front-matter from markdown content
 */
export function parseFrontMatter(markdown: string): ParsedWriteup {
  const { data, content } = matter(markdown)

  return {
    metadata: {
      title: data.title || '',
      difficulty: data.difficulty || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      platform: data.platform || '',
      date: data.date || '',
      author: data.author || '',
      ...data,
    },
    content,
  }
}

/**
 * Extract title from markdown content if no front-matter title exists
 */
export function extractTitle(content: string): string {
  const lines = content.split('\n')
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.replace('# ', '').trim()
    }
  }
  return 'Untitled'
}

