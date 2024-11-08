import './globals.css'
import { QueryProvider, SessionProvider } from '@/components/providers'
import { Compose } from '@/components/utils/compose'
import { type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export default ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Compose components={[SessionProvider, QueryProvider]}>{children}</Compose>
        <Toaster />
      </body>
    </html>
  )
}
