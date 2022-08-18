import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/Home.module.css"
import CallToActionWithIllustration from "./Home"

const Home: NextPage = () => {
  return <CallToActionWithIllustration />
}
// const Home: NextPage = () => {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Hi I am <a href="https://www.jeffbahns.com">Jeff</a> and you&apos;re
//           on my <a href="https://www.jeffbahns.com">website!</a>
//         </h1>
//         <p className={styles.description}>Dev changes</p>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by <span className={styles.logo}>Jeff</span>
//         </a>
//       </footer>
//     </div>
//   )
// }

export default Home
