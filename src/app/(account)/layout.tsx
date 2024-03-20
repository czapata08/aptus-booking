// import { NavbarMenu } from "@/components/nav/navbar-menu-demo"
import { Suspense } from "react"
import { type Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/nav/sidebar-nav-simple"
import { NavigationEvents } from "@/app/(auth)/navigation-listener"

export const metadata: Metadata = {
  title: "Account",
  description: "Account overview and profile information",
}

// move this into config
const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Account",
    href: "/account",
  },
  {
    title: "Notifications",
    href: "/notifications",
  },
  {
    title: "Membership",
    href: "/membership",
  },
]

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
      {/* <Suspense fallback={null}>
        <NavbarMenu />
      </Suspense> */}
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-semibold tracking-tight">
            Account Settings
          </h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 lg:max-w-[300px]">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex w-full items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
