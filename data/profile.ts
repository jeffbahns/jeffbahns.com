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
  tagline: "Full-stack engineer · San Francisco Bay Area · Open to remote",
  description:
    "Full-stack engineer building Node.js services and React/TypeScript frontends, from data model to UI.",
  url: "https://jeffbahns.com",
  intro: [
    "I build web apps end to end: Node.js services, React/TypeScript frontends, and the data model in between. Most recently that meant a secure document platform at Charles River Laboratories serving 3,500+ enterprise lab clients. I work spec-first with Claude Code: write the design, plan the tasks, let agents implement, review every change.",
    "After eight straight years of shipping software, I took 2025 to travel South America, Europe, and Asia. Now I'm looking for my next role.",
  ],
  jobs: [
    {
      company: "Charles River Laboratories",
      title: "Full Stack Developer",
      years: "2021–25",
      bullets: [
        "Designed, built, and owned the document sync microservice: event-driven M-Files webhooks moving regulated files from lab source to M-Files to Apollo, handling several thousand transfers daily.",
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
