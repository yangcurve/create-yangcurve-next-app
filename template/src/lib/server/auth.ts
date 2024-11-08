import { db } from './db'
import { type USER_ROLE } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { type NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn, signOut } from 'next-auth/react'
import { z } from 'zod'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: USER_ROLE
      username: string
      email: string
    }
  }
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, { query }) => {
        if (!credentials) return null

        const { email, username, password } = credentials

        if (query?.type === 'signup')
          return await db.user.create({
            data: {
              email,
              username,
              password: await hash(password, 10),
            },
          })

        const user = await db.user.findUnique({ where: { email } })
        return user && (await compare(password, user.password)) ? user : null
      },
    }),
  ],
  callbacks: {
    jwt: ({ user, token }) => (user ? { ...token, ...user } : token),
    session: ({ token, session }) => ({
      ...session,
      user: {
        id: token.id as string,
        role: token.role as USER_ROLE,
        username: token.username as string,
        email: token.email as string,
      },
    }),
  },
} satisfies NextAuthOptions

export const auth = () => getServerSession(authOptions)

const createAuthHelper =
  <T extends z.ZodType>(type: 'signin' | 'signup', _Schema: T) =>
  (input: z.infer<T>) =>
    signIn(
      'credentials',
      {
        ...input,
        redirect: false,
      },
      { type },
    )

const SigninInputSchema = z.object({ email: z.string().email(), password: z.string() })
export const signin = createAuthHelper('signin', SigninInputSchema)

const SignupInputSchema = SigninInputSchema.extend({ username: z.string() })
export const signup = createAuthHelper('signup', SignupInputSchema)

export const signout = () => signOut({ callbackUrl: window.location.href, redirect: false })
