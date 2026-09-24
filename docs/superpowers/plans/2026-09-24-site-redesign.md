# Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder homepage with a single plain-text, monospace portfolio page driven by one content file.

**Architecture:** All content lives in a typed object in `data/profile.ts`. `pages/index.tsx` is a pure render of it; job details expand with native `<details>` so there is no client state. `styles/globals.css` holds color tokens (dark default, light via `prefers-color-scheme`) and all layout.

**Tech Stack:** Next.js 14 (pages router), React 18, TypeScript, plain CSS. Hosted on Vercel. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-24-site-redesign-design.md`

## Global Constraints

- No new npm dependencies.
- Next.js stays on 14, pages router. `next.config.js` unchanged.
- Font: JetBrains Mono everywhere, fallback `ui-monospace, Menlo, Consolas, monospace`.
- Content column max width ~600px; 16px side gutter; no horizontal scroll at 375px.
- Dark tokens: bg `#111214`, text `#d7d7d2`, accent `#f5c26b`. Dim text is `#85888e` (spec said `#6c6f75`; raised for WCAG AA contrast on small text).
- Excluded: phone number, resume PDF link, skills tag list, career break as a work row.
- Email shown: `jeffbahns@gmail.com`.

## Review Focus

1. Phone width (375px): a long company name next to its years must wrap, not overflow. Checked in Task 3 Step 3.
2. Keyboard only: Tab reaches every job summary and link, focus is visible, Enter toggles a job. Checked in Task 3 Step 4.
3. OS set to light mode: text, dim text, and links all readable. Checked in Task 3 Step 5.
4. Google Fonts blocked: page falls back to a system monospace font and still looks right. Checked in Task 3 Step 6.
5. Link previews: pasting the URL into Slack/iMessage shows title and description. Checked in Task 3 Step 7 (meta tags present in built HTML).

---

### Task 1: Content file

**Files:**
- Create: `data/profile.ts`

**Interfaces:**
- Produces: `export const profile: Profile` and types `Profile`, `Job`, `Project`, `Link`, `Education` (shapes below). Task 2 imports `profile` from `../data/profile`.

- [ ] **Step 1: Create `data/profile.ts`**

