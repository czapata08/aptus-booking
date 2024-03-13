//we can change this to index
"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"

import UploaderForm from "@/components/file-uploader/uploader-f"

export default function Uploader() {
  const [rowId, setRowId] = React.useState<string | null>(null)
  const [bucketId, setBucketId] = React.useState<string | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    console.log("pathname", pathname)
    const rowId = searchParams.get("rowId")
    const bucketId = searchParams.get("bucketId")

    if (rowId && bucketId) {
      console.log("rowId", rowId, "bucketId", bucketId)
      setRowId(rowId)
      setBucketId(bucketId)
    }
  }, [pathname, searchParams])

  return rowId && bucketId ? (
    <UploaderForm rowId={rowId} bucketId={bucketId} />
  ) : (
    <div>No rowId or Bucketid found Bro!</div>
  )
}
