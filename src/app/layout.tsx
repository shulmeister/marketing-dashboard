import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MaterialUIControllerProvider } from '@/context/MaterialUIContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marketing Dashboard',
  description: 'Comprehensive marketing analytics dashboard for Facebook Ads, Mailchimp, Google Ads, and Google Analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MaterialUIControllerProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </MaterialUIControllerProvider>
      </body>
    </html>
  )
}
