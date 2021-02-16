import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { BRAND } from '../../config/BRAND'

import styles from './Layout.module.css'

type Props = {
  children?: ReactNode
  className?: string
  title?: string
}

export default function Layout({
  children,
  className = '',
  title = BRAND,
}: Props) {
  return (
    <div
      className={`${styles.container} ${
        className || ''
      } mx-auto flex justify-center items-start flex-col min-h-screen pt-4`}
    >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full flex flex-col justify-start items-center min-h-screen pb-14">
        {children}
      </main>
      <footer
        className={`${styles.footer} w-full flex items-center justify-center`}
      >
        <a
          href="https://graficos.net"
          target="_blank"
          className="flex justify-center items-center"
        >
          <code>graficos.net</code>
        </a>
      </footer>
    </div>
  )
}
