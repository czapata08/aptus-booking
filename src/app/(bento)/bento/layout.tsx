/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// error due to re-sizeable layout values from cookies
import { cookies } from "next/headers"

import { Toaster } from "@/components/ui/sonner"
import { ResizableDashLayout } from "@/components/dashboard-resize/layout-shell"
import { NavigationEvents } from "@/app/(auth)/navigation-events"
// Data can be fetched here
import { accounts } from "@/app/(dashboard)/_config/accounts"

export const metadata = {
  title: "Payments | Store",
  description: "In-person payments dashboard.",
}

// todo - route redirect is happening from main panel layout. It should happen here.
// with cached function the user can be fetched from cache from multiple routes
// therefore, it makes more sense to do it here.

export default async function DashboardRootPage({
  children,
}: {
  children: React.ReactNode
}) {
  //------------------------------- resizable layout config -------------------------------
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <div className="h-[100dvh] overflow-hidden">
      <Toaster position="top-center" richColors className="p-2" />
      <NavigationEvents />
      <div vaul-drawer-wrapper="">
        <div className="relative flex min-h-screen flex-col bg-background">
          {/* <SiteHeader/> */}
          <section>
            <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
              <ResizableDashLayout
                accounts={accounts}
                defaultLayout={defaultLayout}
                defaultCollapsed={defaultCollapsed}
                navCollapsedSize={4}
                defaultLeftPanel={false}
                // leftPanelContent={
                //   <div className="flex h-full flex-col items-center justify-center gap-3">
                //     <ProductCardDemo />
                //   </div>
                // }
              >
                {children}
              </ResizableDashLayout>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
