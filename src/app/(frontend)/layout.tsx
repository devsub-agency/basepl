import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header/Component'
import { ThemeProvider } from './components/theme-provider'
import { Footer } from './components/Footer/Component'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'payload base',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
