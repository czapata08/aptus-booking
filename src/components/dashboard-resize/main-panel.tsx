import { redirect } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ProfileSection } from "@/app/(marketing)/_components/layout-components"
import { getCurrentUser } from "@/app/auth/server/auth/auth-helpers"

interface MainPanelLayoutProps {
  title: string
  titleIcon?: LucideIcon
  wSearch?: boolean

  children: React.ReactNode
  topAreaContent?: React.ReactNode
}

export async function MainPanelLayout(props: MainPanelLayoutProps) {
  const user = await getCurrentUser("full_user")
  if (!user) {
    console.log("redirecting from dashboard route")
    redirect("/login")
  }

  if (user?.user?.app_metadata?.role !== "admin") {
    console.log("redirecting from dashboard route because it is not admin")
    redirect("/login")
  }

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2">
        {/* Header area */}
        <div className="flex h-[52px] items-center justify-between px-4">
          <div className="flex items-center gap-2 mt-2">
            {props.wSearch ? (
              <Input
                placeholder="Search Events"
                className="w-[200px] md:w-[260px]"
              />
            ) : (
              props.titleIcon && <props.titleIcon className="h-6 w-6" />
            )}
            {
              <h2 className="text-3xl font-bold tracking-tight">
                {props.title}
              </h2>
            }
          </div>
          <div className="flex items-center gap-2">
            <ProfileSection user={user.user} />
          </div>
        </div>
        <Separator />

        <div
          className={cn(
            props.topAreaContent ? "flex items-end py-4" : "hidden"
          )}
        >
          {props.topAreaContent && props.topAreaContent}
        </div>

        {/* <div className="grid gap-4 sm:w-full sm:grid-cols-1 md:mx-6 md:mt-6 md:grid-cols-1 xl:mx-6 xl:grid-cols-2 "> */}
        {/* <div className="mx-1 mt-4 grid gap-4 sm:grid-cols-1 md:mx-6 md:mt-6 xl:grid-cols-2"> */}
        {/* <div className=" grid gap-4 md:mx-6 md:mt-6">{props.children}</div> */}

        <div className="flex flex-col items-center justify-between gap-2 rounded-lg px-2 transition-all hover:bg-accent/5">
          {props.children}
        </div>
      </div>
    </ScrollArea>
  )
}
