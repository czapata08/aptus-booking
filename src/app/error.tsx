"use client"

// Error components must be Client Components
import { useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Root layout error page", error)
  }, [error])

  return (
    <div className="flex h-[calc(80vh)] items-center justify-center">
      <Card className="max-w-sm py-10">
        <CardTitle>
          <h1 className="mx-1 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
            Sorry, we ran into an issue
          </h1>
          <CardHeader className="mx-auto font-medium leading-7 [&:not(:first-child)]:mt-6">
            Please try refreshing and contact us if the problem persists.
          </CardHeader>
          <CardContent>
            <p className="text-base font-light leading-7 [&:not(:first-child)]:mt-6">
              Error details: {error.message}
            </p>{" "}
          </CardContent>
          <CardFooter className="flex flex-row items-center justify-center gap-2">
            <Button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try again
            </Button>
            <Button>Contact Support</Button>
            <Button>
              <Link href="/store">Back To Store</Link>
            </Button>
          </CardFooter>
        </CardTitle>
      </Card>
    </div>
  )
}
