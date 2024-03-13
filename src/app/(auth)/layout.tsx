"use client"

import { Suspense } from "react"

import { Toaster } from "@/components/ui/sonner"
import { NavigationEvents } from "@/app/(auth)/navigation-events"

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense>
      <Toaster position="top-right" richColors className="p-2" />
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
      <Suspense>{children}</Suspense>
    </Suspense>
  )
}
