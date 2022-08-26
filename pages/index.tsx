import { useEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Index.module.css'

const Home: NextPage = () => {
  useEffect(() => {
    let seed = Math.floor(Math.random() * 4294967295).toString(16);

    while (seed.length < 8) {
      seed = "0" + seed;
    }

    Promise.all([
        fetch(`/api/maze-js?seed=${seed}`),
        fetch(`/api/maze-c?seed=${seed}`)
    ]).then(([ jsResponse, wasmResponse ]) => {
        Promise.all([
            jsResponse.text(),
            wasmResponse.text()
        ]).then(([ jsSvg, wasmSvg ]) => {
            document.querySelector("#mazeJs").innerHTML = jsSvg;
            document.querySelector("#mazeWasm").innerHTML = wasmSvg;
        });
    });

    document.querySelector("#mazeNumber").innerHTML = `0x${seed}`;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Wasm on the Edge</title>
        <meta name="description" content="Maze generator and solver in JavaScript and Wasm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Wasm on the edge!</h1>

        <div id="mazeContainer" className={styles.mazeContainer}>
          <div className={styles.mazeWithTitle}>
            <div className={styles.mazeTitle}>
              JavaScript &mdash; 81ms average
            </div>

            <div id="mazeJs" className={styles.maze} />
          </div>

          <div className={styles.mazeWithTitle}>
            <div className={styles.mazeTitle}>
              Wasm (C) &mdash; 36ms average
            </div>

            <div id="mazeWasm" className={styles.maze} />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.company}>
          <a
            href="https://vercel.com?utm_source=wasm-on-the-edge&utm_medium=default-template&utm_campaign=wasm-on-the-edge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </div>

        <div className={styles.metadata}>
          <div>
            Built with <a href="https://nextjs.org">Next.js</a> on <a href="https://vercel.com/edge">Vercel Edge Functions</a>
          </div>

          <div className={styles.mazeMetadata}>
            Maze number: <span id="mazeNumber" className={styles.mazeNumber}>generating</span>
          </div>
        </div>

        <div className={styles.source}>
          <a
            href="https://github.com/ethomson/next-maze"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.50583 0 12.3035C0 17.7478 3.435 22.3463 8.205 23.9765C8.805 24.0842 9.03 23.715 9.03 23.3921C9.03 23.0999 9.015 22.131 9.015 21.1005C6 21.6696 5.22 20.347 4.98 19.6549C4.845 19.3012 4.26 18.2092 3.75 17.917C3.33 17.6863 2.73 17.1173 3.735 17.1019C4.68 17.0865 5.355 17.9939 5.58 18.363C6.66 20.2239 8.385 19.701 9.075 19.3781C9.18 18.5783 9.495 18.04 9.84 17.7325C7.17 17.4249 4.38 16.3637 4.38 11.6576C4.38 10.3196 4.845 9.21226 5.61 8.35102C5.49 8.04343 5.07 6.78232 5.73 5.09058C5.73 5.09058 6.735 4.76762 9.03 6.3517C9.99 6.07487 11.01 5.93645 12.03 5.93645C13.05 5.93645 14.07 6.07487 15.03 6.3517C17.325 4.75224 18.33 5.09058 18.33 5.09058C18.99 6.78232 18.57 8.04343 18.45 8.35102C19.215 9.21226 19.68 10.3042 19.68 11.6576C19.68 16.3791 16.875 17.4249 14.205 17.7325C14.64 18.1169 15.015 18.8552 15.015 20.0086C15.015 21.6542 15 22.9768 15 23.3921C15 23.715 15.225 24.0995 15.825 23.9765C18.2072 23.1519 20.2773 21.5822 21.7438 19.4882C23.2103 17.3942 23.9994 14.8814 24 12.3035C24 5.50583 18.63 0 12 0Z" fill="var(--fg)"></path></svg>

            Source
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home
