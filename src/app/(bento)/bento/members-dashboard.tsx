/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IYeP7dXFj2r
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Component() {
  return (
    <div className="grid h-screen min-h-screen grid-cols-1 gap-0 lg:grid-cols-12">
      <div className="hidden px-4 py-6 space-y-4 text-sm bg-gray-100 border-r md:block dark:bg-gray-800 lg:py-8 xl:space-y-6">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </div>
        <div className="grid gap-1.5">
          <Link
            className="flex items-center gap-3.5 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <UserIcon className="w-4 h-4" />
            Profile
          </Link>
          <Link
            className="flex items-center gap-3.5 font-medium text-gray-900 dark:text-gray-50"
            href="#"
          >
            <UsersIcon className="w-4 h-4" />
            Referrals
          </Link>
          <Link
            className="flex items-center gap-3.5 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Purchases
          </Link>
          <Link
            className="flex items-center gap-3.5 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <PackageIcon className="w-4 h-4" />
            Membership
          </Link>
          <Link
            className="flex items-center gap-3.5 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <HeartIcon className="w-4 h-4" />
            Recommendations
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-4 lg:space-y-0 lg:flex-row lg:grid lg:gap-4 lg:grid-cols-12">
        <header className="flex items-center h-14 gap-4 border-b px-4 md:gap-6 lg:gap-4 lg:col-start-2 lg:col-span-10 dark:border-gray-700">
          <Button className="rounded-lg md:hidden" size="icon">
            <ChevronRightIcon className="w-6 h-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">My Profile</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                id="menu-button"
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
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="flex flex-col min-h-screen p-4 space-y-4 md:p-10 lg:col-start-2 lg:col-span-10 xl:space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center space-y-0">
                <CardTitle className="text-lg font-semibold">
                  My Profile
                </CardTitle>
                <Button className="ml-auto" size="sm">
                  Edit Profile
                </Button>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm">
                <div className="flex items-center gap-4">
                  <Image
                    alt="Avatar"
                    className="rounded-full"
                    height="80"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width="80"
                  />
                  <div className="grid gap-1.5">
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      johndoe@example.com
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div className="font-semibold">Membership Tier</div>
                    <div>Gold</div>
                  </div>
                  <div>
                    <div className="font-semibold">Membership Status</div>
                    <div>Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Referrals</CardTitle>
                <CardDescription>
                  You have referred 10 friends to our platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">10</div>
                <Button size="sm">Invite more friends</Button>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Purchases</CardTitle>
              <CardDescription>
                Your purchase history and order details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Item</TableHead>
                    <TableHead className="w-1/3">Price</TableHead>
                    <TableHead className="w-1/3 text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Acme T-Shirt</TableCell>
                    <TableCell>$25.00</TableCell>
                    <TableCell className="text-right">2023-06-14</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pro Membership</TableCell>
                    <TableCell>$99.00</TableCell>
                    <TableCell className="text-right">2023-01-30</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Super Widget</TableCell>
                    <TableCell>$10.00</TableCell>
                    <TableCell className="text-right">2022-12-25</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>
                Products and services we think you&apos;ll love.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Card>
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <CardContent className="p-4">
                  <CardTitle className="text-sm font-semibold">
                    Gourmet Coffee Blend
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Exquisite coffee beans from around the world, expertly
                    blended for a rich and aromatic cup.
                  </CardDescription>
                  <div className="text-2xl font-bold">$19.99</div>
                  <Button size="sm">View Details</Button>
                </CardContent>
              </Card>
              <Card>
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <CardContent className="p-4">
                  <CardTitle className="text-sm font-semibold">
                    Wireless Earbuds
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Sleek and stylish wireless earbuds with crystal-clear sound.
                    Perfect for music on the go.
                  </CardDescription>
                  <div className="text-2xl font-bold">$49.99</div>
                  <Button size="sm">View Details</Button>
                </CardContent>
              </Card>
              <Card>
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <CardContent className="p-4">
                  <CardTitle className="text-sm font-semibold">
                    Yoga Mat & Accessories Kit
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Everything you need for the perfect yoga session. Includes a
                    premium non-slip mat, blocks, and a carrying bag.
                  </CardDescription>
                  <div className="text-2xl font-bold">$39.99</div>
                  <Button size="sm">View Details</Button>
                </CardContent>
              </Card>
              <Card>
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <CardContent className="p-4">
                  <CardTitle className="text-sm font-semibold">
                    Smart Home Security Camera
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Keep your home safe with this advanced security camera.
                    Features include motion detection, night vision, and remote
                    access via your smartphone.
                  </CardDescription>
                  <div className="text-2xl font-bold">$79.99</div>
                  <Button size="sm">View Details</Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
