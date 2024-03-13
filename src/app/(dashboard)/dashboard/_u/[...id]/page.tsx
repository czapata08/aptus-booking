//ui
import { CalendarPlus } from "lucide-react"

//ui
import { CardTitle } from "@/components/ui/card"
// import { CheckoutForm } from "../../_forms/checkout-form"
import { Progress } from "@/components/ui/progress"
import { MainPanelLayout } from "@/components/dashboard-resize/main-panel"
//file uploader
import Uploader from "@/components/file-uploader"
import { SheetDemo } from "@/components/sheet-wrapper"
//mutation form
import { selectEvent } from "@/app/server/event_booking/queries"

//shell
import { EventShell } from "../../../_components/_shell/event-shell"
//forms steps
import { InsertEventForm } from "../../../_forms/f-insert-event"
import { InsertSlotsWTickets } from "../../../_forms/f-insert-slot-w-ticket"

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const eventData = await selectEvent({ id: params.id, queryType: "byId" })
  console.log(eventData)

  return (
    <MainPanelLayout
      title="Create new event"
      titleIcon={CalendarPlus}
      topAreaContent={
        <div className="ml-auto mr-4">
          <EventWizard searchParams={searchParams} />
        </div>
      }
    >
      <EventShell>
        <div className="mx-auto">
          <CardTitle className="my-4"> Update Event Details </CardTitle>

          {eventData && (
            <InsertEventForm
              // @ts-expect-error caused by enum types for event_status and event_type
              event={eventData}
              useCase={"update"}
              eventId={params.id}
            />
          )}
        </div>
      </EventShell>
    </MainPanelLayout>
  )
}

function EventWizard({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  // console.log("searchParams from event wizard", searchParams)

  return (
    <SheetDemo icon={CalendarPlus} buttonText="Create New Event">
      <div className="max-w-sm">
        {searchParams.rowId &&
        searchParams.bucketId &&
        searchParams.imgUpload ? (
          <div>
            <Progress value={100} className="h-3" />
            <CardTitle className="my-4">
              Add Event Time Slots & Ticket Pricing
            </CardTitle>

            <InsertSlotsWTickets eventId={searchParams.rowId as string} />
          </div>
        ) : searchParams.rowId && searchParams.bucketId ? (
          <div>
            <Progress value={50} />
            <CardTitle className="my-4">Add Event Images</CardTitle>
            <Uploader />
          </div>
        ) : (
          <div>
            <Progress value={25} />
            <CardTitle className="my-4"> New Event Details </CardTitle>
            <InsertEventForm useCase="insert" />
          </div>
        )}
      </div>
    </SheetDemo>
  )
}

function EventWizardOnShell({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  return (
    <EventShell>
      <div className="mx-auto">
        {searchParams.rowId &&
        searchParams.bucketId &&
        searchParams.imgUpload ? (
          <div>
            <Progress value={100} className="h-3" />
            <CardTitle className="my-4">
              Add Event Time Slots & Ticket Pricing
            </CardTitle>

            <InsertSlotsWTickets eventId={searchParams.rowId as string} />
          </div>
        ) : searchParams.rowId && searchParams.bucketId ? (
          <div>
            <Progress value={50} />
            <CardTitle className="my-4">Add Event Images</CardTitle>
            <Uploader />
          </div>
        ) : (
          <div>
            <Progress value={25} />
            <CardTitle className="my-4"> New Event Details </CardTitle>
            <InsertEventForm useCase={"insert"} />
          </div>
        )}
      </div>
    </EventShell>
  )
}
