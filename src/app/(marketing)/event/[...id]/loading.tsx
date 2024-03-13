import Grid from "@/components/grid"

export default function Loading() {
  return (
    <div className="max-w-7xl mt-6 mx-auto px-4 sm:px-6 lg:px-8">
      <Grid className="grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          {Array(1)
            .fill(0)
            .map((_, index) => {
              return (
                <Grid.Item
                  key={index}
                  className="animate-pulse bg-neutral-100 dark:bg-neutral-900"
                />
              )
            })}
        </div>
        <div className="md:col-span-1">
          {Array(1)
            .fill(0)
            .map((_, index) => {
              return (
                <Grid.Item
                  key={index}
                  className="animate-pulse bg-neutral-100 dark:bg-neutral-900"
                />
              )
            })}
        </div>
      </Grid>
    </div>
  )
}
