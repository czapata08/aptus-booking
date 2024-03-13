"use client"

import React, { useState } from "react"
import * as config from "@/utils/stripe/config"
import getStripe from "@/utils/stripe/get-stripe"
import { formatAmountForDisplay } from "@/utils/stripe/stripe-helpers"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import type Stripe from "stripe"

import { createCheckoutSession } from "@/app/server/stripe/mutations"

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode
}

export function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const [loading] = useState<boolean>(false)
  const [input, setInput] = useState<{ customDonation: number }>({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  })
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ): void =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  const formAction = async (data: FormData): Promise<void> => {
    const uiMode = data.get(
      "uiMode"
    ) as Stripe.Checkout.SessionCreateParams.UiMode

    const { client_secret, url } = await createCheckoutSession(data)

    if (uiMode === "embedded") return setClientSecret(client_secret)

    window.location.assign(url!)
  }

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={props.uiMode} />
        {/* <label htmlFor="partySize">Party Size</label>
        <input type="number" name="partySize" />
        <label htmlFor="slotId">Slot ID</label>
        <input type="text" name="slotId" />
        <label htmlFor="eventId">Event ID</label>
        <input type="text" name="eventId" />
        <label htmlFor="customDonation">Custom Donation</label> */}
        <input
          hidden={true}
          type="number"
          name="customDonation"
          value={input.customDonation}
          onChange={handleInputChange}
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          // step={config.AMOUNT_STEP}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          disabled={loading}
        >
          Payment{" "}
          {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  )
}
