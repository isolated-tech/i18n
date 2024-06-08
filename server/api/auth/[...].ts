// import GithubProvider from 'next-auth/providers/github'
// import { NuxtAuthHandler } from '#auth'
// import { PrismaAdapter } from '@next-auth/prisma-adapter'

// import { getAccountsByEmail } from '~/server/utils/queries/getAccountsByEmail'
// import { PrismaClient } from '@prisma/client'

// const runtimeConfig = useRuntimeConfig()
// const prisma = new PrismaClient()

// export function mapExpiresAt(account: any): any {
//   const expires_at: number = parseInt(account.expires_at)
//   return {
//     ...account,
//     expires_at,
//   }
// }

// export default NuxtAuthHandler({
//   secret: runtimeConfig.AUTH_SECRET,
//   adapter: {
//     ...PrismaAdapter(prisma),
//     async linkAccount(account) {
//       const user = await prisma.user.findUniqueOrThrow({
//         where: {
//           id: account.userId,
//         },
//       })

//       const customer = await stripe.customers.create({
//         email: user.email,
//       })

//       const result = await prisma.account.create({
//         data: {
//           ...account,
//           stripe_customer_id: customer.id,
//         },
//         select: {
//           id: true,
//           userId: true,
//           provider: true,
//           type: true,
//           providerAccountId: true,
//           access_token: true,
//           expires_at: true,
//           refresh_token: true,
//           id_token: true,
//           scope: true,
//           token_type: true,
//         },
//       })

//       return mapExpiresAt(result)
//     },
//   },
//   pages: {
//     signIn: '/login',
//   },
//   providers: [
//     // @ts-expect-error
//     GithubProvider.default({
//       clientId: runtimeConfig.GITHUB_CLIENT_ID,
//       clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     // Adding subscription status to default useAuth data object.
//     async session({ session }) {
//       if (session.user?.email) {
//         const accounts = await getAccountsByEmail(session.user.email)

//         return {
//           ...session,
//           user: {
//             ...session.user,
//             is_subscribed: accounts[0].is_subscribed,
//             subscription_expiration: accounts[0].subscription_expiration,
//           },
//         }
//       }

//       return {
//         ...session,
//         user: {
//           ...session.user,
//           is_subscribed: undefined,
//         },
//       }
//     },
//   },
// })
