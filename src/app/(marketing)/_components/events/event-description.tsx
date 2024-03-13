import { Button } from "@/components/ui/button"
import { queryEventAndImagesByRef } from "@/app/server/event_booking/queries"

import { CarouselEImagesDemo } from "../images/img-carousel"

export async function EventContent(eventId: string) {
  const eventData = await queryEventAndImagesByRef(eventId)

  if (eventData?.event_images) {
    return <p>Event Data Not Found</p>
  }

  // console.log("event content component", event.event_images)
  return (
    <div className="col-span-3 lg:col-span-2">
      <CarouselEImagesDemo images={eventData.event_images} />
      <h2 className="text-2xl font-semibold mb-4">Event</h2>
      {/* todo:  how are we going to handle special characters like &apos; and similar*/}
      <p className="mb-4">{eventData.description}</p>
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
      <Button className="bg-blue-600 text-white">Request information</Button>
    </div>
  )
}
