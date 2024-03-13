import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckoutForm } from "@/app/_payments/e-checkout-form"
// import { CheckoutForm } from "@/app/(dashboard)/_forms/checkout-form"
import {
  queryEventAndImagesByRef,
  selectSlots,
} from "@/app/server/event_booking/queries"

import { EventForm } from "../../_components/checkout/e-checkout"
import { EventContent, InfoCard } from "../../_components/s-components"

export default async function EventPage({
  params,
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
  params: { id: string }
  // searchParams: Record<string, string | string[] | undefined>
}) {
  //this queries event with images
  const eventData = await queryEventAndImagesByRef(params.id)

  // console.log("search params ", searchParams)
  // console.log("params id", params.id)
  // console.log("Slots data from page parent component: ", slotsData)
  //   console.log("Event data from parent component: ", eventData)

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
          <div className="md:col-span-3">
            <h1 className="text-4xl font-semibold mb-2">{eventData.title}</h1>
            <p className="text-lg text-gray-500">{eventData.location}</p>
          </div>
          {/* Main  */}

          <EventContent event={eventData} />

          {/* Main  */}
          {/* Event Details */}
          {/* <EventDetails /> */}

          {/* Event Details */}

          {/* <EventForm2 event={eventData} /> */}
          <div className="md:col-span-1 col-span-3">
            <EventForm
              event={eventData}
              current={
                searchParams.partySize ? Number(searchParams.partySize) : 1
              }
            />
          </div>

          <div className="grid-span-3">
            <CheckoutDialog />
          </div>

          {/* InfoCard */}
          <InfoCard />
          {/* InfoCard */}
        </div>
      </div>
    </div>
  )
}

function CheckoutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Checkout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] overflow-y-auto h-[60dvh]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Checkout</DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4"> */}
        {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div> */}
        {/* </div> */}
        <CheckoutForm uiMode="embedded" />

        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
