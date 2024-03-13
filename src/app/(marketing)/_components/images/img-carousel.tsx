"use client"

import * as React from "react"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { type EventImage } from "@/app/server/event_booking/schemas/e-components-types"

export function CarouselEImagesDemo({ images }: { images: EventImage[] }) {
  // console.log("Images", images)
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      console.log("current")
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="flex justify-center w-full">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              {/* <Card className="border-none">
                <CardContent className="flex aspect-square items-center justify-center p-6"> */}
              <Image
                alt={img.caption}
                className="rounded-lg mb-6 w-full"
                height="600"
                width="300"
                src={"event_images/" + img.image_url}
                style={{
                  aspectRatio: "600/300",
                  objectFit: "cover",
                }}
              />
              {/* <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div> */}
              {/* </CardContent>
              </Card> */}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  )
}
