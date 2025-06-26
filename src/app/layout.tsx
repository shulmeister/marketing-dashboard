import MaterialUIControllerProvider from '@/context/MaterialUIContext'
import './globals.css'
import type { ReactNode } from 'react'

// Force redeploy - layout with corrected imports

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MaterialUIControllerProvider>
          {children}
        </MaterialUIControllerProvider>
      </body>
    </html>
  )
}