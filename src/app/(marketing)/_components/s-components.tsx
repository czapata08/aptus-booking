import React from "react"
// import Image from "next/image"
import Link from "next/link"
//date formatting
import { format, parseISO } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  type EC,
  type EventWithImages,
} from "@/app/server/event_booking/schemas/e-components-types"

import {
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  LocateIcon,
  TicketIcon,
} from "./icons"
import { CarouselEImagesDemo } from "./images/img-carousel"

//we are here
export function EventContent({ event }: { event: EventWithImages }) {
  // console.log("event content component", event.event_images)
  return (
    <div className="col-span-3 lg:col-span-2">
      {/*  todo: This needs to be a separate client component and that can render multiple images */}
      <CarouselEImagesDemo images={event.event_images} />
      <h2 className="text-2xl font-semibold mb-4">Event</h2>
      {/* todo:  how are we going to handle special characters like &apos; and similar*/}
      <p className="mb-4">{event.description}</p>
      <p className="mb-6">
        As in all of our classes, we&apos;ll cover cocktail-making fundamentals,
        guiding participants through making (and enjoying) three cocktails –
        this hands-on class has something to offer both novices & professionals.
      </p>
      {/* move this into a separate section */}
      <h2 className="text-2xl font-semibold mb-4">Private Events</h2>
      <p className="mb-6">
        If you are interested in learning more about our offerings, please fill
        out the request form and we will contact you to discuss details.
      </p>
      <Link href="https://esmechicago.com/private-events-at-esme">
        <Button className="bg-blue-600 text-white">Request information</Button>
      </Link>
    </div>
  )
}

export function EventForm({ event }: { event: EC }) {
  const eDate = parseISO(event.start_date)
  const fDate = format(eDate, "iiii, MMM d, yyyy")
  // console.log("Event date formatted: ", fDate)
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg col-span-3 md:col-span-1">
      <h3 className="text-xl font-semibold mb-4">Event details</h3>
      <div className="flex items-center mb-4">
        <CalendarIcon className="text-gray-500 mr-2" />
        <p>{fDate}</p>
      </div>
      {/* this is the slot section */}
      <div className="flex items-center mb-4">
        <ClockIcon className="text-gray-500 mr-2" />
        <p>6:00 PM - 7:30 PM</p>
      </div>
      <div className="flex items-center mb-4">
        <CreditCardIcon className="text-gray-500 mr-2" />
        <p>${event.price} per ticket</p>
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
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-medium">Party size</p>
        <div className="flex items-center">
          <Button className="text-xl" variant="ghost">
            −
          </Button>
          <p className="mx-4">1 ticket</p>
          <Button className="text-xl" variant="ghost">
            +
          </Button>
        </div>
      </div>
      <Button className="w-full">Get tickets</Button>
    </div>
  )
}

export function EventDetails() {
  return (
    <div className="bg-neutral-100 p-6 rounded-lg lg:max-h-[58%]">
      <h2 className="text-2xl font-semibold mb-4">Event details</h2>
      <div className="space-y-4 mb-6">
        <div className="flex items-center">
          <CalendarIcon className="text-gray-500 mr-2" />
          <p>Monday, Apr 8, 2024</p>
        </div>
        <div className="flex items-center">
          <ClockIcon className="text-gray-500 mr-2" />
          <p>6:00 PM - 7:30 PM</p>
        </div>
        <div className="flex items-center">
          <TicketIcon className="text-gray-500 mr-2" />
          <p>$80 per ticket</p>
        </div>
        <div className="flex items-center">
          <LocateIcon className="text-gray-500 mr-2" />
          <p>The Violet Hour</p>
        </div>
        <div className="flex items-center">
          <LocateIcon className="text-gray-500 mr-2" />
          <p>1520 North Damen Avenue</p>
        </div>
        <div className="flex items-center">
          <LocateIcon className="text-gray-500 mr-2" />
          <p>Chicago, IL 60622</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <p className="font-semibold">Party size</p>
        <div className="flex items-center">
          <Button className="bg-gray-300 text-gray-500">-</Button>
          <p className="mx-4">1 ticket</p>
          <Button className="bg-blue-600 text-white">+</Button>
        </div>
      </div>
      <Button className="bg-blue-600 text-white w-full">Get tickets</Button>
    </div>
  )
}

export function InfoCard() {
  return (
    <div className="px-4 col-span-3 lg:col-span-2">
      <h2 className="text-2xl font-semibold mt-8 mb-4">More information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">The Violet Hour</h3>
          <p className="mb-2">1520 North Damen Avenue</p>
          <p className="mb-2">Chicago, IL 60622</p>
          <p className="mb-2">
            <Link className="text-blue-600" href="#">
              Email The Violet Hour
            </Link>
          </p>
          <p>
            <Link className="text-blue-600" href="#">
              View menu
            </Link>
          </p>
        </div>
        {/* <img
          alt="Map"
          className="rounded-lg border"
          height="200"
          src="/placeholder.svg"
          style={{
            aspectRatio: "400/200",
            objectFit: "fill",
          }}
          width="400"
        /> */}
      </div>
    </div>
  )
}

export function EventDetailsAndIcons({ event }: { event: EC }) {
  const eDate = parseISO(event.start_date)
  const fDate = format(eDate, "iiii, MMM d, yyyy")
  return (
    <div className="space-y-2 mt-2 text-base font-base">
      <div className="flex align-baseline">
        <CalendarIcon className="mr-2 " />
        <p>{fDate}</p>
      </div>

      <div className="flex items-center">
        <TicketIcon className="mr-2" />
        <p>${event.price} per person</p>
      </div>
      {/* <div className="flex items-center">
        <LocateIcon className="text-slate-500 mr-2" />
        <p>{event.location}</p>
      </div> */}
      {/* <div className="flex items-center">
        <CreditCardIcon className="text-slate-500 mr-2" />
        <p>${event.price} per person</p>
      </div> */}
      {/* <div className="flex items-center">
      <ClockIcon className="text-gray-500 mr-2" />
      <p>6:00 PM - 7:30 PM</p>
    </div> */}
    </div>
  )
}

// export default function EventLanding() {
//   return (
//     <div className="bg-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
//           <div className="md:col-span-3">
//             <h1 className="text-4xl font-semibold mb-2">
//               What to do with Cynar
//             </h1>
//             <p className="text-lg text-gray-500">
//               The Violet Hour - Chicago, IL
//             </p>
//           </div>
//           {/* Main  */}
//           <EventContent />
//           {/* Main  */}

//           {/* Event Details */}
//           {/* <EventDetails /> */}
//           <EventForm />
//           {/* Event Details */}
//           {/* InfoCard */}
//           <InfoCard />
//           {/* InfoCard */}
//         </div>
//       </div>
//     </div>
//   )
// }
