import { CalendarDaysIcon } from "lucide-react"

import { MainPanelLayout } from "@/components/dashboard-resize/main-panel"

import { BentoGridLandingDemo } from "./bento-landing"
import { BentoGridSimple } from "./bento-simple"
import { TockButton } from "./tock-widget"

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  if (searchParams.bento === "a") {
    return <BentoGridSimple />
  }

  return (
    <div className="relative h-full bg-gradient-to-t ">
      <MainPanelLayout title="Dashboard">
        <TockButton />
        <BentoGridSimple />
      </MainPanelLayout>
    </div>
  )
}
