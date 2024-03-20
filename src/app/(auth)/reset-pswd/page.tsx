import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { toast } from "sonner"

import { ConfirmResetPasswordForm } from "../_forms/auth-forms"

//[to_do]: need to restrict access to this route - implementation could be with the type parameter which is passed to the callback
// function when the request pswd link is verified

export default async function PrivatePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()
  if (error ?? !data?.user) {
    redirect("/login")
  }

  if (searchParams && "error" in searchParams) {
    toast.error(searchParams.error)
  }

  if (searchParams && "success" in searchParams) {
    toast.success(searchParams.success)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg shadow-lg p-8">
        <p className="text-center text-xl font-medium mb-4">
          Reset password for {data.user.email?.split("@")[0]}@...
        </p>
        <ConfirmResetPasswordForm />
      </div>
    </div>
  )
}