```ts
export type Job = {
  company: string
  title: string
  years: string
  bullets: string[]
}

export type Project = {
  name: string
  blurb: string
  url: string
  stack: string[]
}

export type Education = {
  degree: string
  school: string
  year: string
  note: string
}

export type Link = {
  label: string
  href: string
}

export type Profile = {
  name: string
  tagline: string
  description: string
  url: string
  intro: string[]
  jobs: Job[]
  projects: Project[]
  education: Education
  links: Link[]
}

export const profile: Profile = {
  name: "Jeff Bahns",
  tagline: "Full-stack engineer · San Francisco Bay Area",
  description:
    "Full-stack engineer building Node.js services and React/TypeScript frontends, from data model to UI.",
  url: "https://jeffbahns.com",
  intro: [
    "I build web apps end to end: Node.js services, React/TypeScript frontends, and the data model in between. Most recently that meant a secure document platform at Charles River Laboratories serving 3,500+ enterprise lab clients. I work daily with AI-assisted tools like Claude Code.",
    "After eight straight years of shipping software, I took 2025 to travel South America, Europe, and Asia. Now I'm looking for my next role.",
  ],
  jobs: [
    {
      company: "Charles River Laboratories",
      title: "Full Stack Developer",
      years: "2021–25",
      bullets: [
        "Designed, built, and owned the document sync microservice: event-driven M-Files webhooks moving several thousand regulated files a day from lab source to M-Files to Apollo.",
        "Built features for Apollo, a secure document platform serving 3,500+ enterprise lab clients and 20,000+ regulated study records.",
        "Built responsive React/TypeScript frontends for research teams; shipped with Docker and Azure DevOps CI/CD.",
      ],
    },
    {
      company: "Stafl Systems",
      title: "Full Stack Developer",
      years: "2019–21",
      bullets: [
        "Built a fleet-management app from the ground up: Node.js API, SQL data model, and React frontend.",
        "Ingested telemetry over cellular from field-deployed battery-management and telematics devices.",
        "Visualized fleet location and device telemetry with an interactive map and D3 charts.",
      ],
    },
    {
      company: "Portland Web Design",
      title: "Web Developer",
      years: "2016–19",
      bullets: [
        "Built and maintained WordPress sites for clients from local businesses to established companies.",
        "Wrote custom PHP backend features and responsive, design-driven frontends.",
        "Grew into JavaScript, jQuery, and Angular for more interactive client work.",
      ],
    },
  ],
  projects: [
    {
      name: "Woodshed",
      blurb: "Guitar practice tracker. Nothing you learn on guitar silently disappears.",
      url: "https://woodshed.jeffbahns.com",
      stack: ["Next.js", "Turso", "Claude API"],
    },
  ],
  education: {
    degree: "BS Computer Science",
    school: "Sonoma State University",
    year: "2017",
    note: "Co-authored an HPC workload analysis paper presented at SC16 (PMBS16).",
  },
  links: [
    { label: "GitHub", href: "https://github.com/jeffbahns" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jeff-bahns/" },
    { label: "Email", href: "mailto:jeffbahns@gmail.com" },
  ],
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors from `data/profile.ts` (errors elsewhere from the old page are fine at this point only if they pre-existed; note them).

- [ ] **Step 3: Commit**

```bash
git add data/profile.ts
git commit -m "feat: add profile content file"
```

---

### Task 2: Page, styles, and template cleanup

**Files:**
- Modify (rewrite): `pages/index.tsx`
- Modify (rewrite): `styles/globals.css`
- Delete: `pages/_index.tsx`, `pages/api/hello.ts`, `styles/Home.module.css`, `public/vercel.svg`, `netlify.toml`

**Interfaces:**
- Consumes: `profile` from `../data/profile` (Task 1).
- Produces: CSS classes used by the page: `page`, `dim`, `intro`, `section`, `list`, `row`, `bullets`, `links`.

- [ ] **Step 1: Delete template leftovers**

```bash
git rm pages/_index.tsx pages/api/hello.ts styles/Home.module.css public/vercel.svg netlify.toml
```

- [ ] **Step 2: Rewrite `pages/index.tsx`**

```tsx
import type { NextPage } from "next"
import Head from "next/head"
import { profile } from "../data/profile"

const title = `${profile.name} · Full-stack engineer`

