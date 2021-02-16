import Head from 'next/head'
import Link from 'next/link'
import { Carousel } from '@graficos/g-slim-carousel'

import { BRAND } from '../config/BRAND'

import Layout from '../components/Layout/Layout'

import styles from '../styles/Home.module.css'

function Home() {
  return (
    <Layout>
      <h1 className={styles.title}>{BRAND}</h1>

      <p className={styles.description}>Graficos.net's Slim (ish) Carousel</p>

      <Carousel
        showArrows={false}
        showIndicators={false}
        autoPlay={false}
        minHeight="200px"
      >
        <div className={styles.card}>Graficos</div>
        <div className={styles.card}>Slim</div>
        <div className={styles.card}>Carousel</div>
      </Carousel>

      <p className="mb-10 text-2xl leading-6">See the code for this example:</p>

      <pre className="code">
        <code>
          {`
  <Carousel
      showArrows={false}
      showIndicators={false}
      autoPlay={false}
      minHeight="200px"
  >
      <div className="card">Graficos</div>
      <div className="card">Slim</div>
      <div className="card">Carousel</div>
  </Carousel>
          `}
        </code>
      </pre>

      <div className={styles.grid}>
        <a href="/content/example" className={styles.card}>
          <h3>Example</h3>
          <p>
            Go to <code>/example</code> to see a live demo.
          </p>
        </a>

        <a
          href="https://github.com/graficos/g-slim-carousel"
          className={styles.card}
        >
          <h3>Docs</h3>
          <p>
            In <code>/docs</code> you'll find a more in-depth explanation.
          </p>
        </a>

        <a
          href="https://g-slim-carousel-storybook.netlify.app/"
          className={styles.card}
        >
          <h3>Storybook</h3>
          <p>We maintain a live docs version of the component.</p>
        </a>

        <a href="https://graficos.net" className={styles.card}>
          <h3>Graficos.net</h3>
          <p>Made with ❤ and ☕ by Paul Melero.</p>
        </a>
      </div>
    </Layout>
  )
}

export default Home
