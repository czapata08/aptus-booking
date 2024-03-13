"use client"

//validation
import { zodResolver } from "@hookform/resolvers/zod"
//icons
import { Delete } from "lucide-react"
//useForm
import { useFieldArray, useForm } from "react-hook-form"
//notifications
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
//ui
// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
//server
import {
  insertLabel,
  linkEventWithLabels,
} from "@/app/server/event_booking/mutations"
//schema
import {
  eventLabelsSchema,
  labelsSchema,
} from "@/app/server/event_booking/schemas"
//types
import type {
  CreateLabelsProps,
  LinkEventWithLabelsProps,
  SetLabelsArr,
} from "@/app/server/event_booking/schemas"

export function InsertLabelForm() {
  const form = useForm<CreateLabelsProps>({
    resolver: zodResolver(labelsSchema),
    mode: "onChange",
  })

  async function onSubmit(data: CreateLabelsProps) {
    const promise = insertLabel(data)

    toast.promise(promise, {
      loading: "Creating label...",
      success: (response) => {
        form.reset()
        return response
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
          name="label_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Mixology" {...field} />
                <FormDescription>
                  Labels are use to categorize events, for instance: &quot;wine
                  tasting&quot;
                </FormDescription>
                <FormMessage />
              </FormControl>
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

interface SetLabelsObj {
  labelId: string
  label_name: string
}

interface SetEventLabelsProps {
  eventId: string
  labels: SetLabelsObj[]
}

export function SetEventLabels(props: SetEventLabelsProps) {
  const form = useForm<LinkEventWithLabelsProps>({
    resolver: zodResolver(eventLabelsSchema),
    defaultValues: {
      event_id: props.eventId,
    },
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "labelsArr",
    control: form.control,
  })

  async function onSubmit(data: LinkEventWithLabelsProps) {
    const promise = linkEventWithLabels(data)

    toast.promise(promise, {
      loading: "Linking Event labels...",
      success: (response) => {
        form.reset()
        return response
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
          name="labelsArr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <Select
                onValueChange={() =>
                  append({ label_id: field.onChange.toString() })
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select all labels that match this event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {props.labels.map((label) => {
                    return (
                      <SelectItem key={label.labelId} value={label.labelId}>
                        {label.label_name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                Labels are use to categorize events, for instance: &quot;wine
                tasting&quot;
              </FormDescription>
              <FormMessage />
              <div className="mt-2 grid grid-cols-2 justify-items-center gap-2 md:grid-cols-2 md:gap-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Badge key={field.id} variant="outline">
                      {props.labels.map((label) => {
                        if (label.labelId === field.id) {
                          return label.label_name
                        }
                      })}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Delete className="h-4 w-4" />
                      </Button>
                    </Badge>
                  </div>
                ))}
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
