import { PrismaClient } from '@prisma/client'
import { stripe } from '~/server/utils/stripe'

const prisma = new PrismaClient()
export default eventHandler(async event => {
  const body = await readRawBody(event, false)
  let stripeEvent: any = body
  let subscription
  let status

  const signature = getHeader(event, 'stripe-signature')

  if (!body) {
    return { error: 'Invalid request body' }
  }

  if (!signature) {
    return { error: 'Invalid stripe-signature' }
  }

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      useRuntimeConfig().STRIPE_WEBHOOK_SECRET_KEY
    )
  } catch (err) {
    const error = createError({
      statusCode: 400,
      statusMessage: `Webhook error: ${err}`,
    })
    return sendError(event, error)
  }

  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 30)
  const thirtyDaysFromNow = currentDate.toISOString().split('T')[0]

  // Handle the event
  switch (stripeEvent.type) {
    case 'customer.subscription.deleted':
      subscription = stripeEvent.data.object
      status = subscription.status

      await prisma.account.update({
        where: {
          stripe_customer_id: subscription.customer,
        },
        data: {
          is_subscribed: false,
        },
      })

      break
    case 'customer.subscription.created':
      subscription = stripeEvent.data.object
      status = subscription.status

      await prisma.account.update({
        where: {
          stripe_customer_id: subscription.customer,
        },
        data: {
          is_subscribed: true,
          subscription_expiration: thirtyDaysFromNow,
        },
      })

      break
    case 'customer.subscription.updated':
      subscription = stripeEvent.data.object
      status = subscription.status

      console.log('subscription: ', subscription)
      console.log('status: ', status)

      // TODO: SET is_subscribed to true/false based on possible status values.
      break
    case 'invoice.payment_succeeded':
      subscription = stripeEvent.data.object
      status = subscription.status

      await prisma.account.update({
        where: {
          stripe_customer_id: subscription.customer,
        },
        data: {
          subscription_expiration: thirtyDaysFromNow,
        },
      })
    default:
      console.log(`Unhandled event type ${stripeEvent.type}.`)
  }
  // Return a 200 response to acknowledge receipt of the event
  return { received: true }
})
