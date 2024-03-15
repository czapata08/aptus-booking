import { type Elysia } from "elysia"

import { GuestModel } from "./guest.model"
import { handleGuestProfile } from "./guest.service"

export function guestController(app: Elysia<string>) {
  app
    .use(GuestModel)
    .guard({
      body: "guest",
    })
    .post("/tock/guests", async ({ body }) => {
      const res = await handleGuestProfile(body)

      // console.log('Res from function handleGuestProfile on tock route: ', res);

      return res
    })
    .onError(({ code }) => {
      if (code === "NOT_FOUND") {
        console.log("code", code)
        return "<--- Route not found for guest route :( --->"
      }
    })
}

//You can trigger a request programmatically using Elysia.handle
// Elysia.handle is a function to process an actual request sent to the server.
// Unlike unit test's mock, you can expect it to behave like an actual request sent to the server.
// Elysia.handle is useful for simulating or creating unit tests.

// app.handle(new Request('http://localhost/')).then(console.log)
