"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/event_server"
// import { getURL } from "@/lib/utils"
// import { redirect } from "next/navigation"
import { Database } from "@/types/db.booking.types"
import {
    bookingSchema,
    // eventImgSchema,
    eventLabelsSchema,
    eventSchema,
    labelsSchema,
    slotSchema,
    ticketsSchema,
} from "@/app/server/event_booking/schemas"
  
import type {
    CreateBookingProps,
    // CreateEventImgProps,
    CreateEventProps,
    CreateLabelsProps,
    CreateSlotProps,
    CreateTicketsProps,
    LinkEventWithLabelsProps,
  } from "@/app/server/event_booking/schemas"

const createServerClient = () => {
    const cookieStore = cookies()
    return createClient(cookieStore)
}
  

interface UpdateEventProps {
    eventId: string
    event: CreateEventProps
  }
  
  export async function updateEvent({ event, eventId }: UpdateEventProps) {
    const supabase = createServerClient()
    const validated = eventSchema.safeParse(event)
  
    if (!validated.success) {
      console.log("error", validated.error.flatten().fieldErrors)
  
      throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
    }
  
    const { data, error } = await supabase
      .from("events")
      .update({
        title: event.title,
        description: event.description,
        price: event.price,
        event_type: event.event_type,
        event_status: event.event_status,
        start_date: event.start_date.toISOString(),
        end_date: event.end_date.toISOString(),
        location: event.location,
        recurring_event: event.recurring_event,
      })
      .eq("id", eventId)
      .select("id")
      .single()
  
    if (error) {
      console.log("error", error)
      throw new Error(error.message)
    }
  
    if (data?.id) {
      revalidatePath("/", "layout")
      return data.id
    }
  
    revalidatePath("/", "layout")
  }

export interface UpdateSlotProps {
    slot: CreateSlotProps
    slotId: string
  }

  export async function updateSlot({slot, slotId}: UpdateSlotProps) {
    const supabase = createServerClient()
  
    const validated = slotSchema.safeParse(slot)
  
    if (!validated.success) {
      console.log("error", validated.error.flatten().fieldErrors)
      throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
    }
  
    const { error, data } = await supabase
        .schema("event_booking")
        .from("slots")
        .update({
            ...slot,
            slot_date: slot.slot_date.toISOString(),
        })
        .eq("slot_id", slotId)
        .select("slot_id")
        .single()

    if (error) {
        console.log("error from inser slot", error)
        throw new Error(error.message)
    }
      
    if (data) {
        revalidatePath("/", "layout")
        return data
    }
  
   
  
    revalidatePath("/", "layout")
  }


    export interface UpdateTicketsProps {
        ticket: CreateTicketsProps
        ticketId: string
    }

    export async function updateTickets({ticket, ticketId}: UpdateTicketsProps) {
        const supabase = createServerClient()
        const validated = ticketsSchema.safeParse(ticket)
    
        if (!validated.success) {
            console.log("error", validated.error.flatten().fieldErrors)
            throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
        }
    
        const { error, data } = await supabase
            .schema("event_booking")
            .from("tickets")
            .update({
                ticket_name: ticket.ticket_name,
                total_tickets: ticket.total_tickets,
                sold_tickets: ticket.sold_tickets,
                ticket_price: ticket.ticket_price,
                stripe_price_id: ticket.stripe_price_id,
            })
            .eq("ticket_id", ticketId)
            .select("ticket_id")
            .single()
    
        if (error) {
            console.log("error from inser slot", error)
            throw new Error(error.message)
        }
          
        if (data) {
            revalidatePath("/", "layout")
            return data.ticket_id
        }
      
        revalidatePath("/", "layout")
    }

    