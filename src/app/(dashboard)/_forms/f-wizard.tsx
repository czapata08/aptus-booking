"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, MinusIcon, PlusIcon } from "lucide-react"
//notifications
import { toast } from "sonner"

//ui
import { createUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// export function Wizard({
//   totalSteps,
//   children,
// }: {
//   totalSteps: number
//   children: React.ReactNode
// }) {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = new URLSearchParams(useSearchParams().toString())

//   React.useEffect(() => {
//     searchParams.set("wStep", "1")
//     searchParams.set("totalSteps", totalSteps.toString())
//     const updatedUrl = createUrl(pathname, searchParams)
//     router.replace(updatedUrl, { scroll: false })
//   }, [totalSteps, pathname, router, searchParams])

//   return <>{children}</>
// }

export function HandleStep({ useCase }: { useCase: "next" | "prev" }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  //form wizard starts at 1
  // in order to use form wizard, the url must contain a query param wStep
  //   if (!searchParams.get("wStep") || searchParams.get("wStep") === "0") {
  //     return toast.error("No form wizard found, there has been an error")
  //   }

  //   if (!totalSteps) {
  //     return toast.error("wizard total steps has not been set")
  //   }

  React.useEffect(() => {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    if (
      !currentSearchParams.get("wStep") &&
      !currentSearchParams.get("totalSteps")
    ) {
      currentSearchParams.set("wStep", "1")
      currentSearchParams.set("totalSteps", "4")
      const updatedUrl = createUrl(pathname, currentSearchParams)
      router.replace(updatedUrl, { scroll: false })
    }
  }, [pathname, router, searchParams])

  function handleNextStep() {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    const currentStep = Number(currentSearchParams.get(""))
    const totalSteps = Number(searchParams.get("totalSteps"))
    const nextStep = currentStep + 1

    if (nextStep > totalSteps) {
      return toast.error("You have reached the last step")
    }

    currentSearchParams.set("wStep", nextStep.toString())

    const updatedUrl = createUrl(pathname, currentSearchParams)

    router.replace(updatedUrl, { scroll: false })
  }

  function handlePrevStep() {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    const currentStep = Number(currentSearchParams.get("wStep"))
    const prevStep = currentStep - 1

    if (prevStep < 1) {
      return toast.error("You have reached the first step")
    }

    currentSearchParams.set("wStep", prevStep.toString())
    const updatedUrl = createUrl(pathname, currentSearchParams)

    router.replace(updatedUrl, { scroll: false })
  }

  return (
    <div className="flex justify-between">
      <Button
        onClick={useCase === "next" ? handleNextStep : handlePrevStep}
        variant="outline"
        size="icon"
      >
        {useCase === "next" ? (
          <ChevronRight className="mr-2 h-4 w-4" />
        ) : (
          <ChevronLeft className="mr-2 h-4 w-4" />
        )}
        {useCase === "next" ? "Next" : "Previous"}
      </Button>
    </div>
  )
}

export function HandlePartySize({ useCase }: { useCase: "plus" | "minus" }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  //form wizard starts at 1
  // in order to use form wizard, the url must contain a query param wStep
  //   if (!searchParams.get("wStep") || searchParams.get("wStep") === "0") {
  //     return toast.error("No form wizard found, there has been an error")
  //   }

  //   if (!totalSteps) {
  //     return toast.error("wizard total steps has not been set")
  //   }

  // React.useEffect(() => {
  //   const currentSearchParams = new URLSearchParams(searchParams.toString())
  //   if (
  //     !currentSearchParams.get("wStep") &&
  //     !currentSearchParams.get("totalSteps")
  //   ) {
  //     currentSearchParams.set("wStep", "1")
  //     currentSearchParams.set("totalSteps", "4")
  //     const updatedUrl = createUrl(pathname, currentSearchParams)
  //     router.replace(updatedUrl, { scroll: false })
  //   }
  // }, [pathname, router, searchParams])

  React.useEffect(() => {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    // console.log(
    //   "current searchParams fromm party size component: ",
    //   currentSearchParams
    // )
    if (!currentSearchParams.get("partySize")) {
      currentSearchParams.set("partySize", "1")
      currentSearchParams.set("maxParty", "4")
      currentSearchParams.set("minParty", "1")
      //this comes live from the database
      currentSearchParams.set("liveTotal", "4")
      const updatedUrl = createUrl(pathname, currentSearchParams)
      router.replace(updatedUrl, { scroll: false })
    }
  }, [pathname, router, searchParams])

  function handleAdd() {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    const current = Number(currentSearchParams.get("partySize"))
    // this should come from the backend and represent the total count
    const maxSize = Number(searchParams.get("liveTotal"))

    const addParty = current + 1
    console.log("current party size from handle add: ", current)
    if (addParty > maxSize) {
      return toast.error("You have reached the last step")
    }

    currentSearchParams.set("partySize", addParty.toString())

    const updatedUrl = createUrl(pathname, currentSearchParams)

    router.replace(updatedUrl, { scroll: false })
  }

  function handleRemove() {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    const current = Number(currentSearchParams.get("partySize"))
    console.log("current party size from handle remove: ", current)
    const removeParty = current - 1

    if (removeParty < 1) {
      return null
    }

    currentSearchParams.set("partySize", removeParty.toString())
    const updatedUrl = createUrl(pathname, currentSearchParams)

    router.replace(updatedUrl, { scroll: false })
  }

  return (
    <div className="flex justify-between">
      <Button
        onClick={useCase === "plus" ? handleAdd : handleRemove}
        variant="outline"
        size="icon"
        aria-label={useCase === "plus" ? "add party size" : "remove party size"}
      >
        {useCase === "plus" ? (
          <PlusIcon className="h-4 w-4" />
        ) : (
          <MinusIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

//todo
// export function etSlot(props
// :{slotId: string, slot: string}) {
//   const pathname = usePathname()
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   React.useEffect(() => {
//     const currentSearchParams = new URLSearchParams(searchParams.toString())
//     if (!currentSearchParams.get("slot")) {
//       currentSearchParams.set("slot", props.slotId)
//       const updatedUrl = createUrl(pathname, currentSearchParams)
//       router.replace(updatedUrl, { scroll: false })
//     }
//   }, [pathname, router, searchParams])

//   return (

// )
