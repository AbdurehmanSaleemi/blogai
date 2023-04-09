import { Inter } from 'next/font/google'
import Head from 'next/head'
import BlogTool from './blog'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Head key="blogtool">
            <title key="title">Blog Tool</title>
            <meta name="description" content="Blog Tool" key="description" />
            <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
        </Head>
        <BlogTool />
    </main>
  )
}
