import "@/styles/globals.css"

import { Toaster as SonnerToaster } from "sonner"

import { Analytics } from "@/lib/analytics"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster as DefaultToaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Apticus",
  description: "Minimalist Operation Management System",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased bg-gradient-to-t from-zinc-50 to-white",
          fontSans.className
        )}
      >
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        {children} <TailwindIndicator />
        <DefaultToaster />
        <SonnerToaster />
        <Analytics />
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
