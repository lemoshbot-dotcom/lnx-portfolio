# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LNX Portfolio Site** - A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. The site is designed to be easily maintainable and deployed to Vercel with a custom domain (lnx.art).

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Domain**: lnx.art (managed via GoDaddy DNS)
- **Email**: Google Workspace on lnx.art domain

## Development Commands

### Initial Setup
```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

The development server runs on http://localhost:3000

### Building and Testing
```bash
# Build for production (checks for errors)
npm run build

# Run production build locally
npm start

# Lint code
npm run lint
```

## Project Structure

```
LNX_SITE/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind
├── components/            # Reusable React components
├── public/               # Static assets (images, fonts, etc.)
├── package.json          # Dependencies and scripts
└── next.config.ts        # Next.js configuration
```

## Key Architecture Patterns

### Next.js App Router
- Uses the modern App Router (not Pages Router)
- File-based routing: files in `app/` directory define routes
- Server Components by default (use "use client" for client components)
- `layout.tsx` wraps all pages with common elements

### Styling with Tailwind
- Utility-first CSS framework
- Custom styles in `app/globals.css`
- Responsive design with breakpoints: `md:`, `lg:`, `xl:`
- Dark mode support via CSS variables

### TypeScript Configuration
- Strict mode enabled for type safety
- Path aliases: `@/*` maps to root directory
- All new files should be `.tsx` for components, `.ts` for utilities

## Deployment Workflow

### 1. Preparing for Deploy

Before deploying, ensure:
```bash
# Build succeeds without errors
npm run build

# No linting errors
npm run lint

# Commit all changes
git add .
git commit -m "Your commit message"
```

### 2. GitHub Setup (First Time Only)

```bash
# Create a new repository on GitHub (github.com/new)
# Name: lnx-site (or your preference)

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/lnx-site.git
git branch -M main
git push -u origin main
```

### 3. Vercel Deployment (First Time)

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository (lnx-site)
5. Vercel auto-detects Next.js - click "Deploy"
6. Wait ~2 minutes for first deploy
7. You'll get a URL like: `lnx-site.vercel.app`

### 4. Connecting Custom Domain (lnx.art)

**In Vercel:**
1. Go to Project Settings → Domains
2. Add domain: `lnx.art`
3. Also add: `www.lnx.art` (redirects to main)
4. Vercel shows DNS records needed (copy these)

**In GoDaddy DNS:**
1. Login to GoDaddy → My Products → DNS
2. Find domain: lnx.art → Manage DNS
3. **IMPORTANT**: Do NOT delete MX records (Google Workspace emails)
4. Add/Update these records ONLY:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600 seconds

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600 seconds
```

5. Wait 5-30 minutes for DNS propagation
6. Verify at https://lnx.art

### 5. Automatic Deployments

After setup, deployments are automatic:
```bash
# Make changes to code
git add .
git commit -m "Update portfolio"
git push

# Vercel automatically deploys in ~2 minutes
```

## Common Development Tasks

### Adding a New Page
```bash
# Create new file: app/about/page.tsx
# It automatically becomes available at /about
```

Example:
```typescript
export default function About() {
  return <div>About Page</div>
}
```

### Adding Components
```typescript
// components/Button.tsx
export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded">
      {children}
    </button>
  )
}

// Use in pages:
import Button from '@/components/Button'
```

### Updating Content on Home Page

Edit `app/page.tsx`:
- **Hero Section**: Update title, description, buttons
- **About Section**: Modify the about text
- **Projects Section**: Add/remove project cards

### Adding Images

```bash
# Place images in public/ folder
public/logo.png
public/projects/project1.jpg

# Use in components:
<Image src="/logo.png" alt="Logo" width={200} height={200} />

# Import Next.js Image:
import Image from 'next/image'
```

## Important Notes

### DNS and Email Safety
- The domain lnx.art has Google Workspace emails configured
- **NEVER delete MX records** in GoDaddy DNS
- Only modify A and CNAME records for website deployment
- MX records should remain pointing to Google servers

### Environment Variables
- Create `.env.local` for local secrets (never commit)
- Add production secrets in Vercel dashboard
- Access via `process.env.VARIABLE_NAME`

### Performance Best Practices
- Use Next.js `<Image>` component for images (auto-optimization)
- Keep components small and focused
- Use Server Components when possible (default in App Router)
- Only use "use client" when you need interactivity/hooks

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### DNS Not Updating
- DNS changes take 5-30 minutes
- Clear browser cache (Cmd+Shift+R)
- Check DNS propagation: https://dnschecker.org

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Run production locally | `npm start` |
| Lint code | `npm run lint` |
| Deploy | `git push` (auto-deploys via Vercel) |

## Support Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind Docs: https://tailwindcss.com/docs
- Vercel Docs: https://vercel.com/docs
- TypeScript Docs: https://www.typescriptlang.org/docs
