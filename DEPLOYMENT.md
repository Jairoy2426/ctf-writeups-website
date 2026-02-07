# Deployment Guide

This guide covers deploying the CTF Writeups website to Vercel and connecting a custom domain via Cloudflare.

## Prerequisites

- GitHub account with your writeups repository
- Vercel account (free tier works)
- Cloudflare account (free tier works)
- Custom domain (optional but recommended)

## Step 1: Prepare Your Repository

1. Ensure your writeups are organized in the GitHub repository:
   ```
   your-repo/
   ├── htb/
   │   └── blue.md
   ├── tryhackme/
   │   └── basic-pentesting.md
   └── ...
   ```

2. Make sure your repository is **public** (required for unauthenticated API access)

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Configure environment variables (optional):
   - `GITHUB_OWNER`: Your GitHub username
   - `GITHUB_REPO`: Repository name
   - `GITHUB_BRANCH`: Branch name (default: `main`)
6. Click **"Deploy"**
7. Wait for deployment to complete (usually 1-2 minutes)

### Option B: Via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project

## Step 3: Connect Custom Domain via Cloudflare

### 3.1 Add Domain to Vercel

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Enter your custom domain (e.g., `ctf.yourdomain.com` or `yourdomain.com`)
3. Click **"Add"**
4. Vercel will show you the DNS records needed

### 3.2 Configure DNS in Cloudflare

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain
3. Go to **DNS** → **Records**

#### For Subdomain (Recommended)

Add a **CNAME** record:
- **Type**: CNAME
- **Name**: `ctf` (or your subdomain)
- **Target**: `cname.vercel-dns.com` (or the specific domain Vercel provides)
- **Proxy status**: ✅ **Proxied** (orange cloud)
- **TTL**: Auto

#### For Root Domain

You have two options:

**Option 1: CNAME Flattening (Easiest)**
- Cloudflare automatically handles CNAME at root
- Add CNAME record:
  - **Type**: CNAME
  - **Name**: `@`
  - **Target**: `cname.vercel-dns.com`
  - **Proxy**: ✅ Proxied

**Option 2: A Record**
- Add A record pointing to Vercel's IP addresses
- Check Vercel documentation for current IPs
- **Name**: `@`
- **Target**: Vercel IP address
- **Proxy**: ✅ Proxied

### 3.3 Configure SSL/TLS

1. In Cloudflare, go to **SSL/TLS** → **Overview**
2. Set encryption mode to **"Full"** or **"Full (strict)"**
   - **Full**: Allows self-signed certificates (works with Vercel)
   - **Full (strict)**: Requires valid certificates (recommended)
3. Vercel automatically provisions SSL certificates, so "Full (strict)" should work

### 3.4 Wait for Propagation

- DNS changes typically propagate within 5-15 minutes
- SSL certificate provisioning by Vercel may take a few minutes
- You can check status in Vercel dashboard under **Domains**

### 3.5 Verify Deployment

1. Visit your custom domain
2. Check that SSL is working (HTTPS)
3. Verify all pages load correctly
4. Test writeup navigation

## Step 4: Configure Cloudflare Settings (Optional)

### Performance Optimization

1. **Caching**: 
   - Go to **Caching** → **Configuration**
   - Set cache level to "Standard"
   - Browser Cache TTL: 4 hours

2. **Auto Minify**:
   - Go to **Speed** → **Optimization**
   - Enable HTML, CSS, and JavaScript minification

3. **Brotli Compression**:
   - Go to **Speed** → **Optimization**
   - Enable Brotli

### Security Settings

1. **Security Level**: Set to "Medium" or "High"
2. **Always Use HTTPS**: Enable
3. **Automatic HTTPS Rewrites**: Enable
4. **HSTS**: Enable (optional, for better security)

## Troubleshooting

### Domain Not Resolving

- Wait 15-30 minutes for DNS propagation
- Check DNS records in Cloudflare match Vercel's requirements
- Verify proxy is enabled (orange cloud)
- Use `dig` or `nslookup` to check DNS resolution

### SSL Certificate Issues

- Ensure SSL/TLS mode is set to "Full" or "Full (strict)"
- Wait a few minutes for Vercel to provision the certificate
- Check Vercel dashboard for certificate status
- Try accessing the site directly via Vercel URL first

### 404 Errors

- Verify your GitHub repository structure matches expected format
- Check that environment variables are set correctly
- Review Vercel build logs for errors
- Ensure repository is public

### Slow Loading

- Check Cloudflare caching settings
- Verify you're using Cloudflare's CDN (proxy enabled)
- Check Vercel analytics for performance metrics
- Consider enabling Cloudflare's Rocket Loader (optional)

## Environment Variables Reference

Set these in Vercel dashboard under **Settings** → **Environment Variables**:

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `GITHUB_OWNER` | GitHub username/organization | `myusername` | No (defaults in code) |
| `GITHUB_REPO` | Repository name | `ctf-writeups` | No (defaults in code) |
| `GITHUB_BRANCH` | Branch name | `main` | No (defaults to `main`) |

## Continuous Deployment

Vercel automatically deploys on every push to your main branch. To configure:

1. Go to **Settings** → **Git**
2. Configure which branches trigger deployments
3. Set up preview deployments for pull requests (optional)

## Monitoring

- **Vercel Analytics**: Enable in project settings for performance monitoring
- **Cloudflare Analytics**: Available in Cloudflare dashboard
- **Error Tracking**: Check Vercel logs for runtime errors

## Cost

- **Vercel**: Free tier includes 100GB bandwidth/month
- **Cloudflare**: Free tier includes unlimited bandwidth
- **Total**: $0/month for typical usage

## Support

- Vercel Documentation: https://vercel.com/docs
- Cloudflare Documentation: https://developers.cloudflare.com
- GitHub API Documentation: https://docs.github.com/en/rest

