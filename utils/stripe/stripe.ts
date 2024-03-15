import "server-only"

import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-10-16",
  appInfo: {
    name: "aptus payments platform",
    url: "https://nextjs-with-stripe-typescript-demo.vercel.app",
  },
})

// The Stripe Node library provides convenient access to the Stripe API from applications
// written in server - side JavaScript.
