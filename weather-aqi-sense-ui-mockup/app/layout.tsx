import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Thai } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

const notoThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-noto-thai',
})

export const metadata: Metadata = {
  title: 'WeatherAQI Sense — Weather & Air Quality Dashboard',
  description:
    'Clean bilingual (TH/EN) weather and air-quality dashboard with health advisory. CP352301 Final Project.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light ${inter.variable} ${notoThai.variable}`}
      style={{ colorScheme: 'light' }}
    >
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossOrigin=""></script>
      </head>
      <body
        className="antialiased"
        style={{
          backgroundColor: '#f8f9fa',
          fontFamily: 'var(--font-inter), var(--font-noto-thai), system-ui, sans-serif',
        }}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
