// https://supabase.com/docs/guides/auth/passwordless-login/auth-email-otp
//LOGIN OTP ROUTE - MAGIC LINK
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)

  console.log(
    "LOGIN WITH MAGIC LINK ROUTE FIRED WITH, requestUrl: ",
    requestUrl
  )

  const formData = await request.formData()
  const email = String(formData.get("email"))

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  //use case: sign-in with OTP - Magic Link
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/confirm`,
      shouldCreateUser: false,
    },
  })

  if (error) {
    console.log("error on login route, OTP - ERROR CODE: ", error.cause)
    const loginUrl = new URL("/login", request.url)

    if (error.message === "Signups not allowed for otp") {
      loginUrl.searchParams.set(
        "error",
        "We could not find an account with that email"
      )
    }

    return NextResponse.redirect(loginUrl, {
      status: 301,
    })
  }

  if (data) {
    console.log("sucess sending otp-magic link, data: ", data)
  }

  // Returning a 301 status redirects from a POST to a GET route
  return NextResponse.redirect(`${requestUrl.origin}/status`, {
    status: 301,
  })
}

// import type { Database } from '@/lib/database.types'

// if (error) {
//   console.log('error on login route, OTP - ERROR CODE: ', error);
//   const loginUrl = new URL('/login', error.message);
//   loginUrl.searchParams.set('error', error.message);
//   return NextResponse.redirect(loginUrl, {
//     status: 301
//   });
// }
