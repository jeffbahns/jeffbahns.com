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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
