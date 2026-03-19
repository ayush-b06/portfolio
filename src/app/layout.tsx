import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Ayush Bhujle — Software Engineer & Builder',
  description: 'CS @ UC Berkeley · Building with AI. Software Engineer focused on full-stack engineering and AI systems.',
  keywords: ['Software Engineer', 'UC Berkeley', 'AI', 'Full-Stack', 'Next.js', 'Machine Learning'],
  authors: [{ name: 'Ayush Bhujle' }],
  openGraph: {
    title: 'Ayush Bhujle — Software Engineer & Builder',
    description: 'CS @ UC Berkeley · Building with AI.',
    type: 'website',
    url: 'https://ayushbhujle.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Bhujle — Software Engineer & Builder',
    description: 'CS @ UC Berkeley · Building with AI.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
