import { Suspense } from "react"
import { CalendarDaysIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { MainPanelLayout } from "@/components/dashboard-resize/main-panel"
import { EventsDisplaySection } from "@/app/(marketing)/_components/events/e-display-grid"
import { selectAEventsWithImages } from "@/app/server/event_booking/static/s-queries"

// import { CheckoutForm } from "../_forms/checkout-form"
// import { SheetDemo } from "../../../components/sheet-wrapper"
import { mockEvents } from "../_components/_tables/_mock-data"
import { DataTableDemo } from "../_components/_tables/events-table"
import { EventWizard } from "../_components/sheet-components"

export default async function DashboardPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  // console.log("searchParams from dash page", searchParams)
  // console.log("params from dash page", params)

  const events = await selectAEventsWithImages()

  return (
    <>
      <MainPanelLayout
        title="Events Book"
        titleIcon={CalendarDaysIcon}
        topAreaContent={
          <div className="ml-auto mr-4">
            <EventWizard searchParams={searchParams} />
          </div>
        }
      >
        <Suspense>
          <EventsDisplaySection events={events} type="backend" />
        </Suspense>

        <Card className="hidden">
          <CardContent>
            {/* @ts-expect-error expect */}
            <DataTableDemo data={mockEvents} />
          </CardContent>
        </Card>
      </MainPanelLayout>
    </>
  )
}
