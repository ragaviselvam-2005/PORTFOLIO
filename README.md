# Ragavi S — Portfolio Website

A single-page, fully responsive portfolio built from Ragavi S's résumé. Visual concept: a **printed circuit board** — silkscreen-style monospace headers, copper-trace accents, component reference tags (U1, U2…) labeling each section, and an animated signal trace running down the page.

## File Structure

```
portfolio/
├── index.html          # All page content/sections
├── style.css            # Design tokens, layout, responsive rules, dark/light themes
├── script.js             # Theme toggle, mobile nav, scroll reveal, skill bars, contact form
└── README.md
```

## Setup Instructions

1. Download/unzip the `portfolio` folder.
2. Open `index.html` directly in a browser — no build step or dependencies required (fonts load from Google Fonts CDN, icons are inline SVG).
3. To develop locally with live reload, you can optionally run a simple local server:
   ```bash
   cd portfolio
   python3 -m http.server 8000
   # visit http://localhost:8000
   ```

### Customizing
- **Colors / fonts**: edit the CSS custom properties at the top of `style.css` (`:root` and `[data-theme="light"]`).
- **Content**: all section text lives in `index.html`, grouped by `<section id="...">`.
- **Contact form**: currently opens the visitor's email client via a `mailto:` link (no backend). To collect submissions server-side, wire the form to a service like Formspree, Netlify Forms, or EmailJS — swap the `submit` handler in `script.js`.

## Deployment

### Vercel
```bash
npm i -g vercel
cd portfolio
vercel
```
Follow the prompts; Vercel auto-detects a static site and deploys it.

### Netlify
```bash
npm i -g netlify-cli
cd portfolio
netlify deploy --prod
```
Or drag-and-drop the `portfolio` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

### GitHub Pages
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Deploy from branch → main / root**. The site will publish at `https://<your-username>.github.io/<repo-name>/`.

## Future Enhancements
- Connect the contact form to a backend/email service for direct submissions.
- Add a projects filter (e.g., by technology: IoT, ML, Embedded).
- Add subtle Lottie/SVG animation of a microcontroller or sensor in the hero section.
- Add a blog/notes section for write-ups on embedded projects.
- Add Open Graph image and analytics (Plausible/GA) once a custom domain is set up.
