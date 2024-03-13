"use server"

// this can be move to actions
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import { getURL } from "@/lib/utils"

export async function googleLogin() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const domainUrl = getURL()
  const reqUrl = new URL("/login", domainUrl)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${domainUrl}auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })

  if (error) {
    reqUrl.searchParams.set("login_error", error.message)
    redirect(reqUrl.href)
  }

  if (data?.url) {
    const url = data?.url.toString()
    redirect(url)
  }
}
