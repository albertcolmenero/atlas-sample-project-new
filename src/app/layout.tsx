import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { AtlasClientProvider } from '@/atlas/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Atlas Sample App',
  description: 'Showcase of Atlas SDK capabilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AtlasClientProvider>
            {children}
          </AtlasClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
