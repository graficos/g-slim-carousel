import Head from 'next/head'
import Link from 'next/link'
import { Carousel } from '@graficos/g-slim-carousel'

import { BRAND } from '../config/BRAND'

import Layout from '../components/Layout/Layout'

import styles from '../styles/Home.module.css'

function Home() {
  return (
    <Layout>
      <h1 className={styles.title}>
        <code className="code">{BRAND}</code>
      </h1>

      <p className={styles.description}>Graficos.net's Slim (ish) Carousel</p>

      <Carousel></Carousel>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Example</h3>
          <p>
            Go to <Link href="/content/example">/example</Link> to see a live
            demo
          </p>
        </div>

        <div className={styles.card}>
          <h3>Docs</h3>
          <p>
            In <Link href="/docs">/docs</Link> you'll find a more in-depth
            explanation
          </p>
        </div>

        <div className={styles.card}>
          <h3>Storybook</h3>
          <p>
            We maintain a live docs version to show all the possible
            configurations
          </p>
        </div>

        <a href="https://graficos.net" className={styles.card}>
          <h3>Graficos.net</h3>
          <p>Made with ❤ and ☕ by Paul Melero.</p>
        </a>
      </div>
    </Layout>
  )
}

export default Home
