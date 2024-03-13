import { ImagePlusIcon } from "lucide-react"

import Grid from "@/components/grid"

export default function EventLoading() {
  return (
    <div className="p-4 flex flex-col w-full rounded border border-cyan-500">
      <Grid className="grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, index) => {
            return (
              <Grid.Item
                key={index}
                className="rounded animate-pulse bg-neutral-100 dark:bg-neutral-900"
              >
                <div className="flex justify-center items-center h-full">
                  <ImagePlusIcon className="h-10 w-10 text-slate-400" />
                </div>
              </Grid.Item>
            )
          })}
      </Grid>

      <div className="flex flex-row justify-between items-center mt-2">
        <Grid className="grid-cols-6">
          {Array(6)
            .fill(0)
            .map((_, index) => {
              return (
                <Grid.Item
                  key={index}
                  className="rounded animate-pulse bg-neutral-100 dark:bg-neutral-900 h-8 w-20"
                />
              )
            })}
        </Grid>
      </div>
    </div>
  )
}
