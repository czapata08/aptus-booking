import { CrownIcon, LucideAperture } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormShellProps {
  formTSection?: React.ReactNode
  formBSection?: React.ReactNode
  formMainSection?: React.ReactNode
}

//_todo_ create a form shell that can be used to wrap forms and provide a consistent look and feel
export function FormShellColRow({
  formTSection,
  formBSection,
  formMainSection,
}: FormShellProps) {
  return (
    <Card className="max-w-[96%] shadow lg:max-[26rem]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* top section with 2 col grid */}
        {/* <div className="grid grid-cols-2 gap-6">{formTSection}</div> */}
        <div className="grid grid-cols-2 gap-6">
          {" "}
          <Button variant="outline">
            <LucideAperture className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline">
            <CrownIcon className="mr-2 h-4 w-4" />
            Bisc
          </Button>
        </div>

        {/* main section */}
        <div className="relative">
          {/* divider */}
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        {/* divider */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>

        <Button className="w-full">Create account</Button>
      </CardContent>
    </Card>
  )
}
