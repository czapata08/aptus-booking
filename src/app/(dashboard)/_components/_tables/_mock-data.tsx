import { type EventTableProps } from "@/app/server/event_booking/schemas"

export const mockEvents: EventTableProps[] = [
  {
    id: "event1",
    title: "Art Exhibition",
    start_date: new Date("Jan 25, 2024"),
    end_date: new Date("Feb 28, 2024"),
    event_type: "public",
    slots: 50,
    // price: 20.00,
    // sold_slots: 20,
    // time: '10:30 AM - 11:30 AM',
    // imageUrl: 'https://unsplash.it/100/100?image=1010' // Using Unsplash for mock images
  },
  {
    id: "event2",
    title: "Music Festival",
    start_date: new Date("Feb 12, 2024"),
    end_date: new Date("Feb 19, 2024"),
    event_type: "members_only",
    slots: 45,
    // price: 50.00,
    // sold_slots: 28,
    // time: '4:00 PM - 5:00 PM',
    // imageUrl: 'https://unsplash.it/100/100?image=1011'
  },
  {
    id: "event3",
    title: "Chef's Table",
    start_date: new Date("Jan 25, 2024"),
    end_date: new Date("March 8, 2024"),
    event_type: "private",
    slots: 50,
    // price: 20.00,
    // sold_slots: 20,
    // time: '10:30 AM - 11:30 AM',
    // imageUrl: 'https://unsplash.it/100/100?image=1012' // Using Unsplash for mock images
  },
  {
    id: "event4",
    title: "Music Festival",
    start_date: new Date("March 12, 2024"),
    end_date: new Date("March 18, 2024"),
    event_type: "private",
    slots: 45,
    // price: 50.00,
    // sold_slots: 28,
    // time: '4:00 PM - 5:00 PM',
    // imageUrl: 'https://unsplash.it/100/100?image=1013'
  },
  {
    id: "event5",
    title: "Gallery Dinner",
    start_date: new Date("April 25, 2024"),
    end_date: new Date("April 25, 2024"),
    event_type: "public",
    slots: 50,
    // price: 20.00,
    // sold_slots: 20,
    // time: '10:30 AM - 11:30 AM',
    // imageUrl: 'https://unsplash.it/100/100?image=1014'
  },
  {
    id: "event6",
    title: "Modern Mocktails and Canapes",
    start_date: new Date("Feb 12, 2024"),
    end_date: new Date("Feb 12, 2024"),
    event_type: "private",
    slots: 45,
    // price: 50.00,
    // sold_slots: 28,
    // time: '4:00 PM - 5:00 PM',
    // imageUrl: 'https://unsplash.it/100/100?image=1015'
  },
  {
    id: "event7",
    title: "Chef's Table",
    start_date: new Date("May 25, 2024"),
    end_date: new Date("May 25, 2024"),
    event_type: "public",
    slots: 50,
    // price: 20.00,
    // sold_slots: 20,
    // time: '10:30 AM - 11:30 AM',
    // imageUrl: 'https://unsplash.it/100/100?image=1016' // Using Unsplash for mock images
  },
  {
    id: "event8",
    title: "Music Festival",
    start_date: new Date("March 12, 2024"),
    end_date: new Date("March 12, 2024"),
    event_type: "members_only",
    slots: 45,
    // price: 50.00,
    // sold_slots: 28,
    // time: '4:00 PM - 5:00 PM',
    // imageUrl: 'https://unsplash.it/100/100?image=1008'
  },
]
