"use client"

import * as React from "react"
import Link from "next/link"
import { type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavProps {
  isCollapsed: boolean
  className?: string
  links: {
    title: string
    label?: string
    icon?: LucideIcon
    variant: "default" | "ghost" | "outline"
    componentObj?: React.ReactNode
    href?: string
  }[]
}

//is collapsed is passed as a prop from parent component
export function Nav({ links, isCollapsed, className }: NavProps) {
  // console.log('nav isCollapse value', isCollapsed);
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "text-md group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2",
        className
      )}
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const key = link?.href + link?.title ?? index

          return isCollapsed ? (
            <React.Fragment key={key}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  {link.componentObj ? (
                    link.componentObj
                  ) : (
                    <Link
                      href={link.href ?? "#"}
                      className={cn(
                        buttonVariants({ variant: link.variant, size: "icon" }),
                        "h-9 w-9",
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      {link.icon && <link.icon className="h-5 w-5" />}
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            </React.Fragment>
          ) : (
            <React.Fragment key={key}>
              {link.componentObj ? (
                <span>{link.componentObj}</span>
              ) : (
                <Link
                  key={index}
                  href={link.href ?? "#"}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "sm" }),
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start"
                  )}
                >
                  {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                  {link.title}
                  {link.label && (
                    <span
                      className={cn(
                        "ml-auto",
                        link.variant === "default" &&
                          "text-background dark:text-white"
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </Link>
              )}
            </React.Fragment>
          )
        })}
      </nav>
    </div>
  )
}
