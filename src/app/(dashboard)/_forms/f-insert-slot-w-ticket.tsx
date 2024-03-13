"use client"

import * as React from "react"
// url
import { usePathname, useRouter, useSearchParams } from "next/navigation"
//validation
import { zodResolver } from "@hookform/resolvers/zod"
//utils
import { format } from "date-fns"
//icons
import {
  BookPlus,
  CalendarIcon,
  LucideDelete,
  TicketPlusIcon,
} from "lucide-react"
//useForm
import { useFieldArray, useForm, type Control } from "react-hook-form"
//notifications
import { toast } from "sonner"

//ui
import { cn, createUrl } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
//schema
import { slotWithTicketsSchema } from "@/app/server/event_booking/schemas"
//types
import type { CreateSlotWithTicketsProps } from "@/app/server/event_booking/schemas"
//server action
import { createSlotWTickets } from "@/app/server/event_booking/workflows/create-e-tickets"

export function InsertSlotsWTickets({ eventId }: { eventId: string }) {
  // ------------------ url state management ------------------
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  // ------------------ form state management ------------------
  const form = useForm<CreateSlotWithTicketsProps>({
    resolver: zodResolver(slotWithTicketsSchema),
    defaultValues: {
      event_id: eventId,
      slots: [defaultSlot(eventId)],
    },
    mode: "onChange",
  })
  // ------------------ Slots Array ------------------
  const {
    fields: slotsField,
    append: appendSlot,
    remove: removeSlot,
  } = useFieldArray({
    name: "slots",
    control: form.control,
  })

  const errors = form.formState.errors
  console.log("errors", errors)

  // ------------------ form submit ------------------
  async function onSubmit(data: CreateSlotWithTicketsProps) {
    console.log("data", data)
    const promise = createSlotWTickets(data)

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        if (data) {
          console.log("data from sucess slot insert client", data)
          // ------------------ url state management ------------------
          const currentSearchParams = new URLSearchParams(
            searchParams.toString()
          )
          console.log("Current search params: ", currentSearchParams)

          currentSearchParams.set("slotWTickets", "true")
          const createNewUrl = createUrl(pathname, currentSearchParams)

          router.replace(createNewUrl, { scroll: false })

          return `Success:\nSlot created with id: ${data.data}`
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid-flow-row md:grid-flow-row">
          {slotsField.map((slot, index) => {
            // ------------------- Tickets Array -------------------
            return (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={index + slot.id}
              >
                <AccordionItem value={"slot" + index}>
                  <AccordionTrigger className="py-1">
                    Slot #{index + 1}
                    <div className="ml-auto">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="py-0.5 mr-4 pl-2"
                        onClick={() => removeSlot(index)}
                      >
                        <LucideDelete className="h-4 w-4" />
                      </Button>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="relative p-2">
                      <div className="absolute top-0 right-0">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSlot(index)}
                        >
                          <LucideDelete className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="grid gap-2">
                        <FormField
                          control={form.control}
                          name={`slots.${index}.slot_date`}
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
                                          !field.value &&
                                            "text-muted-foreground"
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
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
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
                          name={`slots.${index}.start_time`}
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
                          name={`slots.${index}.end_time`}
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
                          name={`slots.${index}.slot_size`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Tickets</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>

                      <SlotTicketsForm
                        index={index}
                        control={form.control}
                        eventId={eventId}
                      />
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Button
            type="button"
            onClick={() => appendSlot(defaultSlot(eventId))}
          >
            <BookPlus className="h-4 w-4 mr-2" />
            Add Slot
          </Button>

          <Button type="submit" className="col-span-2">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

const SlotTicketsForm = ({
  index,
  control,
  eventId,
}: {
  index: number
  control: Control<CreateSlotWithTicketsProps>
  eventId: string
}) => {
  const {
    fields: ticketsFields,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    name: `slots.${index}.tickets`,
    control,
  })

  return (
    <>
      {ticketsFields.map((ticket, index) => (
        <Card key={index} className="relative p-4 my-4 focus:shadow-xl">
          <CardHeader className="p-1">
            <CardDescription>ticket {index + 1}</CardDescription>
            <div className="absolute top-0.5 right-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeTicket(index)}
              >
                <LucideDelete className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <div className="grid grid-flow-row md:grid-flow-col gap-2">
            <FormField
              control={control}
              name={`slots.${index}.tickets.${index}.ticket_name`}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Ticket Name</FormLabel> */}
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ticket Name: VIP, Base, ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`slots.${index}.tickets.${index}.total_tickets`}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Total Tickets</FormLabel> */}
                  <FormControl>
                    <Input
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      placeholder="Total Tickets"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`slots.${index}.tickets.${index}.ticket_price`}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Ticket Price</FormLabel> */}
                  <FormControl>
                    <Input
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      placeholder="Ticket Price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>
      ))}

      <Button
        className="mt-2"
        type="button"
        onClick={() =>
          appendTicket({
            event_id: eventId,
            slot_id: "", // Ensure this is correctly assigned
            ticket_name: "",
            total_tickets: 0,
            sold_tickets: 0,
            ticket_price: 0,
            stripe_price_id: null,
          })
        }
      >
        <TicketPlusIcon className="h-4 w-4 mr-2" />
        Add Ticket
      </Button>
    </>
  )
}

const defaultSlot = (eventId: string) => {
  return {
    slot_date: new Date(),
    start_time: "12:00",
    end_time: "13:00",
    slot_size: 0,
    tickets: [
      {
        event_id: eventId,
        slot_id: "",
        ticket_name: "",
        total_tickets: 0,
        sold_tickets: 0,
        ticket_price: 0,
        stripe_price_id: null,
      },
    ],
  }
}
