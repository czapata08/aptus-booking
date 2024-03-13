import { z } from "zod"

// -------------- General Schemas --------------
export const uuid = z.string()

export const nonNegativeInteger = z
  .number()
  .min(0, { message: "Value cannot be negative." })
  .int({ message: "Value must be an integer." })

// -------------- Database Enum Schemas --------------
export const eventTypeEnum = z.enum([
  "members_only",
  "private",
  "public",
  "pending",
])

export const eventStatusEnum = z.enum([
  "active",
  "cancelled",
  "completed",
  "postponed",
  "pending",
])

export const bookingStatusEnum = z.enum([
  "booked",
  "cancelled",
  "fullfilled",
  "refunded",
  "pending",
])

//------------ Date and Time Schemas ------------
export const date = z.date({
  required_error: "Date is required",
})

export const dateDefaultNow = z.date().default(() => new Date())

export const timeWSeconds = z
  .string({
    required_error: "Time is required",
  })
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, {
    message: "Invalid start time format. Use HH:MM:SS.",
  })

export const timeNoSeconds = z
  .string({
    required_error: "Time is required",
  })
  .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid start time format. Use HH:MM.",
  })

// -------------- Event Schemas --------------

export const eventSchema = z.object({
  id: uuid.optional(),
  title: z
    .string({
      required_error: "A title is required.",
    })
    .max(58),
  description: z
    .string({
      required_error: "A description is required.",
    })
    .max(358, "Description must be below 358 characters")
    .min(10, "Description must be at least 10 characters long."),
  price: z.number().nullable(),
  event_type: eventTypeEnum,
  event_status: eventStatusEnum,
  start_date: date,
  end_date: date,
  location: z.string({
    required_error: "A location is required.",
  }),
  recurring_event: z
    .boolean({
      required_error: "Please select if this is a recurring event or not.",
    })
    .default(false),
})

export type CreateEventProps = z.infer<typeof eventSchema>

export const eventTableSchema = z.object({
  id: uuid,
  title: z.string(),
  event_type: eventTypeEnum,
  start_date: date,
  end_date: date,
  slots: nonNegativeInteger,
})

export type EventTableProps = z.infer<typeof eventTableSchema>

export const ticketsSchema = z.object({
  event_id: uuid,
  slot_id: uuid,
  ticket_name: z.string({
    required_error: "A ticket name is required.",
  }),
  total_tickets: z
    .number()
    .min(0, { message: "Total tickets cannot be negative." })
    .int({ message: "Total tickets must be an integer." }),
  sold_tickets: z
    .number()
    .min(0, { message: "Sold tickets cannot be negative." })
    .int({ message: "Sold tickets must be an integer." })
    .default(0),
  ticket_price: z
    .number()
    .min(0, { message: "Ticket price cannot be negative." }),
  stripe_price_id: z.string().nullable().optional(),
})

export type CreateTicketsProps = z.infer<typeof ticketsSchema>

export const slotSchema = z.object({
  event_id: uuid,
  slot_date: date,
  start_time: timeWSeconds.or(timeNoSeconds),
  end_time: timeWSeconds.or(timeNoSeconds),
  tickets_available: nonNegativeInteger,
})

export type CreateSlotProps = z.infer<typeof slotSchema>

export const slotWithTicketsSchema = z.object({
  event_id: uuid,
  slots: z.array(
    z.object({
      slot_date: date,
      start_time: timeWSeconds.or(timeNoSeconds),
      end_time: timeWSeconds.or(timeNoSeconds),
      slot_size: nonNegativeInteger,
      tickets: z.array(ticketsSchema),
    })
  ),
})

export type CreateSlotWithTicketsProps = z.infer<typeof slotWithTicketsSchema>

export const bookingSchema = z.object({
  ticket_id: uuid,
  slot_id: uuid,
  user_id: uuid,
  attendant_name: z.string().optional(),
  booking_status: bookingStatusEnum.default("pending"), // Defaults to 'booked'
})

export type CreateBookingProps = z.infer<typeof bookingSchema>

// -------------- Checkout Schemas --------------
export const checkoutSchema = z.object({
  ticket_id: uuid,
  slot_id: uuid,
  //if more than two tickets are bought, then this is required - set below in refinement
  checkout_total: z
    .number()
    .min(0, { message: "Total cannot be negative." })
    .optional(),
  ticket_amount: z.string({
    required_error: "Ticket amount is required.",
  }),

  attendant_name: z
    .array(
      z.object(
        {
          name: z.string(),
        },
        {
          required_error: "Attendant name is required.",
        }
      )
    )
    .optional(),
})
// .refine(
//   (data) => {
//     if (data.ticket_amount > 2) {
//       return data.attendant_name && data.attendant_name.length >= 2
//     }
//     return true
//   },
//   {
//     message:
//       "If more than two tickets are bought, then attendant_name is required with a minimum of two entries.",
//     path: ["attendant_name"], // Specify the path of the field that fails this refinement check
//   }
// )
export type CreateCheckoutProps = z.infer<typeof checkoutSchema>

export const inviteFriendSchema = z.object({
  slot_id: uuid,
  friends: z
    .array(
      z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
      })
    )
    .optional(),
})

export type CreateInviteFriendProps = z.infer<typeof inviteFriendSchema>

export const labelsSchema = z.object({
  label_name: z.string(),
})

export type CreateLabelsProps = z.infer<typeof labelsSchema>

export const eventLabelsSchema = z.object({
  event_id: z.string({ required_error: "Event id is required." }),
  label_id: z.string({ required_error: "Label id is required." }),
  labelsArr: z.array(
    z.object({
      label_id: z.string(),
    })
  ),
})

export type LinkEventWithLabelsProps = z.infer<typeof eventLabelsSchema>

const labelsArr = z.array(
  z.object({
    label_id: z.string(),
  })
)
export type SetLabelsArr = z.infer<typeof labelsArr>

export const image_url = z
  .string({
    required_error: "Image URL is required.",
  })
  .url({
    message: "Invalid URL format.",
  })

export const eventImgSchema = z.object({
  event_id: z.string({ required_error: "Event id is required." }),
  caption: z.string(),
  metadata: z.string(),
  image_url: z.string({
    required_error: "Image URL is required.",
  }),
})

export type CreateEventImgProps = z.infer<typeof eventImgSchema>
