import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { BRAND } from '../../config/BRAND'

import styles from './Layout.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

export default function Layout({ children, title = BRAND }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          {/* <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a>Users List</a>
        </Link>{' '}
        | <a href="/api/users">Users API</a> */}
        </nav>
      </header>

      <main className={`${styles.main} width-full`}>{children}</main>

      <footer className={`${styles.footer} width-full`}>
        <a href="https://graficos.net" target="_blank">
          <code>graficos.net</code>
        </a>
      </footer>
    </div>
  )
}
