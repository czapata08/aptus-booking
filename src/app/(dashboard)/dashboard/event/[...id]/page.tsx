//ui
import { Suspense } from "react"
// import Link from "next/link"
import { CalendarDaysIcon, InfoIcon } from "lucide-react"

// import { Button } from "@/components/ui/button"
import { MainPanelLayout } from "@/components/dashboard-resize/main-panel"
//mutation form
import { SheetDemo } from "@/components/sheet-wrapper"
import { EventContent } from "@/app/(marketing)/_components/s-components"
import { SlotContent } from "@/app/(marketing)/_components/slots/slot-wrapper"
import { queryEventAndImagesByRef } from "@/app/server/event_booking/queries"

import { UpdateEventFormW } from "../../../_components/e-form-wrapper"
import { ImageWizard, SlotWizard } from "../../../_components/sheet-components"

// //query
// import { selectEvent } from "@/app/server/event_booking/queries"

export default async function DashEventDynamicPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  // const eventData = await selectEvent({ id: params.id, queryType: "byId" })
  const eventData = await queryEventAndImagesByRef(params.id)

  // console.log(eventData)
  if (!eventData) {
    return <div>Event not found</div>
  }

  return (
    <MainPanelLayout
      title="Events"
      titleIcon={CalendarDaysIcon}
      topAreaContent={
        <div className="flex justify-between w-full mx-2">
          <div className="ml-auto mr-4 space-x-1">
            <ImageWizard eventId={params.id.toString()} />
            <SlotWizard eventId={params.id.toString()} />
          </div>
        </div>
      }
    >
      <div className="bg-background">
        {/* todo action menu to set update view */}
        <div className="relative max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="absolute top-8 right-7">
            <SheetDemo
              title="Update Event Details"
              buttonText="Update Event"
              buttonStyle="outline"
            >
              <UpdateEventFormW eventId={params.id} />
            </SheetDemo>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-8">
            <div className="md:col-span-3">
              <h1 className="text-4xl font-semibold mb-2">{eventData.title}</h1>
              <p className="text-lg text-gray-500">{eventData.location}</p>
            </div>

            <div className="col-span-3">
              <Suspense fallback={<div>Loading...</div>}>
                <h3 className="text-xl font-semibold flex items-baseline">
                  Time Slots
                  <span className="ml-2 text-sm text-neutral-500 flex">
                    <InfoIcon className="h-4 w-4 mr-2" />
                    To update slots and ticket information, open the desire slot
                    time below.
                  </span>
                </h3>
                <SlotContent eventId={params.id} />
              </Suspense>
            </div>

            <div className="col-span-3 max-w-3xl">
              <EventContent event={eventData} />
            </div>
          </div>
        </div>
      </div>
    </MainPanelLayout>
  )
}
