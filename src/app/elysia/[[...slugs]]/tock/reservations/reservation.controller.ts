import { type Elysia } from "elysia"

import { ReservationModelG } from "./reservation.model"
import { handleReservationService } from "./reservation.service"

export function reservationController(app: Elysia<string>) {
  app
    .use(ReservationModelG)
    .guard({ body: "reservation" })
    .post("/tock/reservations", async ({ body }) => {
      const res = await handleReservationService(body)

      // console.log(
      //   "Res from function handleReservationService on tock route: ",
      //   res
      // );

      return res
    })
    .onError(({ code }) => {
      if (code === "NOT_FOUND") {
        console.log("code", code)
        return "<--- Route not found for reservation route:( --->"
      }
    })
}
