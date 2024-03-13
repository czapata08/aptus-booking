"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { stripe } from "@/utils/stripe/stripe"
import { formatAmountForStripe } from "@/utils/stripe/stripe-helpers"
import { createClient } from "@/utils/supabase/event_server"
import type { Stripe } from "stripe"

export async function checkoutWorkflow(data: unknown) {
  console.log("Checkout workflow data: ", data)

  return "data has been processed and sent to the server."
}

const createServerClient = () => {
  const cookieStore = cookies()
  return createClient(cookieStore)
}

// Tasks

// Check ticket inventory
// Insert booking data
// Insert booking notes data
// Insert into invite_friend if applicable

interface InviteFriendProps {
  slot_id: string
  email: string
  name: string
  phone: string
}

export async function insertInviteFriend(data: FormData) {
  const supabase = createServerClient()
  const slot_id = data.get("slot_id")
  const email = data.get("email")
  const name = data.get("name")
  const phone = data.get("phone")

  const { data: insert, error } = await supabase
    .from("invite_friend")
    .insert([
      {
        slot_id: slot_id,
        email: email,
        name: name,
        phone: phone,
      },
    ])
    .select("id")

  if (error) {
    throw new Error(error.message.toString())
  }

  if (insert) {
    console.log("Invite friend inserted: ", insert)
    return "Success"
  }
}

export async function insertBookingDetails(data: FormData) {
  const supabase = createServerClient()
  const guest_notes = data.get("guest_notes")
  const dietary_notes = data.get("dietary_notes")
  const is_celebration = data.get("is_celebration")
  const booking_id = data.get("booking_id")

  const { data: insert, error } = await supabase
    .from("booking_notes")
    .insert([
      {
        booking_id: booking_id,
        guest_notes: guest_notes,
        dietary_notes: dietary_notes,
        is_celebration: is_celebration,
      },
    ])
    .select("id")

  if (error) {
    throw new Error(error.message.toString())
  }

  if (insert) {
    console.log("Booking notes inserted: ", insert)
    return "Success"
  }

  revalidatePath("/dashboard", "layout")
}

interface UpdateTicketInventoryParams {
  slot_id?: string
  ticket_id: string
  quantity: number
  action: "increment" | "decrement"
}

export async function updateSlotTicketInventory({
  slot_id,
  ticket_id,
  quantity,
  action,
}: UpdateTicketInventoryParams): Promise<string> {
  const supabase = createServerClient()

  const { data: ticketInventory, error: ticketInventoryError } = await supabase
    .from("tickets")
    .select("total_tickets, sold_tickets") // Assuming you might also need 'sold_tickets' if adjusting inventory based on sales
    .match({ ticket_id })
    .single()

  if (ticketInventoryError) {
    throw new Error(ticketInventoryError.message)
  }

  if (!ticketInventory) {
    throw new Error("Ticket inventory not found")
  }

  // Assuming 'sold_tickets' is the field to update. Adjust if it's actually 'total_tickets'.
  let newInventory = Number(ticketInventory?.sold_tickets)
  if (action === "increment") {
    newInventory += quantity
  } else if (action === "decrement") {
    if (
      ticketInventory?.sold_tickets &&
      ticketInventory?.sold_tickets < quantity
    ) {
      throw new Error("Insufficient ticket inventory")
    }
    newInventory -= quantity
  }

  const { data, error } = await supabase
    .from("tickets")
    .update({
      // Update this field according to your actual use case
      sold_tickets: newInventory,
    })
    .match({ ticket_id })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  console.log("Ticket inventory updated: ", data)
  return "Success"
}
