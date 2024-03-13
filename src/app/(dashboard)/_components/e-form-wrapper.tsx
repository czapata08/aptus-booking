import { selectEvent } from "@/app/server/event_booking/queries"

import { InsertEventForm } from "../_forms/f-insert-event"

export async function UpdateEventFormW({ eventId }: { eventId: string }) {
  const eventData = await selectEvent({ id: eventId, queryType: "byId" })

  if (!eventData) {
    return <div>Event not found</div>
  }

  return (
    <InsertEventForm
      // @ts-expect-error caused by enum types for event_status and event_type
      event={eventData}
      useCase={"update"}
      eventId={eventId}
    />
  )
}
