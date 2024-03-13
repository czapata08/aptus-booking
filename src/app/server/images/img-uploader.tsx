"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

import { formatStringNoSpaces } from "@/lib/utils"

import { insertEventImage } from "../event_booking/workflows/event-images"

const createServerClient = () => {
  const cookieStore = cookies()
  return createClient(cookieStore)
}

//using formData here to take advtange of the formData api for file uploads
export async function insertImage(formData: FormData) {
  // console.log("formData", formData)
  const supabase = createServerClient()

  const file = formData.get("file") as File
  console.log("file", file)

  //get the file type bro
  const fileType = file.type.split("/")[1]
  console.log("fileType", fileType)
  const bucket_id = formData.get("bucket_id") as string

  // this is more for buckets that have a specific id, like event_images
  const caption = formData.get("caption") as string
  const image_metadata = formData.get("metadata") as string
  const rowId = formData.get("rowId") as string

  const image_title = `${rowId}-${formatStringNoSpaces(caption)}.${fileType}`

  // console.log(
  //   "bucket_id",
  //   bucket_id,
  //   "image_title",
  //   image_title,
  //   "caption",ssssssssss
  //   caption,
  //   "image_metadata",
  //   image_metadata,
  //   "rowId",
  //   rowId
  // )

  const { data, error } = await supabase.storage
    .from(bucket_id)
    .upload(image_title ?? file.name ?? "", file)

  if (error) {
    throw new Error(error.message)
  }

  console.log("Data from insert image, data: ", data)

  const imageUrl = await mapBucketToImageTable(
    bucket_id,
    rowId,
    caption,
    image_metadata,
    data.path
  )

  console.log("imageUrl", imageUrl)

  revalidatePath("/", "layout")
  return data.path
}

async function mapBucketToImageTable(
  bucket_id: string,
  rowId: string,
  caption: string,
  metadata: string,
  image_url: string
) {
  switch (bucket_id) {
    case "event_images":
      const imgData = {
        event_id: rowId,
        caption,
        metadata,
        image_url,
      }
      const image = await insertEventImage(imgData)
      return image

    default:
      throw new Error("Bucket not found")
  }
}
