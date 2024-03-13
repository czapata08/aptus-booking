"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { format, parse, parseISO } from "date-fns"

import { createUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DrawerOrDialog } from "@/components/drawer-or-dialog"
import LoadingDots from "@/components/file-uploader/loading-dots"
import { CheckoutWizardDemo } from "@/app/(marketing)/_components/checkout/checkout"
import {
  type EC,
  type EventWithImages,
  type Slot,
} from "@/app/server/event_booking/schemas/e-components-types"

import { CarouselEImagesDemo } from "../images/img-carousel"

export function Slots({ slots }: { slots: Slot[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6">
        <div className="flex max-w-[250px]">
          <Select
            onValueChange={(value) => {
              const currentSearchParams = new URLSearchParams(
                searchParams.toString()
              )
              currentSearchParams.set("date", value)
              const updatedUrl = createUrl(pathname, currentSearchParams)
              return router.replace(updatedUrl, { scroll: false })
            }}
          >
            <SelectTrigger id="slot_date">
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent position="popper">
              {slots?.length > 0 &&
                slots.map((slot, index) => (
                  <SelectItem value={slot.slot_date} key={index}>
                    {format(parseISO(slot.slot_date), "iiii, MMM d, yyyy")}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {slots.map((slot, index) => {
            const currentSearchParams = new URLSearchParams(
              searchParams.toString()
            )

            const date = currentSearchParams.get("date")
            if (
              date &&
              format(parseISO(slot.slot_date), "yyyy-MM-dd") === date
            ) {
              return (
                <Button
                  id="slot_id"
                  key={index}
                  size="sm"
                  onClick={() => {
                    const currentSearchParams = new URLSearchParams(
                      searchParams.toString()
                    )
                    currentSearchParams.set("slotId", slot.slot_id)
                    const updatedUrl = createUrl(pathname, currentSearchParams)
                    return router.replace(updatedUrl, { scroll: false })
                  }}
                >
                  {formatTimeToHmmaa(slot.start_time)}
                </Button>
              )
            } else {
              return null
            }
          })}
        </div>
      </div>
    </div>
  )
}

export function SlotsSelector({
  slots,
  onDateChange,
}: {
  slots: Slot[]
  onDateChange: (date: string) => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6">
        <div className="flex max-w-[250px]">
          <Select
            onValueChange={(value) => {
              onDateChange(value)
              const currentSearchParams = new URLSearchParams(
                searchParams.toString()
              )
              currentSearchParams.set("date", value)
              const updatedUrl = createUrl(pathname, currentSearchParams)
              return router.replace(updatedUrl, { scroll: false })
            }}
          >
            <SelectTrigger id="slot_date">
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent position="popper">
              {slots?.length > 0 &&
                slots.map((slot, index) => (
                  <SelectItem value={slot.slot_date} key={index}>
                    {format(parseISO(slot.slot_date), "iiii, MMM d, yyyy")}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="grid grid-cols-3 gap-1">
          {slots.map((slot, index) => {
            const currentSearchParams = new URLSearchParams(
              searchParams.toString()
            )

            const date = currentSearchParams.get("date")
            if (
              date &&
              format(parseISO(slot.slot_date), "yyyy-MM-dd") === date
            ) {
              return (
                <Button
                  id="slot_id"
                  key={index}
                  size="sm"
                  onClick={() => {
                    const currentSearchParams = new URLSearchParams(
                      searchParams.toString()
                    )
                    currentSearchParams.set("slotId", slot.slot_id)
                    const updatedUrl = createUrl(pathname, currentSearchParams)
                    return router.replace(updatedUrl, { scroll: false })
                  }}
                >
                  {formatTimeToHmmaa(slot.start_time)}
                </Button>
              )
            } else {
              return null
            }
          })}
        </div> */}
      </div>
    </div>
  )
}

export function EventDetailed({
  event,
  slots,
}: {
  event: EventWithImages
  slots: Slot[]
}) {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null)
  const [active, setActive] = React.useState<boolean>(false)
  const [partySize, setPartySize] = React.useState<string>("")
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const filteredSlots = React.useMemo(
    () =>
      slots.filter(
        (slot) =>
          selectedDate &&
          format(parseISO(slot.slot_date), "yyyy-MM-dd") === selectedDate
      ),
    [slots, selectedDate]
  )

  React.useEffect(() => {
    // const url = `${pathname}?${searchParams.toString()}`;

    const partySize = searchParams.get("totalGuests")
    const slotId = searchParams.get("slotId")

    if (partySize && slotId) {
      setActive(true)
      setPartySize(partySize)
    }
  }, [pathname, searchParams])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">{event.title}</h1>
          <CarouselEImagesDemo images={event.event_images} />
          <p className="text-gray-600">{event.description}</p>
          <div className="grid grid-cols-2 gap-4" id="partySizeSelect">
            <Select
              onValueChange={(value) => {
                const currentSearchParams = new URLSearchParams(
                  searchParams.toString()
                )
                currentSearchParams.set("totalGuests", value)
                const updatedUrl = createUrl(pathname, currentSearchParams)
                return router.replace(updatedUrl, { scroll: false })
              }}
              defaultValue={`${partySize}`}
            >
              <SelectTrigger id="guests">
                <SelectValue placeholder="Number of Guests" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5 Guests</SelectItem>
              </SelectContent>

              <React.Suspense fallback={<LoadingDots className="" />}>
                <SlotsSelector slots={slots} onDateChange={setSelectedDate} />
              </React.Suspense>
            </Select>
          </div>
          <div className="space-y-4" id="timeSlotsSelect">
            <h2 className="text-2xl font-semibold">Available Slots</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedDate ? (
                filteredSlots.map((slot, index) => (
                  <Button
                    key={index}
                    size="sm"
                    onClick={() => {
                      const currentSearchParams = new URLSearchParams(
                        searchParams.toString()
                      )
                      currentSearchParams.set("slotId", slot.slot_id)
                      const updatedUrl = createUrl(
                        pathname,
                        currentSearchParams
                      )
                      router.replace(updatedUrl, { scroll: false })
                    }}
                  >
                    {formatTimeToHmmaa(slot.start_time)}
                  </Button>
                ))
              ) : (
                <p className="text-muted-foreground">Please select a date</p>
              )}
            </div>
          </div>
          {active && (
            <DrawerOrDialog buttonTitle="Get tickets" modalTitle="Checkout">
              <CheckoutWizardDemo />
            </DrawerOrDialog>
          )}
        </div>
      </div>
    </div>
  )
}

function DisclaimerSection() {
  return (
    <>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Disclaimer</h3>
        <p className="text-gray-600">
          Our event features a variety of entertainment options, from jazz bands
          to classical quartets, ensuring there&apos;s something for everyone to
          enjoy. The menu includes an array of dishes prepared by our renowned
          chefs, paired perfectly with our selection of beverages.
        </p>
      </div>
    </>
  )
}

// TODO: helper function - move to time helpers
const formatTimeToHmmaa = (timeString: string) => {
  // Use a placeholder date (e.g., 2000-01-01) and combine it with the time string
  const dateTime = parse(
    `2000-01-01T${timeString}`,
    "yyyy-MM-dd'T'HH:mm:ss",
    new Date()
  )

  // Format the dateTime object to a human-readable form, e.g., "12:00 PM"
  return format(dateTime, "h:mm aa")
}

// export function Slots({ slots }: { slots: Slot[] }) {
//   const [selectedDate, setSelectedDate] = React.useState<string | null>(null)
//   const pathname = usePathname()
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const filteredSlots = slots.filter(
//     (slot) => format(parseISO(slot.slot_date), "yyyy-MM-dd") === selectedDate
//   )

//   return (
//     <div className="flex flex-col">
//       <div className="flex-1 space-y-6">
//         <div className="flex max-w-[250px]">
//           <Select
//             onValueChange={(value) => {
//               setSelectedDate(value)
//               const currentSearchParams = new URLSearchParams(
//                 searchParams.toString()
//               )
//               currentSearchParams.set("date", value)
//               const updatedUrl = createUrl(pathname, currentSearchParams)
//               return router.replace(updatedUrl, { scroll: false })
//             }}
//           >
//             <SelectTrigger id="date">
//               <SelectValue placeholder="Select Date" />
//             </SelectTrigger>
//             <SelectContent position="popper">
//               {slots?.length > 0 &&
//                 slots.map((slot, index) => (
//                   <SelectItem value={slot.slot_date} key={index}>
//                     {format(parseISO(slot.slot_date), "iiii, MMM d, yyyy")}
//                   </SelectItem>
//                 ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="grid grid-cols-3 gap-1">
//           {selectedDate && filteredSlots.length !== 0
//             ? filteredSlots.map((slot, index) => (
//                 <Button
//                   key={index}
//                   size="sm"
//                   onClick={() => {
//                     const currentSearchParams = new URLSearchParams(
//                       searchParams.toString()
//                     )
//                     currentSearchParams.set("slotId", slot.slot_id)
//                     const updatedUrl = createUrl(pathname, currentSearchParams)
//                     return router.replace(updatedUrl, { scroll: false })
//                   }}
//                 >
//                   Start: {formatTimeToHmmaa(slot.start_time)}
//                 </Button>
//               ))
//             : null}
//         </div>
//       </div>
//     </div>
//   )
// }
