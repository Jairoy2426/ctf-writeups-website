# CTF Writeups Website

A production-ready Next.js web application for hosting CTF writeups, dynamically fetched from a public GitHub repository.

## Features

- 🚀 **Dynamic Content**: Fetches writeups directly from GitHub (no backend required)
- 📝 **Markdown Support**: Full GitHub-flavored Markdown with syntax highlighting
- 🎨 **Dark Theme**: Cybersecurity-focused dark UI
- 📱 **Responsive**: Works seamlessly on desktop and mobile
- 🔍 **Front-matter Support**: Extracts metadata (title, difficulty, tags, platform)
- ⚡ **Fast**: Optimized with Next.js 14 App Router and caching

## Project Structure

```
ctf-writeups/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Dashboard (platforms list)
│   ├── [platform]/
│   │   └── page.tsx            # Platform writeups list
│   └── [platform]/[writeup]/
│       └── page.tsx            # Individual writeup page
├── components/
│   ├── Navigation.tsx          # Site navigation
│   ├── PlatformCard.tsx        # Platform card component
│   ├── WriteupCard.tsx         # Writeup card component
│   ├── MarkdownRenderer.tsx    # Markdown renderer with syntax highlighting
│   ├── LoadingSpinner.tsx     # Loading state component
│   └── ErrorMessage.tsx        # Error state component
├── lib/
│   ├── github.ts               # GitHub API utilities
│   └── frontmatter.ts          # Front-matter parsing utilities
├── examples/                   # Example markdown files
└── README.md
```

## Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- A public GitHub repository with your writeups

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ctf-writeups
```

2. Install dependencies:
```bash
npm install
```

3. Configure GitHub repository (optional - defaults can be set in `lib/github.ts`):
   - Create a `.env.local` file:
```env
GITHUB_OWNER=your-username
GITHUB_REPO=ctf-writeups
GITHUB_BRANCH=main
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## GitHub Repository Structure

Your GitHub repository should be organized as follows:

```
your-repo/
├── htb/
│   ├── blue.md
│   ├── red.md
│   └── ...
├── tryhackme/
│   ├── basic-pentesting.md
│   └── ...
├── picoctf/
│   └── ...
└── ...
```

Each folder represents a platform, and each `.md` file is a writeup.

## Markdown File Format

Writeups should use front-matter for metadata:

```markdown
---
title: "HTB - Blue"
difficulty: "Easy"
tags: ["windows", "eternal-blue", "privilege-escalation"]
platform: "Hack The Box"
date: "2024-01-15"
author: "Your Name"
---

# Writeup Title

Your writeup content here...
```

### Supported Front-matter Fields

- `title`: Writeup title (optional, will extract from first H1 if not provided)
- `difficulty`: Difficulty level (e.g., "Easy", "Medium", "Hard")
- `tags`: Array of tags
- `platform`: Platform name
- `date`: Publication date
- `author`: Author name
- Any other custom fields

## Deployment

### Deploy to Vercel

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Environment Variables** (optional):
   - In Vercel project settings, add:
     - `GITHUB_OWNER`: Your GitHub username
     - `GITHUB_REPO`: Repository name
     - `GITHUB_BRANCH`: Branch name (default: `main`)

4. **Deploy**: Click "Deploy" - Vercel will build and deploy automatically

### Connect Custom Domain via Cloudflare

1. **Add Domain to Vercel**:
   - In your Vercel project, go to Settings → Domains
   - Add your custom domain (e.g., `ctf.yourdomain.com`)

2. **Configure DNS in Cloudflare**:
   - Log in to Cloudflare dashboard
   - Select your domain
   - Go to DNS → Records
   - Add a CNAME record:
     - **Name**: `ctf` (or `@` for root domain)
     - **Target**: `cname.vercel-dns.com` (or the specific Vercel domain shown)
     - **Proxy status**: Proxied (orange cloud) ✅
     - **TTL**: Auto

3. **SSL/TLS Settings**:
   - In Cloudflare, go to SSL/TLS
   - Set encryption mode to **"Full"** or **"Full (strict)"**
   - This ensures end-to-end encryption

4. **Wait for Propagation**:
   - DNS changes can take a few minutes to propagate
   - Vercel will automatically provision SSL certificates

5. **Verify**:
   - Once DNS propagates, your site should be accessible at your custom domain
   - SSL certificate will be automatically configured by Vercel

### Alternative: Root Domain Setup

If you want to use the root domain (`yourdomain.com`):

1. In Cloudflare, add an **A record** instead of CNAME:
   - **Name**: `@`
   - **Target**: Vercel's IP address (check Vercel docs for current IPs)
   - **Proxy**: Proxied ✅

2. Or use Cloudflare's **CNAME Flattening** feature for root domains

## Customization

### Styling

Edit `app/globals.css` and `tailwind.config.ts` to customize colors and styling.

### GitHub API Configuration

Modify `lib/github.ts` to change the default repository or add authentication if needed.

### Components

All components are in the `components/` directory and can be customized as needed.

## API Rate Limits

GitHub's REST API has rate limits:
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

For production use, consider:
- Using environment variables for GitHub tokens (if you want to authenticate)
- Implementing caching (already implemented with `next: { revalidate: 3600 }`)
- Using GitHub's GraphQL API for more efficient queries

## Troubleshooting

### Writeups not loading

- Verify your GitHub repository is public
- Check that the repository structure matches the expected format
- Ensure environment variables are set correctly
- Check browser console and Vercel logs for errors

### Syntax highlighting not working

- Ensure `react-syntax-highlighter` is installed
- Check that code blocks use proper language tags (e.g., ` ```bash `)

### Styling issues

- Clear browser cache
- Verify Tailwind CSS is properly configured
- Check that `globals.css` is imported in `layout.tsx`

## License

MIT License - feel free to use this project for your own CTF writeups site!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

