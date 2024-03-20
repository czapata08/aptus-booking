"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams.toString()}`

    const error = searchParams.get("error")
    const success = searchParams.get("success")
    const login_error = searchParams.get("login_error")

    if (error) {
      toast.error(error)
    } else if (login_error) {
      toast.error(login_error)
    } else if (success) {
      toast.success(success)
    }
    // You can now use the current URL
    // ...
    console.log("url:", url)
  }, [pathname, searchParams])

  return null
}
