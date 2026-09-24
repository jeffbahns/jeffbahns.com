# jeffbahns.com

Personal site. Next.js 16 (pages router), deployed on Vercel from `master`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Update content

All content lives in `data/profile.ts`: intro, jobs, projects, education, and links. Edit that file; the page renders it as-is.

To add a project, add an entry to `projects`:

```ts
{
  name: "Project name",
  blurb: "One line on what it does.",
  url: "https://example.com",
  stack: ["Next.js", "Postgres"],
},
```

## Layout and styles

- `pages/index.tsx` renders the page from `data/profile.ts`.
- `styles/globals.css` holds all styles. Colors are tokens on `:root`, with light-mode overrides under `prefers-color-scheme: light`.

## Deploy

Push to `master`. Vercel builds and deploys automatically.
