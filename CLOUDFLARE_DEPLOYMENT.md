# Cloudflare Pages Deployment Guide

**The Hardwire Method** is configured and ready for 1-click or CLI deployment on **Cloudflare Pages**.

---

## Quick Configuration Summary

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | `Vite` (or None) |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Node.js Version** | `18` or `20+` |
| **Root Directory** | `/` |

---

## Deployment Option A: Cloudflare Dashboard (Recommended)

1. **Push to GitHub / GitLab**
   - Connect your repository in the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. **Create a New Project**
   - Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select the `the-hardwire-method` repository.
3. **Set Build Settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. **Click "Save and Deploy"**.
   - Cloudflare will build and publish your site with a custom `*.pages.dev` subdomain and free SSL certificate.

---

## Deployment Option B: Direct CLI Deployment (Wrangler)

If you prefer deploying directly from your terminal:

```bash
# 1. Install dependencies and build static assets
npm install
npm run build

# 2. Authenticate with Cloudflare (first time only)
npx wrangler login

# 3. Deploy to Cloudflare Pages
npm run deploy
# or: npx wrangler pages deploy dist --project-name=the-hardwire-method
```

---

## Included Cloudflare Optimizations

- **SPA Routing (`public/_redirects`)**: Resolves all deep-link URLs to `/index.html` with HTTP 200.
- **Security & Cache Headers (`public/_headers`)**: Includes HSTS/security headers and static asset caching for audio engine assets, Printable PDF, and eBook downloads.
- **`wrangler.jsonc` & `wrangler.toml`**: Pre-configured build output directory and compatibility dates for Cloudflare Pages CLI.
