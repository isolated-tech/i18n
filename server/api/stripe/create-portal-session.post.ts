import { stripe } from '~/server/utils/stripe'
import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async event => {
  const session = await getServerSession(event)

  if (session && session.user.email) {
    const account = await prisma.account.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
      },
    })

    if (account && account.stripe_customer_id) {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: account.stripe_customer_id,
        return_url: useRuntimeConfig().BASE_URL,
      })

      // await sendRedirect(event, portalSession.url, 303)
      return { url: portalSession.url }
    }
  }
})
