import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

import {
  LoginForm,
  LoginOtpForm,
  ResetPswdForm,
} from "../_forms/auth-forms.tsx"

// import { Icons } from "./icons"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <LoginOtpForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs lowercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <LoginForm />

      <Dialog>
        <DialogTrigger asChild>
          <div className="relative flex justify-center text-xs lowercase">
            <span
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "bg-background px-2 text-muted-foreground text-xs font-base cursor-pointer"
              )}
            >
              forgot password?
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Password Reset</DialogTitle>
            <DialogDescription>
              We will send you an email with a password reset link.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <ResetPswdForm />
          </div>
        </DialogContent>
      </Dialog>

      <Separator />

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs lowercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}

      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Gmail
      </Button> */}
    </div>
  )
}
