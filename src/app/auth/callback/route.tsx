/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const reqUrl = new URL("/login", origin)
  const code = searchParams.get("code")
  const error = searchParams.get("error")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    const { error, data } = await supabase.auth.exchangeCodeForSession(code)

    if (data?.user?.email_confirmed_at) {
      const confirmedAt = new Date(data.user.email_confirmed_at)
      const now = new Date()

      if (confirmedAt.toDateString() === now.toDateString()) {
        //redirect new users to onboarding page
        return NextResponse.redirect(`${origin}${next}onboarding`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }

    if (error) {
      reqUrl.searchParams.set(
        "login_error",
        error.message ?? "Sorry, there was an error with your login request."
      )
      return NextResponse.redirect(reqUrl.href)
    }
  }

  // return the user to an error page with instructions

  reqUrl.searchParams.set(
    "login_error",
    error ?? "Sorry, there was an error with your login request."
  )
  return NextResponse.redirect(reqUrl.href)
}
