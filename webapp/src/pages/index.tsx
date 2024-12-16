import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AuthComponent() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (      <div className={styles.signedInStatus}>
    <p
      className={`nojs-show ${
        !session && loading ? styles.loading : styles.loaded
      }`}
    >
      {!session && (
        <>
          <span className={styles.notSignedInText}>
            You are not signed in:&nbsp;
          </span>
          <a
            href={`/api/auth/signin`}
            className={styles.buttonPrimary}
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Sign in
          </a>
        </>
      )}
      {session?.user && (
        <>
          {session.user.image && (
            <span
              style={{ backgroundImage: `url('${session.user.image}')` }}
              className={styles.avatar}
            />
          )}
          <span className={styles.signedInText}>
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email ?? session.user.name}</strong>
          </span>
          <a
            href={`/api/auth/signout`}
            className={styles.button}
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign out
          </a>
        </>
      )}
    </p>
  </div>);
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthComponent/>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <ol>
            <li><a href="server">server sample</a></li>
            <li><a href="client">client sample</a></li>
            <li><a href="api-calls">api-calls sample</a></li>
          </ol>
        </main>
      </div>
    </>
  );
}
