"use server"

import type { CreateCheckoutProps } from "../schemas"
import { checkoutSchema } from "../schemas"

export async function processCheckout(data: CreateCheckoutProps) {
  console.log("Data from processCheckout", data)

  const validated = checkoutSchema.safeParse(data)

  if (!validated.success) {
    console.log("error", validated.error.flatten().fieldErrors)
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
  }

  return "Data from processCheckout validated successfully."
}
