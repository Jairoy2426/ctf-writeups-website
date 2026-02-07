# Quick Start Guide

Get your CTF Writeups website up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure GitHub Repository

Edit `lib/github.ts` and update the `DEFAULT_REPO` object, or create a `.env.local` file:

```env
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main
```

## 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## 4. Prepare Your GitHub Repository

Your repository should have this structure:

```
your-repo/
├── htb/
│   └── blue.md
├── tryhackme/
│   └── basic-pentesting.md
└── ...
```

## 5. Example Writeup Format

Create a markdown file with front-matter:

```markdown
---
title: "HTB - Blue"
difficulty: "Easy"
tags: ["windows", "eternal-blue"]
platform: "Hack The Box"
---

# Your Writeup Title

Content here...
```

## 6. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Troubleshooting

**Writeups not showing?**
- Make sure your GitHub repo is **public**
- Check the repository structure matches the expected format
- Verify environment variables are set correctly

**Syntax highlighting not working?**
- Ensure code blocks use language tags: ` ```bash `, ` ```python `, etc.

**Styling looks off?**
- Run `npm install` to ensure all dependencies are installed
- Clear browser cache

## Next Steps

- Customize colors in `tailwind.config.ts`
- Add your own writeups to the GitHub repository
- Connect a custom domain (see [DEPLOYMENT.md](./DEPLOYMENT.md))

