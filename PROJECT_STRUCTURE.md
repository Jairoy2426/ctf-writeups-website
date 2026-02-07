# Project Structure

Complete overview of the CTF Writeups website project structure.

## Directory Tree

```
ctf-writeups/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Dashboard (homepage) - lists platforms
│   ├── globals.css               # Global styles and markdown styling
│   ├── [platform]/               # Dynamic platform route
│   │   ├── page.tsx              # Platform page - lists writeups
│   │   └── [writeup]/            # Dynamic writeup route
│   │       └── page.tsx          # Individual writeup page
│
├── components/                    # React components
│   ├── Navigation.tsx            # Site navigation bar
│   ├── PlatformCard.tsx          # Card component for platforms
│   ├── WriteupCard.tsx           # Card component for writeups
│   ├── MarkdownRenderer.tsx      # Markdown renderer with syntax highlighting
│   ├── LoadingSpinner.tsx        # Loading state component
│   └── ErrorMessage.tsx          # Error state component
│
├── lib/                          # Utility functions
│   ├── github.ts                 # GitHub API integration
│   └── frontmatter.ts            # Front-matter parsing utilities
│
├── examples/                     # Example markdown files
│   ├── htb/
│   │   └── blue.md              # Example HTB writeup
│   └── tryhackme/
│       └── basic-pentesting.md   # Example TryHackMe writeup
│
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration
├── postcss.config.js            # PostCSS configuration
├── vercel.json                  # Vercel deployment configuration
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
├── .env.example                 # Environment variables example
│
├── README.md                    # Main documentation
├── DEPLOYMENT.md                # Deployment guide
├── QUICKSTART.md                # Quick start guide
└── PROJECT_STRUCTURE.md         # This file
```

## Key Files Explained

### App Router Pages

- **`app/page.tsx`**: Homepage dashboard that displays all platforms as cards
- **`app/[platform]/page.tsx`**: Lists all writeups for a specific platform
- **`app/[platform]/[writeup]/page.tsx`**: Displays individual writeup with rendered markdown

### Components

- **`Navigation.tsx`**: Top navigation bar with site title and home link
- **`PlatformCard.tsx`**: Reusable card for displaying platform information
- **`WriteupCard.tsx`**: Reusable card for displaying writeup previews
- **`MarkdownRenderer.tsx`**: Client component that renders markdown with syntax highlighting
- **`LoadingSpinner.tsx`**: Loading indicator
- **`ErrorMessage.tsx`**: Error display with optional retry

### Libraries

- **`lib/github.ts`**: 
  - `getPlatforms()`: Fetches top-level directories from GitHub
  - `getWriteups(platform)`: Fetches markdown files in a platform folder
  - `getWriteup(platform, writeup)`: Fetches specific writeup content
  - `fetchDirectory(path)`: Generic directory fetcher
  - `fetchFileContent(path)`: Generic file content fetcher

- **`lib/frontmatter.ts`**:
  - `parseFrontMatter(markdown)`: Parses YAML front-matter from markdown
  - `extractTitle(content)`: Extracts title from first H1 if no front-matter

## Routing Structure

```
/                           → Dashboard (platforms list)
/[platform]                 → Platform page (writeups list)
/[platform]/[writeup]       → Individual writeup page
```

Examples:
- `/` → Shows HTB, TryHackMe, PicoCTF cards
- `/htb` → Shows all HTB writeups
- `/htb/blue` → Shows the "blue" writeup from HTB

## Data Flow

1. **Dashboard Load**:
   - `app/page.tsx` calls `getPlatforms()`
   - `getPlatforms()` fetches from GitHub API
   - Platforms displayed as cards

2. **Platform Page Load**:
   - `app/[platform]/page.tsx` calls `getWriteups(platform)`
   - For each writeup, fetches content and parses front-matter
   - Writeups displayed as cards with metadata

3. **Writeup Page Load**:
   - `app/[platform]/[writeup]/page.tsx` calls `getWriteup(platform, writeup)`
   - Content parsed for front-matter
   - Markdown rendered with syntax highlighting

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Defined in `tailwind.config.ts` (dark theme)
- **Markdown Styles**: Custom CSS in `app/globals.css`
- **Syntax Highlighting**: VS Code Dark Plus theme via `react-syntax-highlighter`

## Configuration

- **GitHub Repo**: Configured in `lib/github.ts` or via environment variables
- **Next.js**: Configured in `next.config.js`
- **TypeScript**: Strict mode enabled in `tsconfig.json`
- **Vercel**: Deployment config in `vercel.json`

## Dependencies

### Production
- `next`: Next.js framework
- `react` / `react-dom`: React library
- `react-markdown`: Markdown renderer
- `remark-gfm`: GitHub-flavored markdown support
- `gray-matter`: Front-matter parser
- `react-syntax-highlighter`: Code syntax highlighting

### Development
- `typescript`: TypeScript compiler
- `tailwindcss`: CSS framework
- `eslint`: Linting
- `@types/*`: TypeScript type definitions

## Environment Variables

Optional (defaults in code):
- `GITHUB_OWNER`: GitHub username/organization
- `GITHUB_REPO`: Repository name
- `GITHUB_BRANCH`: Branch name (default: `main`)

## Build & Deploy

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## GitHub Repository Structure Expected

```
your-repo/
├── htb/                    # Platform folder
│   ├── blue.md            # Writeup file
│   ├── red.md
│   └── ...
├── tryhackme/
│   ├── basic-pentesting.md
│   └── ...
└── picoctf/
    └── ...
```

## Markdown File Format

```markdown
---
title: "Writeup Title"
difficulty: "Easy"
tags: ["tag1", "tag2"]
platform: "Platform Name"
date: "2024-01-15"
author: "Author Name"
---

# Writeup Content

Your markdown content here...
```

