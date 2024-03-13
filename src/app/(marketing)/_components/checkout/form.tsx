"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  insertBookingDetails,
  insertInviteFriend,
} from "@/app/server/stripe/checkout"

function InsertBookingDetails({ bookingId }: { bookingId: string }) {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <input id="booking_id" value={bookingId} hidden={true} />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="guest_notes">Additional Information</Label>
          <Input id="guest_notes" type="text" value="guest_notes" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="dietary_notes">Any Dietary restrictions?</Label>
          <Input id="dietary_notes" type="text" value="dietary_notes" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="celebration_notes">
            Any celebrations that we should be aware of?
          </Label>
          <Input id="is_celebration" value="is_celebration" type="text" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Button type="submit" formAction={insertBookingDetails}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}

function InviteFriendForm(slot_id: string) {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <Input id="slot_id" value={slot_id} hidden />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Button type="submit" formAction={insertInviteFriend}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}

export { InsertBookingDetails, InviteFriendForm }
