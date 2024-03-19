import * as React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { createUrl } from "@/lib/utils"
//date formatting
import { format, parseISO } from "date-fns"

import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LoadingDots } from "@/components/file-uploader/loading-dots"
import { HandlePartySize } from "@/app/(dashboard)/_forms/f-wizard"
import { type EC } from "@/app/server/event_booking/schemas/e-components-types"

import {
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  LocateIcon,
  // TicketIcon,
} from "../icons"
import { SlotsWrapper } from "../slots/slot-wrapper"

//could get data with react cache

//this is the event detail card with form to select slots
export function EventForm({
  event,
  current,
  children,
}: {
  event: EC
  current: number
  children?: React.ReactNode
}) {
  const eDate = parseISO(event.start_date)
  const fDate = format(eDate, "iiii, MMM d, yyyy")
  // console.log("Event date formatted: ", fDate)
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
      <h3 className="text-xl font-semibold mb-4">Event details</h3>
      <div className="flex items-center mb-4">
        <CalendarIcon className="text-gray-500 mr-2" />
        <p>{fDate}</p>
      </div>
      {/* this is the slot section */}

      <div className="flex items-center mb-4">
        <CreditCardIcon className="text-gray-500 mr-2" />
        <p className="capitalize">
          ${event.price ? `${event.price} per ticket` : `members only`}
        </p>
      </div>
      <div className="flex items-center mb-4">
        <LocateIcon className="text-gray-500 mr-2" />
        <p>
          {event.location}
          <br />
          2200 N Clark St
          <br />
          Chicago, IL 60614
        </p>
      </div>
      <div className="flex items-center mb-4">
        <ClockIcon className="text-gray-500 mr-2" />
        <h2 className="text-base ">Time Slots</h2>
      </div>
      <div className="grid grid-flow-col gap-1">
        <React.Suspense fallback={<LoadingDots />}>
          <SlotsWrapper eventId={event.id} />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-between pt-2">
        <p className="text-lg font-medium">Party size</p>
        <div className="flex items-center">
          <HandlePartySize useCase="minus" />
          <p className="mx-4">{current} ticket</p>
          <HandlePartySize useCase="plus" />
        </div>
      </div>
      <Button className="w-full py-2 mt-4">Get tickets</Button>
    </div>
  )
}

export function PartySizeCounter(current: number) {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-lg font-medium">Party size</p>
      <div className="flex items-center">
        <HandlePartySize useCase="minus" />
        <p className="mx-4">{current} ticket</p>
        <HandlePartySize useCase="plus" />
      </div>
    </div>
  )
}
