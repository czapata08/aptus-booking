"use client"

import * as React from "react"
//validation
import { zodResolver } from "@hookform/resolvers/zod"
//icons
import { CalendarIcon, LucideDelete } from "lucide-react"
//useForm
import { useFieldArray, useForm } from "react-hook-form"
//notifications
import { toast } from "sonner"

//ui
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
//schema

//types
import {
  checkoutSchema,
  inviteFriendSchema,
  type CreateCheckoutProps,
  type CreateInviteFriendProps,
} from "@/app/server/event_booking/schemas"
//server action
import { processCheckout } from "@/app/server/event_booking/workflows/checkout"
import { insertInviteFriend } from "@/app/server/stripe/checkout"

interface BookingCheckoutProps {
  slotId: string
  ticketId: string
  ticketAmount: string
}

export function CheckoutForm({
  slotId,
  ticketId,
  ticketAmount,
}: BookingCheckoutProps) {
  console.log(
    "slots:",
    slotId,
    "|",
    "ticketsId:",
    ticketId,
    "From checkout form"
  )

  const [forSomeoneElse, setForSomeoneElse] = React.useState<boolean>(false)

  const form = useForm<CreateCheckoutProps>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      slot_id: slotId,
      ticket_id: ticketId,
      ticket_amount: ticketAmount || "1",
    },
    mode: "onChange",
  })

  const {
    fields: atdntField,
    append: appendAtdnt,
    remove: removeAtdnt,
  } = useFieldArray({
    name: "attendant_name",
    control: form.control,
  })

  const {
    formState: { errors },
  } = form

  console.log("error", errors)

  async function onSubmit(data: CreateCheckoutProps) {
    const promise = processCheckout(data)
    toast.promise(promise, {
      loading: "Creating booking...",
      success: (data) => {
        return `${data}`
      },
      error: (error) => {
        if (error instanceof Error) {
          return `Error:\n${error.message}`
        }
        return `Error:\nFailed to submit form`
      },
    })
  }

  return (
    <Card className="p-2 shadow max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Tickets Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* number of tickets to purchase */}
            <FormField
              control={form.control}
              name="ticket_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Tickets</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How many tickets do you need?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Ticket</SelectItem>
                      <SelectItem value="2">2 Tickets</SelectItem>
                      <SelectItem value="3">3 Tickets</SelectItem>
                      <SelectItem value="4">4 Tickets</SelectItem>
                      <SelectItem value="5">5 Tickets</SelectItem>
                    </SelectContent>
                    <FormDescription>
                      Please select the number of tickets you would like to
                      purchase.
                    </FormDescription>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
            {/* invite guest option - if user selects yes then show the field */}

            {/* attendant name - option if user selects for someone else then show fields*/}
            <div>
              {atdntField.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`attendant_name.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Attendant Name
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Please enter the attendant details.
                      </FormDescription>
                      <FormControl>
                        <Card className="relative shadow">
                          <div className="absolute top-1 right-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAtdnt(index)}
                            >
                              <LucideDelete className="h-4.5 w-4.5" />
                            </Button>
                          </div>
                          <CardHeader>
                            <span className="font-base text-base">
                              Attendant #{index + 1}
                            </span>
                          </CardHeader>
                          <CardContent className="p-2 grid gap-2">
                            <Input
                              {...form.register(`attendant_name.${index}.name`)}
                              placeholder="Name"
                            />
                          </CardContent>
                        </Card>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {forSomeoneElse ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() =>
                    appendAtdnt({
                      name: "",
                    })
                  }
                >
                  Add Attendant
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setForSomeoneElse(true)}
                >
                  Are you booking for someone else?
                </Button>
              )}
            </div>
            {/* checkout total */}

            {/* submit */}
            <Button type="submit" className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Checkout
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export const InviteAFriendForm = (
  props: Pick<BookingCheckoutProps, "slotId">
) => {
  const [inviteGuest, setInviteGuest] = React.useState<boolean>(false)

  const form = useForm<CreateInviteFriendProps>({
    resolver: zodResolver(inviteFriendSchema),
    defaultValues: {
      slot_id: props.slotId,
    },
    mode: "onChange",
  })

  async function onSubmit(data: CreateInviteFriendProps) {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    const promise = insertInviteFriend(formData)
    toast.promise(promise, {
      loading: "Creating booking...",
      success: (data) => {
        return `${data}`
      },
      error: (error) => {
        if (error instanceof Error) {
          return `Error:\n${error.message}`
        }
        return `Error:\nFailed to submit form`
      },
    })
  }

  const {
    formState: { errors },
  } = form

  console.log("error", errors)

  const {
    fields: guestsField,
    append: appendGuest,
    remove: removeGuest,
  } = useFieldArray({
    name: "friends",
    control: form.control,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          {guestsField.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`friends.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Guests To Invite
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Please enter the guest details.
                  </FormDescription>
                  <FormControl>
                    <Card className="relative shadow">
                      <div className="absolute top-1 right-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGuest(index)}
                        >
                          <LucideDelete className="h-4.5 w-4.5" />
                        </Button>
                      </div>
                      <CardHeader>
                        <span className="font-base text-base">
                          Guest #{index + 1}
                        </span>
                      </CardHeader>
                      <CardContent className="p-2 grid gap-2">
                        <Input
                          {...form.register(`friends.${index}.name`)}
                          placeholder="Name"
                        />
                        <Input
                          {...form.register(`friends.${index}.email`)}
                          type="email"
                          placeholder="Email"
                        />
                        <Input
                          {...form.register(`friends.${index}.phone`)}
                          type="tel"
                          placeholder="Phone"
                        />
                      </CardContent>
                    </Card>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {inviteGuest ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() =>
                appendGuest({
                  name: "",
                  email: "",
                  phone: "",
                })
              }
            >
              Add Friend
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setInviteGuest(true)}
            >
              Would you like to invite friends to this event?
            </Button>
          )}
          <Button type="submit" className="w-full mt-4">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Send Invite
          </Button>
        </div>
      </form>
    </Form>
  )
}
