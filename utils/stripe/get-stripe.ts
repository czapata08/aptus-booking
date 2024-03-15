/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { loadStripe } from "@stripe/stripe-js"
import type { Stripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null> | undefined

export default function getStripe(): Promise<Stripe | null> {
  if (!stripePromise)
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

  return stripePromise
}
