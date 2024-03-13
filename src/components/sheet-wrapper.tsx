import { type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Menubar } from "@/components/ui/menubar"
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MenubarDemo() {
  return (
    <Menubar>
      <Button variant="ghost">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="ghost">Button</Button>
    </Menubar>
  )
}

interface SheetWithFormProps {
  children: React.ReactNode
  title?: string
  description?: string
  icon?: LucideIcon
  buttonText: string
  buttonStyle?: "default" | "outline" | "ghost" | "secondary" | "link"
}

export function SheetDemo(props: SheetWithFormProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={props.buttonStyle}>
          {props.icon && <props.icon className="mr-2 h-4 w-4" />}
          {props.buttonText ?? props.title}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>{props.title}</SheetTitle>
          <SheetDescription>{props.description}</SheetDescription>
        </SheetHeader>

        {props.children}

        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
