import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const handleCardClick = (title: string) => {
    console.log(`Clicked on ${title}`)
    // Add your interactive logic here
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Jeff Bahns - Developer</title>
        <meta name="description" content="Jeff Bahns - A developer passionate about creating clean, user-friendly digital experiences" />
        <meta name="keywords" content="Jeff Bahns, developer, web development, React, Next.js" />
      </Head>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>JEFF BAHNS</h1>
        <p className={styles.tagline}>DEVELOPER</p>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        {/* Hero section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Hi, I'm <span className="accent">Jeff</span>
          </h1>
          <p className={styles.description}>
            I'm a developer who loves creating clean, intuitive digital experiences. 
            Welcome to my portfolio.
          </p>
          
          <a 
            href="https://www.linkedin.com/in/jeff-bahns/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            View My Work
          </a>
        </section>

        {/* Interactive cards */}
        <section className={styles.cardsGrid}>
          <div 
            className={styles.card + ' ' + styles.interactive}
            onClick={() => handleCardClick('Development')}
          >
            <div className={styles.cardIcon}>DEV</div>
            <h3 className={styles.cardTitle}>Development</h3>
            <p className={styles.cardDescription}>
              Building clean, efficient web applications with modern technologies
            </p>
          </div>

          <div 
            className={styles.card + ' ' + styles.interactive}
            onClick={() => handleCardClick('Design')}
          >
            <div className={styles.cardIcon}>UI</div>
            <h3 className={styles.cardTitle}>Design</h3>
            <p className={styles.cardDescription}>
              Creating intuitive user interfaces that prioritize user experience
            </p>
          </div>

          <div 
            className={styles.card + ' ' + styles.interactive}
            onClick={() => handleCardClick('Problem Solving')}
          >
            <div className={styles.cardIcon}>SOLVE</div>
            <h3 className={styles.cardTitle}>Problem Solving</h3>
            <p className={styles.cardDescription}>
              Tackling complex challenges with thoughtful, scalable solutions
            </p>
          </div>
        </section>

        {/* Skills showcase */}
        <section className={styles.skillsSection}>
          <h2 className={styles.skillsTitle}>
            Skills & Technologies
          </h2>
          <div className={styles.skillsGrid}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL'].map((skill, index) => (
              <span 
                key={skill}
                className={styles.skillTag}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Built with Next.js • 
          <a href="https://github.com/jeffbahns" target="_blank" rel="noopener noreferrer"> GitHub</a>
        </p>
        <p>© 2024 Jeff Bahns</p>
      </footer>
    </div>
  )
}

export default Home
