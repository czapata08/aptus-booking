import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { shimmer, toBase64 } from "@/components/image/loader-shimmer"
import { type EventImage } from "@/app/server/event_booking/schemas/e-components-types"

import { selectEventImages } from "../../../server/event_booking/static/s-queries"

export async function SectionOne() {
  const eImages = await selectEventImages()

  return <ScrollableImgRow eventsImg={eImages} />
}

function ScrollableImgRow({ eventsImg }: { eventsImg: EventImage[] }) {
  // console.log("eventsImg", eventsImg.length)

  if (!eventsImg || eventsImg.length === 0) {
    return <div>No events found</div>
  }

  return (
    <div className="flex space-x-4 overflow-x-auto py-4 md:mx-2 lg:mx-8">
      {eventsImg.map((e) => {
        return (
          <Link href={`/checkout/${e.event_id}`} key={e.image_id}>
            <Image
              alt={e.caption}
              className="min-w-[300px] rounded-lg"
              height="200"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              src={"event_images/" + e.image_url}
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width="300"
            />
          </Link>
        )
      })}
    </div>
  )
}
