import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Separator } from "@/components/ui/separator"

interface AnouncementProps {
  href: string
  title: string
  subTitle: string
  icon?: React.ReactNode
  linkEmoji?: string
}

export function Announcement(props: AnouncementProps) {
  return (
    <Link
      href={props.href}
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      {props.linkEmoji ? props.linkEmoji : "🎉"}
      <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="sm:hidden">{props.title}</span>
      <span className="hidden sm:inline">{props.subTitle}</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  )
}
