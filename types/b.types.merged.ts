import { type MergeDeep } from "type-fest"
import {
  type Database as DatabaseGenerated,
  type Enums as EnumsGenerated,
  type Tables as TablesGenerated,
} from "types/db.booking.types"

export { type Json } from "types/db.booking.types"

export type Database = MergeDeep<DatabaseGenerated, Record<string, never>>
export type Tables<
  T extends
    | "audit_log"
    | "bookings"
    | "event_images"
    | "event_labels"
    | "events"
    | "feedback"
    | "labels"
    | "recurring_event"
    | "recurring_event_dates"
    | "slots"
    | "tickets"
    | { schema: "event_booking" },
> = MergeDeep<TablesGenerated<T>, Record<string, never>> // Added type argument T
export type Enums<
  T extends
    | "booking_status"
    | "event_status"
    | "event_type"
    | { schema: "event_booking" },
> = MergeDeep<EnumsGenerated<T>, Record<string, never>> // Added type argument T
