"use server"

import { cache } from "react"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

const createServerClient = cache(() => {
  const cookieStore = cookies()
  return createClient(cookieStore)
})

//General query to retrieve a bucket by id
export async function selectBucketById(id: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.storage.getBucket(id)

  if (error) {
    console.log("error", error)
  }
  return data
}

export async function downloadImage(bucketId: string, imageId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.storage
    .from(bucketId)
    .download(imageId)

  if (error) {
    console.log("error", error)
  }
  return data
}
