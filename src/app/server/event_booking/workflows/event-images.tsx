"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/event_server"

import { eventImgSchema } from "@/app/server/event_booking/schemas"
import type { CreateEventImgProps } from "@/app/server/event_booking/schemas"

//server function
// import { insertImage } from "../../public/mutations/img-uploader"

const createServerClient = () => {
  const cookieStore = cookies()
  return createClient(cookieStore)
}
//goal: insert into event image table

export async function insertEventImage(data: CreateEventImgProps) {
  const supabase = createServerClient()

  const validated = eventImgSchema.safeParse(data)

  if (!validated.success) {
    console.log("error", validated.error.flatten().fieldErrors)
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
  }

  const { error, data: imgData } = await supabase
    .from("event_images")
    .insert([
      {
        event_id: data.event_id,
        image_url: data.image_url,
        caption: data.caption,
        metadata: data.metadata,
      },
    ])
    .select("*")

  console.log("imgData", imgData)
  console.log("error from insertEvent image", error)
  if (error) {
    throw new Error(error.message)
  }

  if (imgData?.[0]?.image_id) {
    return { id: imgData[0].image_id }
  }

  revalidatePath("/dashboard", "layout")
}

// This function would not be used - just for reference
// export async function insertImageToEvent(
//   data: CreateEventImgProps,
//   formData: FormData
// ) {
//   formData.append("bucket_id", "event_images")
//   formData.append("image_title", data.event_id)

//   try {
//     console.log(
//       "FormData in insertImageToEvent - after appending name and bucket_id: ",
//       formData
//     )
//     const image = await insertImage(formData)

//     if (image) {
//       const imgData = {
//         ...data,
//         image_url: image,
//       }

//       const validated = eventImgSchema.safeParse(imgData)

//       if (!validated.success) {
//         console.log("error", validated.error.flatten().fieldErrors)
//         throw new Error(JSON.stringify(validated.error.flatten().fieldErrors))
//       }

//       const imgId = await insertEventImage(imgData)

//       return imgId?.id
//     }
//   } catch (error) {
//     console.log("Error on insertImageToEvent", error)
//     throw new Error("Error on insertImageToEvent")
//   }
// }
