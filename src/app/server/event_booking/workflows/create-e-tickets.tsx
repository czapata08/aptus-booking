"use server"

import { createStripeProduct } from "../../stripe/mutations"
import { insertSlot, insertTickets } from "../mutations"
import type { CreateSlotWithTicketsProps, CreateTicketsProps } from "../schemas"

export async function createETickets(data: CreateTicketsProps) {
  try {
    const ticket = await insertTickets({
      event_id: data.event_id,
      slot_id: data.slot_id,
      ticket_name: data.ticket_name,
      total_tickets: data.total_tickets,
      ticket_price: data.ticket_price,
      stripe_price_id: null,
      sold_tickets: 0,
    })

    if (ticket) {
      const stripeProduct = await createStripeProduct({
        name: data.ticket_name,
        price: data.ticket_price,
        slot_id: data.slot_id,
        event_id: data.event_id,
        ticket_id: ticket.ticket_id,
        description: data.ticket_name,
      })

      return stripeProduct
    }
  } catch (error) {
    console.log("error on create tickets simple", error)
    throw new Error("Error creating e-tickets")
  }
}

export async function createETicketsArr(
  data: CreateTicketsProps | CreateTicketsProps[]
): Promise<{ itemsAdded: string[]; errors: string[] }> {
  // Normalize input data to an array to simplify processing logic
  const normalizedData = Array.isArray(data) ? data : [data]
  const itemsAdded: string[] = []
  const errors: string[] = []

  try {
    for (const ticketData of normalizedData) {
      const stripeProduct = await createStripeProduct({
        name: ticketData.ticket_name,
        price: ticketData.ticket_price,
        slot_id: ticketData.slot_id,
        event_id: ticketData.event_id,
        description: ticketData.ticket_name,
      })

      if (stripeProduct.id) {
        const ticket = await insertTickets({
          event_id: ticketData.event_id,
          slot_id: ticketData.slot_id,
          ticket_name: ticketData.ticket_name,
          total_tickets: ticketData.total_tickets,
          ticket_price: ticketData.ticket_price,
          stripe_price_id: stripeProduct.id,
          sold_tickets: 0,
        })

        //fix this
        itemsAdded.push(ticket?.ticket_id ?? "")
      }
    }
  } catch (error) {
    console.log("error on createTicketsArray action", error)
    errors.push(JSON.stringify(error))
    // throw new Error("Error creating e-tickets") --this will stop execution
  }
  return { itemsAdded, errors }
}

export async function createSlotWTickets(data: CreateSlotWithTicketsProps) {
  console.log("data from createSlotWTickets", data)
  try {
    for (const slot of data.slots) {
      const slotId = await insertSlot({
        event_id: data.event_id,
        slot_date: slot.slot_date,
        start_time: slot.start_time,
        end_time: slot.end_time,
        tickets_available: slot.slot_size,
      })

      if (slotId?.slot_id) {
        for (const ticket of slot.tickets) {
          console.log("ticket from createSlotWTickets", ticket)
          const promise = await createETickets({
            event_id: data.event_id,
            slot_id: slotId.slot_id,
            ticket_name: ticket.ticket_name,
            total_tickets: ticket.total_tickets,
            ticket_price: ticket.ticket_price,
            sold_tickets: 0,
          })
          console.log("data returned from createETicket", promise)
        }
      }
    }
  } catch (error) {
    console.log("error on createSlotWTickets", error)

    throw new Error("Error creating slots, please check your inputs.")
  }
  return { data: "Slot with tickets created successfully." }
}
