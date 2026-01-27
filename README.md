# Unique React Portfolio (Single Page) — v2

Includes:
- Projects (from resume)
- Work Experience section
- Resume section (PDF is hosted in `/public` and contains contact details)
- Command palette (Cmd/Ctrl + K), filtering, scroll progress, reveal animations

## Run locally
```bash
npm install
npm run dev
```

## Customize
Edit:
- `src/data/profile.js` (projects + repo/demo links, skills, etc.)
- Replace `public/Mohammad_Arqam_Resume.pdf` with your latest resume if needed.

## Deploy to GitHub Pages (project site)
1) Set `base` in `vite.config.js` to `"/REPO_NAME/"`
2) Build and deploy `dist` to `gh-pages` branch (gh-pages package works great).

- Added **StudyBuddy (Android app)** project to match resume.
