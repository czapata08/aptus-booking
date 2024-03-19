/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createClient } from "@supabase/supabase-js"
import { type Database } from "types/db.booking.types"

import { type Reservation } from "./reservation.types"

const insertReservationRequest = async (reservation: Reservation) => {
  const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    {
      db: { schema: "event_booking" },
    }
  )
  const { data, error } = await supabaseAdmin
    .from("tock_reservations")
    .insert([
      {
        body: reservation,
        reservation_id: reservation.id,
      },
    ])
    .select("id")
    .single()

  if (error) {
    console.log("Error on supabase", error)
    throw new Error(error.message)
  }

  return {
    message: `Object inserted with id${data.id}`,
    status: 200,
  }
}

export async function handleReservationService(reservation: Reservation) {
  // console.log("Reservation object from reservation controller", reservation);

  const insert = await insertReservationRequest(reservation)

  if (insert instanceof Error) {
    throw Error(insert.message)
  }

  if (insert?.message && insert?.status) {
    return insert
  }
}
