import { createClient } from "@supabase/supabase-js"
import { type Database } from "types/db.booking.types"

import { type GuestProfile } from "./guest.types"

const insertGuestRequest = async (guestProfile: GuestProfile) => {
  const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    {
      db: { schema: "event_booking" },
    }
  )
  const { data, error } = await supabaseAdmin
    .from("tock_guests")
    .insert([
      {
        body: guestProfile,
        email: guestProfile.patron.email,
        tock_guest_id: guestProfile.id,
      },
    ])
    .select("id")
    .single()

  if (error) {
    console.log("Error on supabase", error)
    throw new Error(error.message)
  }

  return {
    message: `Guest Object inserted with id${data.id}`,
    status: 200,
  }
}

export async function handleGuestProfile(guestProfile: GuestProfile) {
  const insert = await insertGuestRequest(guestProfile)

  if (insert instanceof Error) {
    throw Error(insert.message)
  }

  return {
    insert,
  }
}
