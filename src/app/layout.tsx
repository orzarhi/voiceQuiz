import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/Toaster'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Voice Quiz',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className={inter.className}>
        <Providers>
          <main className='container h-full px-1.5 pt-8 mx-auto max-w-5xl'>
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
