# Netlify Deployment Guide for "Best Food in Multan"

This project is pre-configured and tested for Netlify deployment.

---

## ⚡ Deployment Settings Summary

| Setting | Value |
|---|---|
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |
| **Node Version** | `18` or `20` (default) |
| **Routing / Redirects** | Configured via `netlify.toml` and `public/_redirects` |
| **SPA Fallback** | `/* -> /index.html 200` |

---

## 🚀 Option 1: Git-Connected Automatic Deployment (Recommended)

1. **Push your repository** to GitHub, GitLab, or Bitbucket.
2. Go to [app.netlify.com](https://app.netlify.com/) and log in.
3. Click **"Add new site"** → **"Import an existing project"**.
4. Choose **GitHub** (or your Git provider) and authorize access.
5. Select the repository: `best-food-in-multan`.
6. Netlify will auto-detect settings from `netlify.toml`:
   - **Base directory:** (leave blank)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click **"Deploy site"**.
8. Within ~45 seconds, your website will be live with an SSL certificate (`https://<your-site-name>.netlify.app`).

---

## 📦 Option 2: Direct Drag-and-Drop (No Git Required)

1. Build the production folder locally:
   ```bash
   npm run build
   ```
2. A `dist/` directory will be created containing all production assets and `_redirects`.
3. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
4. Drag and drop the `dist` folder into the drop zone.
5. Your website goes live immediately!

---

## 💻 Option 3: Netlify CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build the project
npm run build

# 3. Deploy to production
netlify deploy --prod --dir=dist
```

---

## 🌐 Custom Domain & DNS Setup (e.g. `bestfoodinmultan.pk`)

1. In your Netlify Site dashboard, go to **Site configuration** → **Domain management**.
2. Click **Add a domain** and enter your domain name (e.g., `bestfoodinmultan.pk`).
3. Point your domain's DNS:
   - **CNAME record** for `www` pointing to `<your-site-name>.netlify.app`
   - **A record** for apex domain pointing to Netlify's load balancer IP: `75.2.60.5`
4. Netlify will automatically generate a free Let's Encrypt SSL/TLS HTTPS certificate.

---

## ✅ Pre-configured Features
- **SPA Refresh Safe**: `public/_redirects` and `netlify.toml` ensure page refreshes never yield 404s.
- **Security Headers**: `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` are enabled.
- **SEO & Social Cards**: OpenGraph tags, Twitter cards, `robots.txt`, and `sitemap.xml` are packaged into `dist`.
