import { cookies } from "next/headers"
// import Image from "next/image"
import Link from "next/link"
// import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { type User } from "@supabase/supabase-js"
import {
  LogOut,
  LucideSettings,
  TicketIcon,
  UserSquareIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// header user ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { signOutUser } from "../../auth/server/auth/actions"

export async function Header() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.getUser()

  return (
    <header className="border-b px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 md:gap-1">
          {/* <TriangleIcon className="h-8 w-8 text-slate-800" /> */}
          <Link href="/">
            <span className="dark:text-foreground scroll-m-20 font-sans text-3xl font-bold tracking-tighter text-cyan-950 first:mt-0">
              aptus
            </span>
          </Link>
        </div>
        <div className="flex space-x-1 md:space-x-2 items-center">
          {data?.user ? (
            <>
              {data?.user?.app_metadata.is_elite ? (
                <Link href="/elite">
                  <Button className="text-sm" variant="outline">
                    Elite Only Events
                  </Button>
                </Link>
              ) : (
                <Link href="https://www.esmechicago.com/elite-enroll">
                  <Button
                    className="text-sm rounded-full shadow-sm hover:animate-wiggle"
                    variant="outline"
                    size="sm"
                  >
                    ✨ Elite Access
                  </Button>
                </Link>
              )}
              <ProfileSection user={data.user} />
            </>
          ) : (
            <>
              <Button className="text-sm" variant="outline">
                Sign up
              </Button>
              <Button className="text-sm" variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export function ToolkitBar() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Select>
          <SelectTrigger id="reservation-type">
            <SelectValue placeholder="Reservation type" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="dine-in">Dine in</SelectItem>
            <SelectItem value="pickup">Pickup</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Location" type="text" />
        <Input placeholder="Date" type="date" />
        {/* <Select>
          <SelectTrigger id="time">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="now">Now</SelectItem>
            <SelectItem value="later">Later</SelectItem>
          </SelectContent>
        </Select> */}
        <Select>
          <SelectTrigger id="party-size">
            <SelectValue placeholder="Party size" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="1">1 guest</SelectItem>
            <SelectItem value="2">2 guests</SelectItem>
            <SelectItem value="3">3 guests</SelectItem>
            <SelectItem value="4">4 guests</SelectItem>
            <SelectItem value="5">5 guests</SelectItem>
            <SelectItem value="6">6 guests</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="col-span-5">Search</Button>
    </div>
  )
}

export function ProfileSection({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button
          className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
          size="icon"
          variant="ghost"
        >
          <Image
            alt="Avatar"
            className="rounded-full"
            height="32"
            src="/placeholder.svg"
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button> */}
        <Avatar className="cursor-pointer border border-foreground">
          <AvatarImage
            src={(user.user_metadata?.avatar_url as string) ?? ""}
            alt="@czapata"
          />
          <AvatarFallback>
            {user?.email?.toString()?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {user?.user_metadata.full_name && (
              <p className="text-sm font-medium leading-none">
                {user.user_metadata.full_name}
              </p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">
            <UserSquareIcon className="mr-2 h-4 w-4" />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders">
            <TicketIcon className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/settings">
            <LucideSettings className="mr-2 h-4 w-4" />

            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="h-8">
          <form>
            <Button
              className="h-full w-full"
              variant="ghost"
              formAction={signOutUser}
            >
              <LogOut className="h-3.4 mr-2 w-3.5" />
              Log out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
