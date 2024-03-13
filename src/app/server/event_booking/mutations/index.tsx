"use server"

// not longer using the redirect pattern to handle func responses - handling responses with toast inside the calling component
// import { getURL } from "@/lib/utils"
// import { redirect } from "next/navigation"
// navigation and response
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/event_server"

//types
// import { Database } from "@/types/db.booking.types"
import {
  bookingSchema,
  // eventImgSchema,
  eventLabelsSchema,
  eventSchema,
  labelsSchema,
  slotSchema,
  ticketsSchema,
} from "@/app/server/event_booking/schemas"
//types
import type {
  CreateBookingProps,
  // CreateEventImgProps,
  CreateEventProps,
  CreateLabelsProps,
  CreateSlotProps,
  CreateTicketsProps,
  LinkEventWithLabelsProps,
} from "@/app/server/event_booking/schemas"

//[note] : removed react.cache to see if cookie bug is fixed
const createServerClient = () => {
  const cookieStore = cookies()
  return createClient(cookieStore)
}

export async function insertEvent({ event }: { event: CreateEventProps }) {
  const supabase = createServerClient()
  const validated = eventSchema.safeParse(event)

  if (!validated.success) {
    console.log("error", validated.error.flatten().fieldErrors)

    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
  }

  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        title: event.title,
        description: event.description,
        price: event.price,
        event_type: event.event_type,
        event_status: event.event_status,
        start_date: event.start_date.toISOString(),
        end_date: event.end_date.toISOString(),
        location: event.location,
        recurring_event: event.recurring_event,
      },
    ])
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

export async function insertSlot(data: CreateSlotProps) {
  const supabase = createServerClient()

  const validated = slotSchema.safeParse(data)

  if (!validated.success) {
    console.log("error", validated.error.flatten().fieldErrors)
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
  }

  const { error, data: slotId } = await supabase
    .schema("event_booking")
    .from("slots")
    .insert([
      {
        ...data,
        slot_date: data.slot_date.toISOString(),
      },
    ])
    .select("slot_id")
    .single()

  if (error) {
    console.log("error from inser slot", error)
    throw new Error(error.message)
  }

  if (slotId) {
    return slotId
  }

  revalidatePath("/dashboard", "layout")
}

export async function insertTickets(data: CreateTicketsProps) {
  const supabase = createServerClient()
  const validated = ticketsSchema.safeParse(data)

  if (!validated.success) {
    console.log("error", validated.error.flatten().fieldErrors)
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
  }

  const { error, data: ticketsId } = await supabase
    .schema("event_booking")
    .from("tickets")
    .insert([data])
    .select("ticket_id")
    .single()

  if (error) {
    console.log("error", error)
    throw new Error(error.message)
  }

  if (ticketsId) {
    return ticketsId
  }

  revalidatePath("/dashboard", "layout")
}

export async function insertBooking(data: Omit<CreateBookingProps, "user_id">) {
  const supabase = createServerClient()
  const validated = bookingSchema.safeParse(data)

  const { data: user } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User is not authenticated")
  }

  if (!validated.success) {
    console.log("error", validated.error.flatten().fieldErrors)
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
  }

  const { error, data: bookingId } = await supabase
    .schema("event_booking")
    .from("bookings")
    .insert([
      {
        ...data,
        // @ts-expect-error user is not null
        user_id: user?.id as string,
      },
    ])
    .select("id")
    .single()

  if (error) {
    console.log("error", error)
    throw new Error(error.message)
  }

  if (bookingId) {
    return bookingId
  }

  revalidatePath("/dashboard", "layout")
}

export async function insertLabel(data: CreateLabelsProps) {
  const supabase = createServerClient()

  const validated = labelsSchema.safeParse(data)

  if (!validated.success) {
    console.log("error", validated.error.flatten().fieldErrors)
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
  }

  const { error, data: labelId } = await supabase
    .schema("event_booking")
    .from("labels")
    .insert([data])
    .select("id")
    .single()

  if (error) {
    console.log("error", error)
    throw new Error(error.message)
  }

  if (labelId) {
    return labelId
  }

  revalidatePath("/dashboard", "layout")
}

export async function linkEventWithLabels(data: LinkEventWithLabelsProps) {
  const supabase = createServerClient()

  const validated = eventLabelsSchema.safeParse(data)

  if (!validated.success) {
    console.log("error", validated.error.flatten().fieldErrors)
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
  }

  const { error, data: labelLinkId } = await supabase
    .schema("event_booking")
    .from("event_labels")
    .insert([data])
    .select("id")
    .single()

  if (error) {
    console.log("error on linkEventWithLabels", error)
    throw new Error(error.message)
  }

  if (labelLinkId) {
    return labelLinkId
  }

  revalidatePath("/dashboard", "layout")
}

// ------------------ Redirect Url With Search Params For Response Handling ------------------
// : Promise<void | { error: string }>
// const domainUrl = getURL()
// const reqUrl = new URL("/dashboard", domainUrl)
// schema validation error handling
// reqUrl.searchParams.set(
//   "error",
//   JSON.stringify(validated.error.flatten().fieldErrors)
// )
// redirect(reqUrl.href)
// function error handling
// reqUrl.searchParams.set("error", error.message)
// redirect(reqUrl.href)
// success handling
// const eventUrl = new URL(`/dashboard/${event.id}`, domainUrl)
// eventUrl.searchParams.set("rowId", event.id)
// eventUrl.searchParams.set("bucketId", "event_images")
// console.log("eventUrl", eventUrl.href)
// redirect(eventUrl.href)

//simple query -- tested and working but moved to inser and update functions
// const { error, data: eventData } = await supabase
//   .from("events")
//   .insert([
//     {
//       title: data.title,
//       description: data.description,
//       price: data.price,
//       event_type: data.event_type,
//       event_status: data.event_status,
//       start_date: data.start_date.toISOString(),
//       end_date: data.end_date.toISOString(),
//       location: data.location,
//       recurring_event: data.recurring_event,
//     },
//   ])
//   .select("id")
//   .single()

// if (error) {
//   console.log("error", error)
//   throw new Error(error.message)
// }

// if (eventData?.id) {
//   return eventData.id
// }
