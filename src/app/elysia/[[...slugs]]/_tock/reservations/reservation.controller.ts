/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Elysia } from "elysia"

import { ReservationModelG } from "./reservation.model"
import { handleReservationService } from "./reservation.service"

export function reservationController(app: Elysia<any>) {
  app
    .use(ReservationModelG)
    .guard({ body: "reservation" })
    .post("/tock/reservations", async ({ body }) => {
      const res = await handleReservationService(body)
      return res
    })
    .onError(({ code }) => {
      console.log('Error on guest route', code)
      if (code === "NOT_FOUND") {
        console.log("code", code)
        return "<--- Route not found for guest route :( --->"
      }
    })
}
