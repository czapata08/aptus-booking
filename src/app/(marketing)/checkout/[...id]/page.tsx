import * as React from "react"

import { DrawerOrDialog } from "@/components/drawer-or-dialog"
import { CheckoutForm } from "@/app/(dashboard)/_forms/checkout-form"
import { CheckoutWizardDemo } from "@/app/(marketing)/_components/checkout/checkout"

import { EventDetailedWrapper } from "../../_components/slots/slot-wrapper"

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
  params: { id: string }
}) {
  return (
    <div className="container h-screen flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200 mb-4">
      <div className="text-4xl font-semibold mb-2 py-4">Event Test</div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <EventDetailedWrapper eventId={params.id} />
      </React.Suspense>
    </div>
  )
}

// import { queryEventAndImagesByRef } from "@/app/server/event_booking/queries"

// import { EventForm } from "../../_components/checkout/e-checkout"
// function CheckoutSection() {

//   const eventData = await queryEventAndImagesByRef(params.id)
//   return (
//     <div className="flex flex-1">
//       <EventForm
//         event={eventData}
//         current={Number(searchParams?.partySize ?? "1")}
//       />
//       <CheckoutForm slotId="999" ticketId="888" ticketAmount="1" />
//     </div>)
// }
