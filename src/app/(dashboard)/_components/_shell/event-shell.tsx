import { ImagePlusIcon, PenIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Grid from "@/components/grid"

import { PresetActions } from "./preset-action"
import { PresetSave } from "./preset-draft"
//components
import { presets, PresetSelector } from "./preset-selector"
import { PresetShare } from "./preset-share"

export function EventShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <TopSection /> */}

      <div className="p-4 flex flex-col w-full rounded-xl border border-cyan-500 shadow">
        {/* <AddImagesShell /> */}
        {/* <LabelsBar /> */}
        {/* <FormBody /> */}
        {children}
      </div>
    </>
  )
}

function AddImagesShell() {
  return (
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
                <Button variant="secondary">Add Image</Button>
              </div>
            </Grid.Item>
          )
        })}
    </Grid>
  )
}

function TopSection() {
  return (
    <div className="container flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      <h2 className="text-lg font-semibold">Form</h2>
      <div className="ml-auto flex w-full space-x-2 sm:justify-end">
        <PresetSelector presets={presets} />
        <PresetSave />
        <div className="space-x-2 md:flex">
          {/* <CodeViewer /> */}
          <PresetShare />
        </div>
        <PresetActions />
      </div>
    </div>
  )
}

function LabelsBar() {
  return (
    <div className="flex flex-row justify-between items-center mt-2">
      <Input type="text" placeholder="Search Labels" className="w-40" />

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
  )
}

function FormBody() {
  return (
    <div className="flex-grow">
      <div className="flex flex-col space-y-4 mt-2 flex-grow md:px-20">
        <div className="grid grid-cols-3 gap-4 justify-between">
          <div>
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              type="date"
              id="start_date"
              name="start_date"
              className="w-[180px]"
            />
          </div>
          <div>
            <Label htmlFor="end_date">End Date</Label>
            <Input
              type="date"
              id="end_date"
              name="end_date"
              className="w-[180px]"
            />
          </div>
          <div className="flex justify-evenly items-center">
            <Label htmlFor="end_date">Recurring event</Label>
            <Input type="checkbox" id="end_date" name="end_date" />
          </div>
        </div>
        <div className="grid gap-2 space-y-2">
          <Label htmlFor="eventTitle" className="sr-only">
            Event Title
          </Label>
          <Input
            type="text"
            id="event_title"
            name="event_title"
            placeholder="Event Title"
          />
        </div>
        <Textarea
          placeholder="Write a tagline for an ice cream shop"
          className="min-h-[80px] flex-1 p-4 md:min-h-[120px] lg:min-h-[180px]"
        />
        <div className="flex items-center space-x-2">
          <Button>Save</Button>
          <Button variant="secondary">
            <span className="sr-only">Show history</span>
            <PenIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
