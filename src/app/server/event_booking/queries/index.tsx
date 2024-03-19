/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server"

// http client
import { cache } from "react"
// navigation and response
// import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
// set to specific server client with event booking schema type
import { createClient } from "@/utils/supabase/event_server"

import { type Database } from "@/types/db.booking.types"
// utils
import { getURL } from "@/lib/utils"

// -------------------- Database Types -------------------- //
let EventBase: Database["event_booking"]["Tables"]["events"]["Row"]
type Events = typeof EventBase
let SlotBase: Database["event_booking"]["Tables"]["slots"]["Row"]
type Slots = typeof SlotBase
let BookingBase: Database["event_booking"]["Tables"]["bookings"]["Row"]
type Bookings = typeof BookingBase
let TicketBase: Database["event_booking"]["Tables"]["tickets"]["Row"]
type Tickets = typeof TicketBase
// -------------------- Queries -------------------- //

const createServerClient = cache(() => {
  const cookieStore = cookies()
  return createClient(cookieStore)
})

interface SelectEventProps {
  id?: string
  name?: string
  labels?: string[]
  queryType: "byId" | "byName" | "all" | "byLabels"
}

export async function selectEvent(props: SelectEventProps) {
  cookies()
  const supabase = createServerClient()
  const domainUrl = getURL()
  const reqUrl = new URL("/dashboard", domainUrl)

  let query = supabase
    .schema("event_booking")
    .from("events")
    .select(
      "id, title, description, location, start_date, end_date, price, recurring_event, event_status, event_type"
    )
    .returns<Events>()

  if (props.queryType === "byId") {
    //@ts-expect-error This is intentionally to check if the id is passed.
    query = query.eq("id", props.id).single()
  } else if (props.queryType === "byName") {
    //@ts-expect-error This is intentionally.
    query = query.eq("name", props.name)
  }

  const { data, error } = await query

  if (error) {
    console.log("error", error)
    reqUrl.searchParams.set("error", error.message)
    redirect(reqUrl.href)
  }
  return data
}

export async function selectSlots(id: string) {
  const supabase = createServerClient()
  const domainUrl = getURL()
  const reqUrl = new URL("/dashboard", domainUrl)

  const { data, error } = await supabase
    .schema("event_booking")
    .from("slots")
    .select("*")
    .eq("event_id", id)

  if (error) {
    console.log("error", error)
    reqUrl.searchParams.set("error", error.message)
    redirect(reqUrl.href)
  }
  return data as Slots[]
}

interface SelectBookingProps {
  userId?: string
  eventId?: string
  bookingId?: string
  queryType: "byId" | "byEventId" | "byUserId"
}

export async function selectBooking(props: SelectBookingProps) {
  const supabase = createServerClient()
  const domainUrl = getURL()
  const reqUrl = new URL("/dashboard", domainUrl)

  let query = supabase
    .schema("event_booking")
    .from("bookings")
    .select("*")
    .returns<Bookings>()

  if (props.queryType === "byId") {
    query = query
      .select("*")
      //@ts-expect-error This is intentionally.
      .eq("id", props.bookingId)
      .single()
      .returns<Bookings>()
  } else if (props.queryType === "byEventId") {
    //@ts-expect-error This is intentionally.
    query = query.select("*").eq("event_id", props.eventId).returns<Bookings>()
  } else if (props.queryType === "byUserId") {
    //@ts-expect-error This is intentionally.
    query = query.select("*").eq("user_id", props.userId).returns<Bookings>()
  }

  const { data, error } = await query

  if (error) {
    console.log("error", error)
    reqUrl.searchParams.set("error", error.message)
    redirect(reqUrl.href)
  }
  return data
}

interface selectTicketsProps {
  eventId?: string
  ticketId?: string
  slotId?: string
  queryType: "id" | "byEventId" | "bySlotId"
}

export async function selectTickets(props: selectTicketsProps) {
  const supabase = createServerClient()
  const domainUrl = getURL()
  const reqUrl = new URL("/dashboard", domainUrl)

  let query = supabase
    .schema("event_booking")
    .from("tickets")
    .select("*")
    .returns<Tickets>()

  if (props.queryType === "id") {
    // @ts-expect-error This is intentionally.
    query = query.eq("id", props.ticketId).single().returns<Tickets>()
  } else if (props.queryType === "byEventId") {
    // @ts-expect-error This is intentionally.
    query = query.eq("event_id", props.eventId).returns<Tickets>()
  } else if (props.queryType === "bySlotId") {
    // @ts-expect-error This is intentionally.
    query = query.eq("slot_id", props.slotId).returns<Tickets>()
  }

  const { data, error } = await query

  if (error) {
    console.log("error", error)
    reqUrl.searchParams.set("error", error.message)
    redirect
  }
  return data as unknown as Tickets[]
}

export async function selectEventImages() {
  const supabase = createServerClient()
  const domainUrl = getURL()
  const reqUrl = new URL("/dashboard", domainUrl)

  const { data, error } = await supabase
    .schema("event_booking")
    .from("event_images")
    .select("event_id, image_id, image_url, caption, metadata")

  if (error) {
    console.log("error", error)
    reqUrl.searchParams.set("error", error.message)
    redirect(reqUrl.href)
  }
  console.log("data from select event images", data.length)
  return data
}

//query example with inner join
export async function selectEventWImages(id: string) {
  console.log("id", id)
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("event_images")
    .select(
      `
    *,
    events!inner(id)
  `
    )
    .eq("events.id", id)
    .order("created_at", { ascending: false }) // Assuming you want to order by the 'created_at' field in the events table

  if (error) {
    console.log("error from selectEventWImages", error)
    throw new Error(error.message)
    // reqUrl.searchParams.set("error", error.message)
    // redirect(reqUrl.href)
  }
  return data
}

export async function queryEventAndImagesByRef(id: string) {
  const supabase = createServerClient()

  console.log("id", id)

  const { data, error } = await supabase
    .from("events")
    .select(
      `id, title, price, description, location, start_date, end_date, event_images(image_id, caption, metadata, image_url, event_id)`
    )
    .eq("id", id.toString())
    .single()

  if (error) {
    console.log("error on query by ref", error)
    throw new Error(error.message)
  }

  // console.log("Data from query by ref: ", data)

  return data
}
