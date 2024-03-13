import { type Tables } from "@/types/b.types.merged";

export type EventBase = Tables<'events'>
export type SlotBase = Tables<'slots'>
export type BookingBase = Tables<'bookings'>
export type TicketBase = Tables<'tickets'>
export type LabelBase = Tables<'labels'>
export type EventImageBase = Tables<'event_images'>
export type EventLabelBase = Tables<'event_labels'>



export type Event = Omit<EventBase, 'updated_at' | 'created_at'>
export type Slot = Pick<SlotBase, 'event_id' | 'slot_date' | 'slot_id' | 'start_time' | 'end_time' | 'tickets_available'>
export type Booking = Omit<BookingBase, 'updated_at' | 'created_at'>
export type Ticket = Pick<TicketBase, 'event_id' | 'slot_id' | 'sold_tickets' | 'stripe_id' | 'ticket_id' | 'ticket_name' | 'ticket_price'>
export type Label = Omit<LabelBase, 'updated_at' | 'created_at'>
export type EventImage = Pick<EventImageBase, 'image_id' | 'event_id' | 'image_url' | 'caption' | 'metadata'>
export type EventLabel = Omit<EventLabelBase, 'updated_at' | 'created_at'>

export type EventMainImage = Pick<EventImageBase, 'image_id' | 'event_id' | 'image_url' | 'caption' | 'metadata' | 'is_main_image'>
export type EC = Pick<EventBase, 'id' | 'title' | 'price' | 'location' | 'description' | 'start_date'>
export interface EventWithImages extends EC {
    event_images: EventImage[]
}
export interface EventWithMainImage extends EC {
    event_images: EventMainImage[]
}

    // | 'status' | 'type' | 'event_type' | 'event_status' | 'event_images' | 'event_labels' | 'slots'>

// [Explanation of EventWithSlots type]
// If the Event type already includes a slots property of type Slot[], then
//  EventWithSlots is identical to Event.If Event does not include a 
//  slots property, then EventWithSlots is a combination of Event and an 
//  additional slots property of type Slot[].

// This is a useful pattern when you want to ensure that a certain 
// property always exists on a type, but you also want to preserve 
// any additional properties that might be on the original type.
export type EventWithSlots = Event extends { slots: Slot[] } ? Event : Event & { slots: Slot[] }
