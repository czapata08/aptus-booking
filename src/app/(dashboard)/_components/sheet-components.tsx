//ui
import { CalendarPlus, PlusCircleIcon } from "lucide-react"

//ui
import { Card, CardTitle } from "@/components/ui/card"
// import { CheckoutForm } from "../../_forms/checkout-form"
import { Progress } from "@/components/ui/progress"
import { MainPanelLayout } from "@/components/dashboard-resize/main-panel"
//file uploader
import Uploader from "@/components/file-uploader"
import UploaderForm from "@/components/file-uploader/uploader-f"
import { SheetDemo } from "@/components/sheet-wrapper"
import { CheckoutForm } from "@/app/_payments/e-checkout-form"

//queries
// import { selectEvent } from "@/app/server/event_booking/queries"

//forms steps
import { InsertEventForm } from "../_forms/f-insert-event"
import { InsertSlotsWTickets } from "../_forms/f-insert-slot-w-ticket"
//shell
import { EventShell } from "./_shell/event-shell"

export function EventWizardLayoutP({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
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
      </EventShell>
    </MainPanelLayout>
  )
}

export function EventWizard({
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
// [note]! Keep this patter to stay consistent with the rest of the codebase
export function SlotWizard({ eventId }: { eventId: string }) {
  return (
    <SheetDemo icon={CalendarPlus} buttonText="Add Slot">
      <div>
        <CardTitle className="my-4">
          Add Event Time Slots & Ticket Pricing
        </CardTitle>

        <InsertSlotsWTickets eventId={eventId} />
      </div>
    </SheetDemo>
  )
}

export function ImageWizard({ eventId }: { eventId: string }) {
  return (
    <SheetDemo icon={PlusCircleIcon} buttonText="Add Image">
      <div>
        <CardTitle className="my-4">Add Image</CardTitle>
        <UploaderForm rowId={eventId} bucketId="event_images" />
      </div>
    </SheetDemo>
  )
}

// interface CheckoutWProps {
//   eventId: string
//   slotId: string
//   partySize?: string
// }

export function EmbeddedCheckoutWizard() {
  return (
    <SheetDemo icon={PlusCircleIcon} buttonText="Checkout">
      <div>
        <CardTitle className="my-4">Checkout</CardTitle>
        <CheckoutForm uiMode="embedded" />
      </div>
    </SheetDemo>
  )
}
