/* eslint-disable @typescript-eslint/no-base-to-string */

import { Elysia, t } from "elysia";
import { reservationController } from "./_tock/reservations/reservation.controller"
import { guestController } from "./_tock/guest/guest.controller"
import { authHandler } from "./_auth/jwt-auth.handler";
import { AuthenticationError } from "./_errors/authentication.error"
import { AuthorizationError } from "./_errors/authorization.error";
import { apiMiddleware } from "./_middleware/api.middleware";
import { jwt } from "@elysiajs/jwt";

const app = new Elysia({ prefix: '/elysia' })
.error('AUTHENTICATION_ERROR', AuthenticationError)
.error('AUTHORIZATION_ERROR', AuthorizationError)
.onError(({ code, error, set }) => {
    switch (code) {
      case 'AUTHENTICATION_ERROR':
        set.status = 401
        return {
          status: "error",
          message: error.toString().replace("Error: ", "")
        }
      case 'AUTHORIZATION_ERROR':
        set.status = 403
        return {
          status: "error",
          message: error.toString().replace("Error: ", "")
        }
    
      case 'NOT_FOUND':
        set.status = 404
        return {
          status: "error",
          message: error.toString().replace("Error: ", "")
        }
      case 'INTERNAL_SERVER_ERROR':
        set.status = 500
        return {
          status: "error",
          message: "Something went wrong!"
        }
    }
})
app.use(
  jwt({
  name: 'jwt',
  secret: process.env.ELYSIA_TOCK_SERVER_SECRET_KEY!,
  }))
app.guard({
    headers: t.Object({
        authorization: t.String()
    })
})
app.use(apiMiddleware)       
//use controllers < in elysia this are handlers>
// @ts-expect-error app type
guestController(app)
// @ts-expect-error app type
reservationController(app)
// @ts-expect-error app type
authHandler(app)

//Compile the elysia application before incoming requests
app.compile()

export const POST = app.handle



