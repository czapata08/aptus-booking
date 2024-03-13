"use server"

import { headers } from "next/headers"
import { CURRENCY } from "@/utils/stripe/config"
import { stripe } from "@/utils/stripe/stripe"
import { formatAmountForStripe } from "@/utils/stripe/stripe-helpers"
import type { Stripe } from "stripe"
import { z } from "zod"

const productSchema = z.object({
  name: z.string(),
  price: z.number(),
  slot_id: z.string(),
  event_id: z.string().optional(),
  ticket_id: z.string().optional(),
  description: z.string().optional(),
})
type Product = z.infer<typeof productSchema>

export async function createStripeProduct(productData: Product) {
  const validated = productSchema.parse(productData)

  try {
    // Create a new Stripe product
    const stripeProduct = await stripe.products.create({
      name: validated.name,
      description: validated.description,
      default_price_data: {
        unit_amount: Number(validated.price) * 100,
        currency: "usd",
      },
      metadata: {
        slot_id: validated.slot_id,
        event_id: validated.event_id ?? null,
        ticket_id: validated.ticket_id ?? null,
      },
    })

    if (stripeProduct.id && stripeProduct.default_price)
      console.log("Stripe product Inserted: ", stripeProduct)
    return { id: stripeProduct.id }
  } catch (error) {
    console.log("Error creating Stripe product: ", error)
    throw new Error("Error creating Stripe product")
  }
}

const priceSchema = z.object({
  variant_id: z.string(),
  description: z.string(),
  price: z.number(),
  name: z.string(),
  active: z.boolean(),
})

type Price = z.infer<typeof priceSchema>

export async function createStripePrice(priceData: Price) {
  const validated = priceSchema.parse(priceData)

  //the problem of products created is in passing products_data

  const stripePrice = await stripe.prices.create({
    unit_amount: Number(validated.price * 100),
    currency: "usd",
    product_data: {
      name: validated.name,
      active: validated.active ?? true,
      metadata: {
        variant_id: validated.variant_id,
        variant_description: validated.description,
      },
    },
  })

  if (stripePrice && stripePrice.id) {
    return { id: stripePrice.id }
  }
}

const updatePriceSchema = z.object({
  variant_id: z.string(),
  active: z.boolean().optional(),
})

type UpdatePrice = z.infer<typeof updatePriceSchema>
type UseCase = "updateStatus" | "updateVariantId"

export async function updateStripePrice(
  priceId: string,
  updateData: UpdatePrice,
  useCase: UseCase
) {
  if (!priceId) throw new Error("No price id provided")
  const validated = updatePriceSchema.parse(updateData)

  if (useCase === "updateStatus") {
    const update = await stripe.prices.update(priceId, {
      active: validated.active ?? true,
    })
    return update
  } else if (useCase === "updateVariantId") {
    const update = await stripe.prices.update(priceId, {
      metadata: {
        variant_id: validated.variant_id,
      },
    })
    return update
  }
}

export async function createCheckoutSession(
  data: FormData
): Promise<{ client_secret: string | null; url: string | null }> {
  console.log("data from createCheckoutSession: ", data)
  const ui_mode = data.get(
    "uiMode"
  ) as Stripe.Checkout.SessionCreateParams.UiMode

  const origin: string = headers().get("origin")!

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Custom amount donation",
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("customDonation") as string),
              CURRENCY
            ),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/events`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    })

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  }
}

export async function createPaymentIntent(
  data: FormData
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation") as string),
        CURRENCY
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    })

  return { client_secret: paymentIntent.client_secret! }
}

// https://docs.stripe.com/checkout/embedded/quickstart
// https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/app/actions/stripe.ts#L11
