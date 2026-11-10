# Kirill Khlopunov — Portfolio

A responsive personal portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`.

On Windows PowerShell systems that block the `npm.ps1` script, use `npm.cmd install` and `npm.cmd run dev` instead.

## Production build

```bash
npm run build
npm run preview
```

In restricted Windows PowerShell, use `npm.cmd run build` and `npm.cmd run preview`.

The optimized static site is generated in `dist/`. Upload that folder to a static host such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages. On Vercel or Netlify, connect the repository and use `npm run build` as the build command and `dist` as the output directory.

## Update content

- `src/data.ts` — project cards, experience timeline, skill matrix, and navigation labels.
- `src/App.tsx` — section copy, education, language details, and contact links.
- `src/styles.css` — layout, typography, color, animation, and responsive breakpoints.
- `public/` — favicon and any future local image assets. The hero portrait placeholder can be replaced in `src/App.tsx` when a personal image is ready.

The portfolio uses no stock photography. All biographical and project details are limited to the information supplied for this site.
