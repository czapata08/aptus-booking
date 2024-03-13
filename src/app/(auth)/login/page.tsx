import { toast } from "sonner"

import { Icons } from "./icons"
import { UserAuthForm } from "./l-comp"
import { LoginShell } from "./l-shell"

export default function LoginPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  if (searchParams && "error" in searchParams) {
    toast.error(searchParams.error)
  }

  return (
    <LoginShell>
      <UserAuthForm />
    </LoginShell>
  )
}
