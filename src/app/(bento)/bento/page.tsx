import { CalendarDaysIcon } from "lucide-react"

import { MainPanelLayout } from "@/components/dashboard-resize/main-panel"

import { BentoGridLandingDemo } from "./bento-landing"
import { BentoGridDemo } from "./bento-simple"

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  if (searchParams.bento === "a") {
    return <BentoGridDemo />
  }

  return (
    <MainPanelLayout title="Events Book" titleIcon={CalendarDaysIcon}>
      <BentoGridLandingDemo />
    </MainPanelLayout>
  )
}
