# jeffbahns.com redesign

## Goal

Replace the placeholder portfolio with a real one that works for job hunting
and shows side projects. Audience: recruiters and hiring managers first,
other developers second.

Success: someone landing on the page learns in under 30 seconds who Jeff is,
what Jeff has built, and how to get in touch.

## Visual direction

"Plain-text page" (mockup #2 from brainstorming):

- Single page, all monospace (JetBrains Mono), content column max ~600px.
- Dark background (`#111214`), light text (`#d7d7d2`), dim gray for
  secondary text (`#6c6f75`), one amber accent for links (`#f5c26b`).
- Automatic light mode via `prefers-color-scheme: light` with equivalent
  tokens (off-white background, near-black text, darker amber links).
- No terminal prompts, window chrome, cards, icons, or animation.
- Readable at phone width: 16px side gutter, no horizontal scroll.

## Page structure

In order, top to bottom:

1. **Header** — `Jeff Bahns`, then dim line
   `Full-stack engineer · San Francisco Bay Area`.
2. **Intro** — 2–3 sentences adapted from the resume summary, ending with one
   line about the 2025 career break (traveled South America, Europe, and Asia;
   now looking for the next role).
3. **Work** — one row per job: company left, years right (`2021–25`).
   Each row is a native `<details>` element, closed by default; opening it
   shows the title and 2–3 bullets. Jobs:
   - Charles River Laboratories, Full Stack Developer, 2021–25
   - Stafl Systems, Full Stack Developer, 2019–21
   - Portland Web Design, Web Developer, 2016–19
4. **Projects** — `Woodshed — guitar practice tracker`, linking to
   `https://woodshed.jeffbahns.com`, with a dim stack line
   (Next.js · Turso · Claude API).
5. **Education** — BS Computer Science, Sonoma State University (2017);
   co-authored paper presented at SC16 (PMBS16).
6. **Elsewhere** — GitHub (`github.com/jeffbahns`), LinkedIn
   (`linkedin.com/in/jeff-bahns`), Email (`jeffbahns@gmail.com`).

Excluded on purpose: career break as a work row, resume PDF link, skills tag
list, phone number.

## Architecture

Keep Next.js 14, pages router, deployed on Vercel. No new dependencies.

| File | Change |
|---|---|
| `data/profile.ts` | New. Typed object holding all content: name, tagline, intro, jobs (company, title, years, bullets), projects (name, blurb, url, stack), education, links. The only file edited to update the site. |
| `pages/index.tsx` | Rewritten. Pure render of `profile.ts`. Sets `<title>` and meta description. No client state; `<details>` handles expand/collapse. |
| `styles/globals.css` | Rewritten. Color tokens on `:root`, light-mode overrides, typography, layout. Fixes the stray `om ` before `@import` on line 1. |
| `pages/_app.tsx` | Unchanged unless it imports deleted files. |
| `pages/_index.tsx`, `pages/api/hello.ts`, `styles/Home.module.css`, `public/vercel.svg`, `netlify.toml` | Deleted (template leftovers; hosting moved to Vercel). |

## Content source

Resume at
`~/Downloads/Employment/2026_08_12__ai_nogithub_noprojects/Jeff_Bahns_Resume.pdf`
(read during brainstorming). Bullets are condensed from it; numbers
(3,500+ clients, 20,000+ records, several thousand transfers daily) are kept
verbatim.

## Testing

- `npm run build` and `npm run lint` pass.
- Load the page with `npm run dev`; check at desktop width and ~375px:
  all sections render, every `<details>` opens, all links resolve to the
  right targets, no horizontal scroll, light mode is readable.

## Out of scope

Next.js upgrade, blog/writing section, resume download, analytics,
additional projects (add later by editing `data/profile.ts`).
