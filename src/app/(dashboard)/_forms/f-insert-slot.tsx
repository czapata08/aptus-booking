"use client"

import * as React from "react"
// url
import { usePathname, useRouter, useSearchParams } from "next/navigation"
//validation
import { zodResolver } from "@hookform/resolvers/zod"
//utils
import { format, formatISO } from "date-fns"
//icons
import { CalendarIcon } from "lucide-react"
//useForm
import { useForm } from "react-hook-form"
//notifications
import { toast } from "sonner"

//ui
import { cn, createUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
//server action
import { insertSlot } from "@/app/server/event_booking/mutations"
//schema
import { slotSchema, ticketsSchema } from "@/app/server/event_booking/schemas"
//types
import type {
  CreateSlotProps,
  CreateTicketsProps,
} from "@/app/server/event_booking/schemas"
import { updateSlot } from "@/app/server/event_booking/updates"
import { createETicketsArr } from "@/app/server/event_booking/workflows/create-e-tickets"

interface UpdateSlotProps {
  eventId?: string
  slotId?: string
  slotData?: CreateSlotProps
  useCase: "insert" | "update"
}

export function InsertSlotForm(slot: UpdateSlotProps) {
  const form = useForm<CreateSlotProps>({
    resolver: zodResolver(slotSchema),
    defaultValues: slot.slotData
      ? slot.slotData
      : {
          event_id: slot.eventId,
          slot_date: new Date(),
          start_time: "18:00",
          end_time: "20:00",
          tickets_available: 0,
        },
    mode: "onChange",
  })

  // ------------------ url state management ------------------
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // const {
  //   formState: { errors },
  // } = form

  async function onSubmit(data: CreateSlotProps) {
    if (slot.useCase === "update") {
      data = {
        ...data,
        slot_date: new Date(data.slot_date),
        start_time: data.start_time,
        end_time: data.end_time,
      }
      console.log("data", data)
    }

    const promise =
      slot.useCase === "update" && slot.slotId
        ? updateSlot({ slot: data, slotId: slot.slotId })
        : insertSlot(data)

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        if (data) {
          // console.log("data from sucess slot insert client", data)
          // ------------------ url state management ------------------
          const currentSearchParams = new URLSearchParams(
            searchParams.toString()
          )

          if (slot.useCase === "update") {
            return `Success:\nSlot updated successfully`
          }

          const createNewUrl = createUrl(pathname, currentSearchParams)
          router.replace(createNewUrl, { scroll: false })
          return `Success:\nSlot created with id: ${data.slot_id}`
        }
      },
      error: (error) => {
        if (error instanceof Error) {
          return `Error:\n${error.message}`
        }

        return `Error:\nFailed to create slot`
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 space-y-2.5 rounded p-4"
      >
        <FormField
          control={form.control}
          name="slot_date"
          render={({ field }) => (
            <FormItem className="mt-auto flex flex-col gap-1 space-y-2 col-span-2">
              <FormLabel>Date</FormLabel>
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="time"
                  className="w-full"
                  placeholder="Start Time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="time"
                  className="w-full"
                  placeholder="End Time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tickets_available"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Tickets</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="col-span-2">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export function InsertTicketsForm({
  slotId,
  eventId,
}: {
  slotId: string
  eventId: string
}) {
  const id = slotId.toString()
  console.log("slotId inside insertTicketForm", id)

  const form = useForm<CreateTicketsProps>({
    resolver: zodResolver(ticketsSchema),
    defaultValues: {
      slot_id: id,
      ticket_name: "",
      total_tickets: 0,
      ticket_price: 0,
      event_id: eventId,
    },
    mode: "onChange",
  })

  async function onSubmit(data: CreateTicketsProps) {
    const promise = createETicketsArr(data)
    console.log("data returned from createETicket", promise)

    toast.promise(promise, {
      loading: "Creating Tickets...",
      success: (data) => {
        if (data) {
          return `Success:\nTickets created with id: ${data.itemsAdded.length}`
        }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="ticket_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="VIP, Regular, ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total_tickets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Tickets</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticket_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="col-span-2">
          Submit
        </Button>
      </form>
    </Form>
  )
}
