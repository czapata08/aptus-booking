/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// due to jwt and body being of type any
import { t, type Elysia } from "elysia"

export function authHandler(app: Elysia<string>) {
  app
    .guard({
      body: t.Object({
        service_id: t.String(),
        user_id: t.String(),
      }),
    })
    //  @ts-expect-error jwt type error 
    .post("/generate-token", async ({ jwt, body }) => {
      const token = await jwt.sign(body)
      return {
        token,
      }
    })
    .onError(({ code }) => {
      console.log("Error on auth route", code)
      if (code === "NOT_FOUND") {
        console.log("code", code)
        return "<--- Route not found for guest route :( --->"
      }
    })
}
