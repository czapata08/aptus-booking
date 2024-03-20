import { Suspense } from "react"
import { type Metadata } from "next"

import { NavigationEvents } from "@/app/(auth)/navigation-listener"

export const metadata: Metadata = {
  title: "Login",
  description: "User sign-in",
}

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
      <Suspense>{children}</Suspense>
    </>
  )
}
