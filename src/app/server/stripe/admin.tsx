import { toDateTime } from "@/utils/helpers"
import { stripe } from "@/utils/stripe/stripe"
import { createClient } from "@supabase/supabase-js"
import type Stripe from "stripe"

import type { Database, Tables, TablesInsert } from "@/types/database.types"

type Product = Tables<"products">
type Price = Tables<"prices">

// Change to control trial period length
const TRIAL_PERIOD_DAYS = 0

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
  const { error: upsertError } = await supabaseAdmin
    .from("customers")
    .upsert([{ id: uuid, stripe_customer_id: customerId }])

  if (upsertError)
    throw new Error(
      `Supabase customer record creation failed: ${JSON.stringify(upsertError)}`
    )

  return customerId
}

const createCustomerInStripe = async (uuid: string, email: string) => {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email }
  const newCustomer = await stripe.customers.create(customerData)
  if (!newCustomer) throw new Error("Stripe customer creation failed.")

  return newCustomer.id
}

const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string
  uuid: string
}) => {
  // Check if the customer already exists in Supabase
  const { data: existingSupabaseCustomer, error: queryError } =
    await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("id", uuid)
      .maybeSingle()

  if (queryError) {
    throw new Error(
      `Supabase customer lookup failed: ${JSON.stringify(queryError)}`
    )
  }

  // Retrieve the Stripe customer ID using the Supabase customer ID, with email fallback
  let stripeCustomerId: string | undefined
  if (existingSupabaseCustomer?.stripe_customer_id) {
    const existingStripeCustomer = await stripe.customers.retrieve(
      existingSupabaseCustomer.stripe_customer_id
    )
    stripeCustomerId = existingStripeCustomer.id
  } else {
    // If Stripe ID is missing from Supabase, try to retrieve Stripe customer ID by email
    const stripeCustomers = await stripe.customers.list({ email: email })
    stripeCustomerId =
      stripeCustomers.data.length > 0 ? stripeCustomers.data[0]?.id : undefined
  }

  // If still no stripeCustomerId, create a new customer in Stripe
  const stripeIdToInsert = stripeCustomerId
    ? stripeCustomerId
    : await createCustomerInStripe(uuid, email)
  if (!stripeIdToInsert) throw new Error("Stripe customer creation failed.")

  if (existingSupabaseCustomer && stripeCustomerId) {
    // If Supabase has a record but doesn't match Stripe, update Supabase record
    if (existingSupabaseCustomer.stripe_customer_id !== stripeCustomerId) {
      const { error: updateError } = await supabaseAdmin
        .from("customers")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", uuid)

      if (updateError)
        throw new Error(
          `Supabase customer record update failed: ${JSON.stringify(updateError)}`
        )
      console.warn(
        `Supabase customer record mismatched Stripe ID. Supabase record updated.`
      )
    }
    // If Supabase has a record and matches Stripe, return Stripe customer ID
    return stripeCustomerId
  } else {
    console.warn(
      `Supabase customer record was missing. A new record was created.`
    )

    // If Supabase has no record, create a new record and return Stripe customer ID
    const upsertedStripeCustomer = await upsertCustomerToSupabase(
      uuid,
      stripeIdToInsert
    )
    if (!upsertedStripeCustomer)
      throw new Error("Supabase customer record creation failed.")

    return upsertedStripeCustomer
  }
}

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string
  const { name, phone, address } = payment_method.billing_details
  if (!name || !phone || !address) return
  //@ts-expect-error - address is not a required field
  await stripe.customers.update(customer, { name, phone, address })
  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] },
    })
    .eq("id", uuid)
  if (updateError)
    throw new Error(`Customer update failed: ${JSON.stringify(updateError)}`)
}

// not using this function
const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (noCustomerError)
    throw new Error(
      `Customer lookup failed: ${JSON.stringify(noCustomerError)}`
    )

  const { id: uuid } = customerData

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  })
  // Upsert the latest status of the subscription object.
  const subscriptionData: TablesInsert<"subscriptions"> = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0]?.price.id,
    //TODO check quantity on subscription
    // @ts-expect-error - quantity is not a required field
    quantity: subscription.quantity as number,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? toDateTime(subscription.cancel_at).toISOString()
      : null,
    canceled_at: subscription.canceled_at
      ? toDateTime(subscription.canceled_at).toISOString()
      : null,
    current_period_start: toDateTime(
      subscription.current_period_start
    ).toISOString(),
    current_period_end: toDateTime(
      subscription.current_period_end
    ).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at
      ? toDateTime(subscription.ended_at).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? toDateTime(subscription.trial_start).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? toDateTime(subscription.trial_end).toISOString()
      : null,
  }

  const { error: upsertError } = await supabaseAdmin
    .from("subscriptions")
    .upsert([subscriptionData])
  if (upsertError)
    throw new Error(
      `Subscription insert/update failed: ${JSON.stringify(upsertError)}`
    )
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  )

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    )
}

export {
  // upsertProductRecord,
  // upsertPriceRecord,
  // deleteProductRecord,
  // deletePriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
}
