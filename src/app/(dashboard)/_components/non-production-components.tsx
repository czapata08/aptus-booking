import { LucideMenu } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

function CardMenu() {
  return (
    <Menubar asChild>
      <MenubarMenu>
        <MenubarTrigger>
          <LucideMenu className="group-hover/edit:text-gray-700" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Update Slot <MenubarShortcut>⌘U</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Remove Slot</MenubarItem>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

function CardsTesting() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
      <Card className="shadow">
        <CardContent className="h-32 bg-gradient-to-t from-slate-400/80 to-slate-100">
          <div className="w-full text-center text-8xl pt-4">🗓️</div>
        </CardContent>
        <CardFooter className="border-t">
          <div className="mt-2 flex gap-2 justify-end w-full">
            <Badge
              className="bg-slate-800 text-neutral-300 rounded-sm"
              variant="outline"
            >
              VIP
            </Badge>
            <Badge
              className="bg-slate-800 text-neutral-300 rounded-sm"
              variant="outline"
            >
              Base
            </Badge>
          </div>
        </CardFooter>
      </Card>
      <Card className="shadow">
        <CardContent className="h-32 bg-gradient-to-t from-slate-400/80 to-slate-100">
          <div className="w-full text-center text-8xl pt-4">✨</div>
        </CardContent>
        <CardFooter className="border-t">
          <div className="mt-2 flex gap-2 justify-end w-full">
            <Badge
              className="bg-slate-800 text-neutral-300 rounded-sm"
              variant="outline"
            >
              VIP
            </Badge>
            <Badge
              className="bg-slate-800 text-neutral-300 rounded-sm"
              variant="outline"
            >
              Base
            </Badge>
          </div>
        </CardFooter>
      </Card>
      <Card className="shadow">
        <CardContent className="h-32 bg-gradient-to-t from-slate-400/80 to-slate-100">
          <div className="w-full text-center text-8xl pt-4">🎟️</div>
        </CardContent>
        <CardFooter className="border-t">
          <div className="mt-2 flex gap-2 justify-end w-full">
            <Badge
              className="bg-slate-800 text-neutral-300 rounded-sm"
              variant="outline"
            >
              VIP
            </Badge>
            <Badge
              className="bg-slate-800 text-neutral-300 rounded-sm"
              variant="outline"
            >
              Base
            </Badge>
          </div>
        </CardFooter>
      </Card>

      <Card className="shadow group/item hover:shadow-xl relative">
        <Button
          className="group/edit invisible hover:bg-slate-200 group-hover/item:visible absolute top-2 right-2"
          variant="ghost"
          size="icon"
        >
          {/* <LucideMenu className="group-hover/edit:text-gray-700" /> */}
          <CardMenu />
        </Button>
        <CardContent className="h-32  bg-gradient-to-t from-slate-400/80 to-slate-100">
          <div className="w-full text-center text-8xl pt-4">🥂</div>
        </CardContent>
        <CardFooter className="border-t ">
          <span className="text-medium font-semibold w-full items-center mt-2">
            <Badge
              variant="secondary"
              className="bg-slate-500 text-white rounded-sm"
            >
              5:00 PM
            </Badge>
          </span>
          <div className="mt-2 flex gap-2 justify-end w-full">
            <Badge
              className="bg-slate-800 text-neutral-300 rounded-sm"
              variant="outline"
            >
              VIP
            </Badge>
            <Badge
              className="bg-slate-800 text-neutral-300 rounded-sm"
              variant="outline"
            >
              Base
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
