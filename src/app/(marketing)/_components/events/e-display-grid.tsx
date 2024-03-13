import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"

import { Card, CardContent } from "@/components/ui/card"
import { shimmer, toBase64 } from "@/components/image/loader-shimmer"
import { type EventWithMainImage } from "@/app/server/event_booking/schemas/e-components-types"

import { EventDetailsAndIcons } from "../s-components"

export function EventsDisplaySection({
  events,
  type,
}: {
  events: EventWithMainImage[]
  type: "landing" | "backend"
}) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-2 md:grid-cols-4">
      {/* Card Component */}
      {events.map((event) => (
        <Card
          className="w-full hover:shadow-lg border-none shadow-none"
          key={event.id}
        >
          <Link
            href={clsx(
              type === "landing"
                ? `/event/${event.id}`
                : `/dashboard/event/${event.id}`
            )}
          >
            <CardContent>
              <Image
                key={event?.event_images[0]?.image_id}
                alt={event?.event_images[0]?.caption ?? event.title}
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                className="rounded-lg"
                height="200"
                width="500"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                src={"event_images/" + event?.event_images[0]?.image_url}
              />

              <h3 className="capitalize mt-2 text-xl font-semibold text-wrap my-0.5">
                {event.title}
              </h3>
              <p className="text-sm">{event.location}</p>
              <EventDetailsAndIcons event={event} />
              {/* <p className="text-sm">{event.price}</p> */}
              {/* todo: handle event labels here */}
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
