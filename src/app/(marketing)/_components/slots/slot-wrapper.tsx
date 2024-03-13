import { Suspense } from "react"
import { format, parse } from "date-fns"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { InsertSlotForm } from "@/app/(dashboard)/_forms/f-insert-slot"
import { InsertTicketsForm } from "@/app/(dashboard)/_forms/f-insert-ticket"
import {
  queryEventAndImagesByRef,
  selectSlots,
  selectTickets,
} from "@/app/server/event_booking/queries"

import { EventDetailed, Slots } from "./slot-selector"

export async function SlotsWrapper({ eventId }: { eventId: string }) {
  const slotsData = await selectSlots(eventId)
  return <Slots slots={slotsData} />
}

export async function EventDetailedWrapper({ eventId }: { eventId: string }) {
  const slotsData = await selectSlots(eventId)
  const eventData = await queryEventAndImagesByRef(eventId)
  return (
    <Suspense>
      <EventDetailed slots={slotsData} event={eventData} />
    </Suspense>
  )
}

export async function SlotContent({ eventId }: { eventId: string }) {
  const slotsData = await selectSlots(eventId)

  if (slotsData.length === 0) {
    return (
      <div>
        <h2>No slots available</h2>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 md:gap-4 sm:grid-flow-row">
      {slotsData.map((slot, index: number) => (
        <Accordion key={index} id={slot.slot_id} type="single" collapsible>
          <AccordionItem value={slot.slot_id}>
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <Badge>{slot.slot_date}</Badge>
                <Badge>{formatTimeDns(slot.start_time)}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card key={index} id={slot.slot_id}>
                <CardContent className="grid gap-2 space-y-2 mt-2">
                  {/* <form>
                    <Label>Slot Date</Label>
                    <Input type="date" value={slot.slot_date} />
                    <Label>Start Time</Label>
                    <Input type="time" value={slot.start_time} />
                    <Label>End Time</Label>
                    <Input type="time" value={slot.end_time} />
                    <Label>Slot ID</Label>
                    <Input type="text" value={slot.slot_id} disabled={true} />
                    <Button type="submit" className="w-full mt-2.5">
                      Update Slot
                    </Button>
                  </form> */}
                  <InsertSlotForm
                    slotId={slot.slot_id}
                    slotData={{
                      ...slot,
                      slot_date: new Date(slot.slot_date),
                      tickets_available: slot.tickets_available ?? 0,
                    }}
                    useCase="update"
                  />
                  <Suspense fallback={<div>Loading...</div>}>
                    <TicketsWrapper slotId={slot.slot_id} />
                  </Suspense>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}

export async function TicketsWrapper({ slotId }: { slotId: string }) {
  const ticketsData = await selectTickets({
    slotId: slotId,
    queryType: "bySlotId",
  })

  if (ticketsData?.length === 0 ?? !ticketsData) {
    return (
      <div>
        <h2>No tickets available</h2>
      </div>
    )
  }

  return (
    <div className="grid w-full">
      <span className="mt-2 text-base font-semibold">
        Slot tickets: {ticketsData.length}
      </span>
      <Separator />
      {ticketsData.map((ticket, index: number) => (
        <Accordion
          key={index}
          id={ticket.ticket_id}
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value={ticket.ticket_id}>
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                {ticket.ticket_name}
                <span>
                  {ticket.total_tickets}
                  {"x "}
                  <span className="text-sm font-semibold">tickets</span>
                </span>

                <span>${ticket.ticket_price}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card key={index} id={ticket.ticket_id}>
                <CardContent className="grid gap-2 space-y-2">
                  <InsertTicketsForm
                    ticketId={ticket.ticket_id}
                    ticket={{
                      ...ticket,
                      slot_id: slotId,
                      event_id: ticket.event_id!,
                      sold_tickets: ticket.sold_tickets ?? 0,
                      ticket_price: ticket.ticket_price ?? 0,
                      total_tickets: ticket.total_tickets ?? 0,
                    }}
                  />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}

//move to helpers - repeated in slot-selector

const formatTimeDns = (timeString: string) => {
  // Use a placeholder date (e.g., 2000-01-01) and combine it with the time string
  const dateTime = parse(
    `2000-01-01T${timeString}`,
    "yyyy-MM-dd'T'HH:mm:ss",
    new Date()
  )

  // Format the dateTime object to a human-readable form, e.g., "12:00 PM"
  return format(dateTime, "h:mm aa")
}

/* <form>
                    <Label>Ticket Name</Label>
                    <Input type="text" value={ticket.ticket_name} />
                    <Label>Ticket Price</Label>
                    <Input type="number" value={ticket.ticket_price ?? 0} />
                    <Label>Total Tickets</Label>
                    <Input type="number" value={ticket.total_tickets ?? 0} />
                    <Label>Ticket ID</Label>
                    <Input
                      type="text"
                      value={ticket.ticket_id}
                      disabled={true}
                    />
                    <Button type="submit" className="w-full mt-2.5">
                      Update Ticket
                    </Button>
                  </form> */
