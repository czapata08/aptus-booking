import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import { onboardingVerification } from "../../auth/server/auth/actions"

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()
  if (error ?? !data?.user) {
    redirect("/")
  }

  const { phone, user_metadata } = data.user

  //if onboarding is already completed, redirect to dashboard
  if (user_metadata?.onboardingVerification) {
    redirect("/dashboard")
  }

  // if (searchParams && "error" in searchParams) {
  //   toast.error(searchParams.error)
  // }

  if (searchParams && "success" in searchParams) {
    redirect("/dashboard")
  }

  const name = (user_metadata?.name as string) ?? ""

  return (
    <div className="flex h-screen flex-1 items-center justify-center">
      <div>
        <p>Hello {data.user.email}</p>
        Onboarding Page
        <div>
          <form className="grid max-w-sm grid-rows-3 space-y-2 border p-2">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder={phone}
              required
              className="rounded-md border"
            />
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={name}
              required
              className="rounded-md border capitalize"
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="rounded-md border"
            />
            <br />
            <button
              formAction={onboardingVerification}
              type="submit"
              className="mx-2 w-auto rounded-md border"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
