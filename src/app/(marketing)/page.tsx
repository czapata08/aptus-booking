import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import Grid from "@/components/grid"

// import type { EC } from "@/app/server/event_booking/schemas/e-components-types"

import { selectAEventsWithImages } from "../server/event_booking/static/s-queries"
import { EventsDisplaySection } from "./_components/events/e-display-grid"
import { SectionOne } from "./_components/events/events-top-section"

// import { ToolkitBar } from "./_components/layout-components"

//revalidate cache once a day
export const revalidate = 60 * 60 * 24

export default async function RootPage() {
  const events = await selectAEventsWithImages()

  if (!events) {
    return <div>No events found</div>
  }

  // let eventsMapped: EC[] = []
  // if (events && events.length > 0) {
  //   eventsMapped = events.map((event) => {
  //     return {
  //       id: event.id,
  //       title: event.title,
  //       location: event.location,
  //       price: event.price,
  //       description: event.description,
  //       start_date: event.start_date,
  //       // labels: event.labels,
  //     }
  //   })
  // }

  return (
    <div className="bg-background">
      {/* toolkit */}
      {/* <div className="px-4 py-6 md:px-8">
        <ToolkitBar />
      </div> */}

      {/* main content */}
      <main>
        {/* top section */}
        <section className="px-4 py-6 md:mx-8">
          <h1 className="mb-4 text-4xl font-bold">
            Esme&apos;s Lincoln Park Experiences
          </h1>
          <Suspense fallback={<SkeletonSectionOne />}>
            <SectionOne />
          </Suspense>
        </section>
        {/* second section */}
        <div className="px-4 py-6 xl:mx-8">
          <section id="eventsDisplay" className="md:mx-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <Button variant="ghost">EXPLORE ALL</Button>
            </div>
            <p className="py-2 text-lg">
              Unique culinary narratives, wine tastings, mixology classes and
              more.
            </p>
            <Suspense fallback={<SkeletonEventsDisplay />}>
              <EventsDisplaySection events={events} type="landing" />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  )
}

function SkeletonSectionOne() {
  return (
    <Grid className="grid gap-2 py-4 md:grid-cols-4">
      {Array(4)
        .fill(0)
        .map((_, index) => {
          return (
            <Grid.Item
              key={index}
              className="animate-pulse bg-neutral-200 dark:bg-neutral-800 h-48 w-full rounded-lg"
            />
          )
        })}
    </Grid>
  )
}

function SkeletonEventsDisplay() {
  return (
    <Grid className="grid gap-2 py-4 sm:grid-cols-2 md:grid-cols-4">
      {Array(8)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="relative animate-pulse bg-neutral-100 dark:bg-neutral-800 h-48 rounded-lg"
            >
              <div className="space-y-3 absolute bottom-4 w-full px-2">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded col-span-2"></div>
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-neutral-200 rounded"></div>
              </div>
            </div>
          )
        })}
    </Grid>
  )
}

// function SkeletonCardWContent() {
//   return (
//     <div className="border bg-neutral-100 dark:bg-neutral-800 shadow rounded-md p-4 max-w-sm w-full mx-auto">
//       <div className="animate-pulse flex space-x-4">
//         <div className="rounded-full bg-neutral-200 dark:bg-slate-700 h-10 w-10"></div>
//         <div className="flex-1 space-y-6 py-1">
//           <div className="h-2 bg-neutral-200 dark:bg-slate-700 rounded"></div>
//           <div className="space-y-3">
//             <div className="grid grid-cols-3 gap-4">
//               <div className="h-2 bg-neutral-200 dark:bg-slate-700 rounded col-span-2"></div>
//               <div className="h-2 bg-neutral-200 dark:bg-slate-700 rounded col-span-1"></div>
//             </div>
//             <div className="h-2 bg-neutral-200 dark:bg-slate-700 rounded"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
