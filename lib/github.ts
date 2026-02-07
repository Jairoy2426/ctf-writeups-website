/**
 * GitHub API utility functions for fetching repository content
 * No authentication required for public repositories
 */

export interface GitHubFile {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: 'file' | 'dir'
  content?: string
  encoding?: string
}

export interface GitHubRepoConfig {
  owner: string
  repo: string
  branch?: string
}

// Default repository configuration - can be overridden via environment variables
const DEFAULT_REPO: GitHubRepoConfig = {
  owner: process.env.GITHUB_OWNER || 'Jairoy2426',
  repo: process.env.GITHUB_REPO || 'ctf-writeups',
  branch: process.env.GITHUB_BRANCH || 'main',
}

/**
 * Get the base URL for GitHub API
 */
function getApiBaseUrl(): string {
  const { owner, repo, branch } = DEFAULT_REPO
  return `https://api.github.com/repos/${owner}/${repo}/contents`
}

/**
 * Get the raw content URL for a file
 */
function getRawContentUrl(path: string): string {
  const { owner, repo, branch } = DEFAULT_REPO
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
}

/**
 * Fetch directory contents from GitHub
 */
export async function fetchDirectory(path: string = ''): Promise<GitHubFile[]> {
  try {
    const url = `${getApiBaseUrl()}/${path}`
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      if (response.status === 404) {
        return []
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    // GitHub API returns a single object for files, array for directories
    return Array.isArray(data) ? data : [data]
  } catch (error) {
    console.error('Error fetching directory:', error)
    throw error
  }
}

/**
 * Fetch file content from GitHub
 */
export async function fetchFileContent(path: string): Promise<string> {
  try {
    const url = getRawContentUrl(path)
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`)
    }

    return await response.text()
  } catch (error) {
    console.error('Error fetching file content:', error)
    throw error
  }
}

/**
 * Get all top-level directories (platforms) from the repository
 */
export async function getPlatforms(): Promise<GitHubFile[]> {
  const files = await fetchDirectory()
  return files.filter((file) => file.type === 'dir')
}

/**
 * Get all markdown files in a platform directory
 */
export async function getWriteups(platform: string): Promise<GitHubFile[]> {
  const files = await fetchDirectory(platform)
  return files.filter(
    (file) => file.type === 'file' && file.name.endsWith('.md')
  )
}

/**
 * Get a specific writeup file
 */
export async function getWriteup(
  platform: string,
  writeupName: string
): Promise<string> {
  const path = `${platform}/${writeupName}.md`
  return await fetchFileContent(path)
}

