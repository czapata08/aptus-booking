"use client"

//react
import { useCallback, useMemo, useState, type ChangeEvent } from "react"
// url
import { usePathname, useRouter, useSearchParams } from "next/navigation"
//notification
import { toast } from "sonner"

import { createUrl } from "@/lib/utils"
//server action
import { insertImage } from "@/app/server/images/img-uploader"

//ui
import { Input } from "../ui/input"
import LoadingDots from "./loading-dots"

export default function UploaderForm({
  rowId,
  bucketId,
}: {
  rowId: string
  bucketId: string
}) {
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [caption, setCaption] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // ------------------ url state management ------------------
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // file change handler - uses base 64 encoding
  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0]
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error("File size too big (max 50MB)")
        } else {
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            const base64String = e.target?.result
            setData((prev) => ({ ...prev, image: base64String as string }))
          }
          reader.readAsDataURL(file)
        }
      }
    },
    [setData]
  )
  // loading state
  const saveDisabled = useMemo(() => {
    return !data.image || saving
  }, [data.image, saving])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)

    console.log("file", file)
    const formData = new FormData()
    formData.append("file", file!)
    //we can pass this as child or get it from search params
    formData.append("rowId", rowId)
    formData.append("caption", caption!)
    formData.append("metadata", metadata!)
    //todo: change logic to get the id from pathname, for instance /event/.. or /account.. to their respenctive buckets
    formData.append("bucket_id", bucketId)

    //this is set server side
    // formData.append("image_title", `${rowId}-${caption}`)

    const promise = insertImage(formData)

    toast.promise(promise, {
      loading: "Loading...",
      success: (res) => {
        const currentSearchParams = new URLSearchParams(searchParams.toString())
        currentSearchParams.set("imgUpload", "success")
        const createNewUrl = createUrl(pathname, currentSearchParams)
        router.replace(createNewUrl, { scroll: false })
        setSaving(false)
        return `Success:\n${res}`
      },
      error: (error) => {
        if (error instanceof Error) {
          setSaving(false)
          return `Error:\n${error.message}`
        }
        return `Error:\nFailed to submit form`
      },
    })
  }

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      <div>
        <div className="space-y-1 mb-4">
          <h2 className="text-lg">Upload a file</h2>
          <p className="text-sm text-gray-500">
            Accepted formats: .png, .jpg, .gif, .mp4
          </p>
        </div>
        <label
          htmlFor="image-upload"
          className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)

              // this the drag and drop file input field
              const file = e.dataTransfer.files?.[0]
              if (file) {
                if (file.size / 1024 / 1024 > 50) {
                  toast.error("File size too big (max 50MB)")
                } else {
                  setFile(file)
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    setData((prev) => ({
                      ...prev,
                      image: e.target?.result as string,
                    }))
                  }
                  reader.readAsDataURL(file)
                }
              }
            }}
          />
          {/* form input body */}
          <div
            className={`${
              dragActive ? "border-2 border-black" : ""
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
              data.image
                ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                : "bg-white opacity-100 hover:bg-gray-50"
            }`}
          >
            <svg
              className={`${
                dragActive ? "scale-110" : "scale-100"
              } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p className="mt-2 text-center text-sm text-gray-500">
              Drag and drop or click to upload.
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Max file size: 50MB
            </p>
            <span className="sr-only">Photo upload</span>
          </div>
          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </label>
        {/* Input field - not the drag and drop */}
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onChangePicture}
          />
        </div>
        <div className="space-y-2 mt-2">
          <Input
            type="text"
            placeholder="Image Caption"
            name="caption"
            onChange={(e) => setCaption(e.target.value)}
            required
            min={4}
          />

          <Input
            type="text"
            placeholder="Image SEO Description"
            name="metadata"
            onChange={(e) => setMetadata(e.target.value)}
            required
            min={6}
          />
        </div>
      </div>

      <button
        disabled={saveDisabled}
        className={`${
          saveDisabled
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {saving ? (
          <LoadingDots className="mb-3 bg-white" />
        ) : (
          <p className="text-sm">Confirm upload</p>
        )}
      </button>
    </form>
  )
}
