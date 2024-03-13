"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
//validation
import { zodResolver } from "@hookform/resolvers/zod"
//utils
import { format } from "date-fns"
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
import { Checkbox } from "@/components/ui/checkbox"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
//server action
import { insertEvent } from "@/app/server/event_booking/mutations"
//schema
import { eventSchema } from "@/app/server/event_booking/schemas"
//types
import type { CreateEventProps } from "@/app/server/event_booking/schemas"
import { updateEvent } from "@/app/server/event_booking/updates"

//todo - set default values
//todo - set event type

interface EventFormProps {
  eventId?: string
  event?: CreateEventProps
  useCase: "insert" | "update"
}

export function InsertEventForm(props: EventFormProps) {
  // console.log("event form props", props)
  //todo - date validate expects date but receives string when usecase is update

  // ------------------ form state management ------------------
  const form = useForm<CreateEventProps>({
    resolver: zodResolver(eventSchema),
    defaultValues: props.event
      ? {
          ...props.event,
          start_date: new Date(props.event.start_date),
          end_date: new Date(props.event.end_date),
        }
      : {
          start_date: new Date(),
          end_date: new Date(),
          event_type: "public",
          recurring_event: false,
          event_status: "active",
        },
    mode: "onChange",
  })

  // ------------------ url state management ------------------
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // ------------------ form submission ------------------
  async function onSubmit(data: CreateEventProps) {
    const promise =
      props.useCase === "update" && props.eventId
        ? updateEvent({ event: data, eventId: props.eventId })
        : insertEvent({ event: data })

    toast.promise(promise, {
      loading: "Loading...",
      success: (result) => {
        if (result && result) {
          const currentSearchParams = new URLSearchParams(
            searchParams.toString()
          )

          if (props.useCase === "update") {
            currentSearchParams.set("success", "This event has been updated")
          } else {
            currentSearchParams.set("rowId", result)
            currentSearchParams.set("bucketId", "event_images")
            currentSearchParams.set("formStep", "2")
          }

          const createNewUrl = createUrl(pathname, currentSearchParams)
          router.replace(createNewUrl, { scroll: false })
        }

        return `Success:\n${JSON.stringify(result, null, 2)}`
      },
      error: (error) => {
        // Error logic here. error.message contains the error message.
        if (error instanceof Error) {
          return `Error:\n${error.message}`
        }
        // Fallback error message
        return `Error:\nFailed to submit form`
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 space-y-2.5 rounded p-4 max-w-xl"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>Title of Event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:col-span-1 col-span-2">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="mt-auto flex flex-col gap-1">
                <FormLabel>Start Date</FormLabel>
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
                <FormDescription className="ml-1">
                  Set the date of the event or the first date of the recurring
                  event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="mt-auto flex flex-col gap-1">
                <FormLabel>End Date</FormLabel>
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
                <FormDescription className="ml-1">
                  If it is a one day event, please select the same date for
                  start and end date.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="event_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of the event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="members_only">Members Only</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Set Event Type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                If it is a free event please set the price to 0.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Event Location</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>Location of Event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Event description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Marketing description of event."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                  Marketing description of event.
                </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recurring_event"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Recurring Event</FormLabel>
              <FormControl>
                <Checkbox
                  className="ml-1"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is this a recurring event?</FormLabel>
                <FormDescription>
                  If it is a recurring event, please make sure to select the
                  start and end date.
                </FormDescription>
              </div>
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

// Get a new searchParams string by merging the current
// searchParams with a provided key/value pair
// const createQueryString = React.useCallback(
//   (name: string, value: string) => {
//     const params = new URLSearchParams(searchParams.toString())
//     params.set(name, value)

//     return params.toString()
//   },
//   [searchParams]
// )
