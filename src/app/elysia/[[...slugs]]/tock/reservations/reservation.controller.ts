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
      if (code) {
        console.log("error code on reservation controller: ", code)
      }
      // switch (code) {
      //   case "NOT_FOUND":
      //     return {
      //       status: 400,
      //       message: "Route not found for reservation route :(",
      //     }

      //   case "VALIDATION":
      //     return {
      //       status: 400,
      //       message: code,
      //     }

      //   case "PARSE":
      //     return { status: 400, message: "Error parsing reservation request." }

      //   case "UNKNOWN":
      //     return { status: 500, message: "An unknown error occurred." }

      //   case "INTERNAL_SERVER_ERROR":
      //     return { status: 500, message: "Internal server error." }

      //   default:
      //     return { status: 500, message: "An unexpected error occurred." }
      // }
    })
}
