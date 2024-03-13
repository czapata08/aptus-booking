"use server"

import { createClient } from "@supabase/supabase-js"

import type { Database } from "@/types/db.booking.types"

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: "event_booking",
    },
  }
)

export async function selectAllEvents() {
  const { data, error } = await supabase.from("events").select("*")

  if (error) {
    throw new Error("select all events " + error.message)
  }

  return data
}

export async function selectEventById(id: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    throw new Error("select event by id query: " + error.message)
  }

  return data
}

export async function selectSlotsByEventId(eventId: string) {
  const { data, error } = await supabase
    .from("slots")
    .select("*")
    .eq("event_id", eventId)
    .order("start_time", { ascending: true })

  if (error) {
    throw new Error("select event by id query " + error.message)
  }

  return data
}

export async function selectEventLabels() {
  const { data, error } = await supabase.from("event_labels").select("*")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function selectEventImages() {
  const { data, error } = await supabase
    .schema("event_booking")
    .from("event_images")
    .select("event_id, image_id, image_url, caption, metadata")

  if (error) {
    console.log("error", error)
    throw new Error(error.message)
  }

  return data
}

//modify to only get one random image or the one that is is_main_image === true
export async function selectAEventsWithImages() {
  const { data, error } = await supabase
    .from("events")
    .select(
      `*, event_images(image_id, image_url, caption, metadata, event_id, is_main_image)`
    )

  if (error) {
    throw new Error(error.message)
  }

  return data
}
