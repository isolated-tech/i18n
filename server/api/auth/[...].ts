import GithubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'
import EmailProvider from 'next-auth/providers/email'

import { NuxtAuthHandler } from '#auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const runtimeConfig = useRuntimeConfig()
const prisma = new PrismaClient().$extends(withAccelerate())
// const prisma = new PrismaClient()

export function mapExpiresAt(account: any): any {
  const expires_at: number = parseInt(account.expires_at)
  return {
    ...account,
    expires_at,
  }
}

export default NuxtAuthHandler({
  secret: runtimeConfig.AUTH_SECRET,
  adapter: {
    ...PrismaAdapter(prisma),
    async linkAccount(account) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: account.userId,
        },
      })

      const customer = await stripe.customers.create({
        email: user.email,
      })

      const result = await prisma.account.create({
        data: {
          ...account,
          stripe_customer_id: customer.id,
        },
        select: {
          userId: true,
          provider: true,
          type: true,
          providerAccountId: true,
          access_token: true,
          expires_at: true,
          refresh_token: true,
          id_token: true,
          scope: true,
          token_type: true,
        },
      })

      return mapExpiresAt(result)
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-expect-error
    GithubProvider.default({
      allowDangerousEmailAccountLinking: true,
      clientId: runtimeConfig.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
    }),
    // @ts-expect-error
    TwitterProvider.default({
      allowDangerousEmailAccountLinking: true,
      clientId: runtimeConfig.TWITTER_API_KEY,
      clientSecret: runtimeConfig.TWITTER_API_SECRET_KEY,
    }),
    // @ts-expect-error
    EmailProvider.default({
      allowDangerousEmailAccountLinking: true,
      server: {
        host: runtimeConfig.EMAIL_SERVER_HOST,
        port: parseInt(runtimeConfig.EMAIL_SERVER_PORT),
        auth: {
          user: runtimeConfig.EMAIL_SERVER_USER,
          pass: runtimeConfig.EMAIL_SERVER_PASSWORD,
        },
      },
      from: runtimeConfig.EMAIL_FROM,
    }),
  ],
  callbacks: {
    // Adding subscription status to default useAuth data object.
    async session({ session }) {
      if (session.user?.email) {
        const accounts = await prisma.account.findMany({
          where: {
            user: {
              email: session.user?.email,
            },
          },
          cacheStrategy: { ttl: 60 },
        })

        if (accounts.length) {
          return {
            ...session,
            user: {
              ...session.user,
              is_subscribed: accounts[0].is_subscribed ?? false,
              subscription_expiration:
                accounts[0].subscription_expiration ?? '',
            },
          }
        }
      }

      return {
        ...session,
        user: {
          ...session.user,
          is_subscribed: false,
        },
      }
    },
  },
})
