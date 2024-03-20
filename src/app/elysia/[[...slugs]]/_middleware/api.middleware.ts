/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Elysia } from "elysia"

import { AuthenticationError } from "../_errors/authentication.error"
import { AuthorizationError } from "../_errors/authorization.error"

interface ValidatedToken {
  user_id: string
  service_id: string
}

export const apiMiddleware = async (app: Elysia<string>) =>
  // @ts-expect-error jwt types not inferred
  app.derive({ as: "global" }, async ({ jwt, set, headers }) => {
    const { authorization } = headers

    if (!authorization?.startsWith("Bearer ")) {
      // throw new NotFoundError('Not headers found in request')
      set.status = 401
      set.headers["WWW-Authenticate"] =
        `Bearer realm='sign', error="invalid_request"`
      throw new AuthenticationError("No headers found in request.")
    }

    const bearer = authorization.split(" ")[1]?.toString()
 
    const validated = await jwt.verify(bearer)
    if (!validated) {
      set.status = 401
      set.headers["WWW-Authenticate"] =
        `Bearer realm='sign', error="invalid_request"`

      throw new AuthorizationError("Invalid request token.")
    }

    return validated as ValidatedToken
  })
