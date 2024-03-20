import { toast } from "sonner"

import { AuthFormsShell } from "@/components/auth/auth-forms-shell"
import { LoginShell } from "@/components/auth/auth-shell"

import { LoginOtpForm } from "../_forms/auth-forms"
import { GoogleLoginButton } from "../_forms/google-login-button"

export default function LoginPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  if (searchParams && "error" in searchParams) {
    toast.error(searchParams.error)
  }

  return (
    <LoginShell authProviders={<GoogleLoginButton />}>
      <AuthFormsShell>
        <LoginOtpForm />
      </AuthFormsShell>
    </LoginShell>
  )
}
