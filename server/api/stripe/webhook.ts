import { PrismaClient } from '@prisma/client'
import { stripe } from '~/server/utils/stripe'

const prisma = new PrismaClient()
export default eventHandler(async event => {
  console.log('in webhook endpoint')
  const body = await readRawBody(event, false)
  let stripeEvent: any = body
  let subscription

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

  // Handle the event
  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      console.log(stripeEvent.data.object)
      subscription = stripeEvent.data.object

      await prisma.account.update({
        where: {
          stripe_customer_id: subscription.customer,
        },
        data: {
          is_subscribed: true,
        },
      })
    default:
      console.log(`Unhandled event type ${stripeEvent.type}.`)
  }
  // Return a 200 response to acknowledge receipt of the event
  return { received: true }
})