const Home: NextPage = () => {
  return (
    <main className="page">
      <Head>
        <title>{title}</title>
        <meta name="description" content={profile.description} />
        <meta name="color-scheme" content="dark light" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={profile.url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={profile.description} />
        <meta name="twitter:card" content="summary" />
      </Head>

      <header>
        <h1>{profile.name}</h1>
        <p className="dim">{profile.tagline}</p>
      </header>

      <section className="intro">
        {profile.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="section">
        <h2>Work</h2>
        <ul className="list">
          {profile.jobs.map((job) => (
            <li key={job.company}>
              <details>
                <summary className="row">
                  <span>{job.company}</span>
                  <span className="dim">{job.years}</span>
                </summary>
                <p className="dim">{job.title}</p>
                <ul className="bullets">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Projects</h2>
        <ul className="list">
          {profile.projects.map((project) => (
            <li key={project.name}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>{" "}
              <span className="dim">— {project.blurb}</span>
              <div className="dim">{project.stack.join(" · ")}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Education</h2>
        <div className="row">
          <span>
            {profile.education.degree}, {profile.education.school}
          </span>
          <span className="dim">{profile.education.year}</span>
        </div>
        <p className="dim">{profile.education.note}</p>
      </section>

      <section className="section">
        <h2>Elsewhere</h2>
        <p className="links">
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </p>
      </section>
    </main>
  )
}

export default Home
```

- [ ] **Step 3: Rewrite `styles/globals.css`**

```css
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap");

:root {
  --bg: #111214;
  --fg: #d7d7d2;
  --strong: #ffffff;
  --dim: #85888e;
  --accent: #f5c26b;
  --rule: #26282c;
  --font: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
}

@media (prefers-color-scheme: light) {
  :root {
    --bg: #f7f6f2;
    --fg: #26261f;
    --strong: #000000;
    --dim: #6b6b64;
    --accent: #9a5b00;
    --rule: #e2e0d8;
  }
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font);
  font-size: 14px;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}

.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 72px 16px 96px;
}

h1,
h2 {
  font-size: 14px;
  margin: 0;
}

h1 {
  font-weight: 600;
  color: var(--strong);
}

h2 {
  font-weight: 400;
  color: var(--dim);
  margin-bottom: 12px;
}

p {
  margin: 0;
}

.dim {
  color: var(--dim);
}

.intro {
  margin-top: 24px;
}

.intro p + p {
  margin-top: 1em;
}

.section {
  margin-top: 44px;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list > li + li {
  margin-top: 4px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
}

.row > :last-child {
  flex-shrink: 0;
}

summary {
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary > :first-child::before {
  content: "+ ";
  color: var(--dim);
}

details[open] > summary > :first-child::before {
  content: "- ";
}

summary:hover > :first-child {
  color: var(--strong);
}

details > p {
  margin: 8px 0 0 2ch;
}

.bullets {
  margin: 4px 0 16px 2ch;
  padding: 0;
  list-style: none;
}

.bullets li {
  position: relative;
  padding-left: 2ch;
  color: var(--fg);
}

.bullets li::before {
  content: "·";
  position: absolute;
  left: 0;
  color: var(--dim);
}

a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px dotted currentColor;
}

a:hover {
  border-bottom-style: solid;
}

a:focus-visible,
summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}
```

- [ ] **Step 4: Typecheck, lint, build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: no type errors, no lint errors, build ends with the route table showing `○ /` (static).

- [ ] **Step 5: Confirm nothing references deleted files**

Run: `grep -rn "Home.module\|vercel.svg\|api/hello" pages styles data`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add pages/index.tsx styles/globals.css
git commit -m "feat: plain-text portfolio page; remove template and Netlify leftovers"
```

---

### Task 3: Verify in the browser

**Files:** none changed unless a check fails (fix in `styles/globals.css` or `pages/index.tsx`, then re-run the failed step).

- [ ] **Step 1: Start dev server**

Run: `npm run dev` (background). Open `http://localhost:3000`.

- [ ] **Step 2: Desktop check (~1280px)**

Expected: header, intro (2 paragraphs), Work (3 rows, all closed), Projects (Woodshed), Education, Elsewhere render in that order. Clicking each job opens title + 3 bullets; `+` flips to `-`.

- [ ] **Step 3: Phone check (375px)**

Expected: `document.documentElement.scrollWidth <= 375` (no horizontal scroll). "Charles River Laboratories" and "2021–25" stay on one row or the name wraps; years never overflow.

- [ ] **Step 4: Keyboard check**

Expected: Tab moves through the 3 job summaries, Woodshed, GitHub, LinkedIn, Email in order; each shows an amber focus outline; Enter on a summary toggles it.

- [ ] **Step 5: Light mode check**

Emulate `prefers-color-scheme: light`. Expected: off-white background, dark text, dim text readable, links brown-amber.

- [ ] **Step 6: Font fallback check**

Block `fonts.googleapis.com` (or check computed style with the font removed). Expected: page renders in a system monospace; layout unchanged.

- [ ] **Step 7: Link and meta check**

Run: `npm run build && npx next start -p 3001` then `curl -s localhost:3001 | grep -o '<meta[^>]*og:[^>]*>'`
Expected: `og:type`, `og:url`, `og:title`, `og:description` present. Links: Woodshed → `https://woodshed.jeffbahns.com`, GitHub → `https://github.com/jeffbahns`, LinkedIn → `https://www.linkedin.com/in/jeff-bahns/`, Email → `mailto:jeffbahns@gmail.com`.

- [ ] **Step 8: Commit any fixes**

```bash
git add -A pages styles data
git commit -m "fix: browser verification fixes"
```
(Skip if nothing changed.)
