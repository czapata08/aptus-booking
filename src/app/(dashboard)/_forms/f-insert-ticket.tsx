"use client"

import * as React from "react"
//validation
import { zodResolver } from "@hookform/resolvers/zod"
//utils
// import { format } from "date-fns"
//icons

//useForm
import { useForm } from "react-hook-form"
//notifications
import { toast } from "sonner"

//ui
// import { cn, createUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
//schema
import { ticketsSchema } from "@/app/server/event_booking/schemas"
//types
import type { CreateTicketsProps } from "@/app/server/event_booking/schemas"
//server action
import {
  updateTickets,
  type UpdateTicketsProps,
} from "@/app/server/event_booking/updates"

export function InsertTicketsForm({ ticketId, ticket }: UpdateTicketsProps) {
  const form = useForm<CreateTicketsProps>({
    resolver: zodResolver(ticketsSchema),
    defaultValues: {
      ...ticket,
    },
    mode: "onChange",
  })

  async function onSubmit(data: CreateTicketsProps) {
    const promise = updateTickets({ ticket: data, ticketId: ticketId })
    console.log("data returned from createETicket", promise)

    toast.promise(promise, {
      loading: "Creating Tickets...",
      success: (data) => {
        if (data) {
          return `Success:\nTickets created with id: ${data}`
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-2">
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
                  value={field.value}
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
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="col-span-2 mt-2.5">
          Submit
        </Button>
      </form>
    </Form>
  )
}
