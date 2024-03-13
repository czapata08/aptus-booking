import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

// import { revalidatePath } from "next/cache"
// import { getURL } from "@/lib/utils"

//Edge functions are dynamically render
export const runtime = "edge"
export const dynamic = "force-dynamic"

const supaClient = cache(() => {
  const cookieStore = cookies()
  return createClient(cookieStore)
})

// use case: get current user data
export async function getCurrentUser(useCase: "full_user" | "role") {
  const supabase = supaClient()
  const { data, error } = await supabase.auth.getUser()

  if (error ?? !data?.user) {
    console.log("error retrieving current user role", error)
    redirect("/login")
  }

  if (useCase === "full_user") {
    return data
  }

  return data
}

//use case: return current user role directly
export async function getCurrentRole() {
  const supabase = supaClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.log("error retrieving current user role", error)
    redirect("/login")
  }

  if (data.user.app_metadata?.role) {
    return data.user.app_metadata.role as string
  }
}
