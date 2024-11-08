import { auth } from '@/lib/server/auth'
import { type Session } from 'next-auth'
import { type ReactNode } from 'react'

type SignedInProps = {
  children?: ((session: Session) => ReactNode) | ReactNode
}
export const SignedIn = async ({ children }: SignedInProps) => {
  const session = await auth()
  return session ? typeof children === 'function' ? <>{children(session)}</> : <>{children}</> : <></>
}

type SignedOutProps = {
  children?: ReactNode
}
export const SignedOut = async ({ children }: SignedOutProps) => {
  const session = await auth()
  return !session ? <>{children}</> : <></>
}

type IsAdminProps = SignedInProps
export const IsAdmin = async ({ children }: IsAdminProps) => {
  const session = await auth()
  const isAdmin = session?.user.role === 'ADMIN'
  return isAdmin ? typeof children === 'function' ? <>{children(session)}</> : <>{children}</> : <></>
}

type NotAdminProps = SignedOutProps
export const NotAdmin = async ({ children }: NotAdminProps) => {
  const session = await auth()
  const isAdmin = session?.user.role === 'ADMIN'
  return !isAdmin ? <>{children}</> : <></>
}
