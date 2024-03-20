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

import { ResetPswdForm } from "../_forms/auth-forms"

export function ResetPasswordDialog() {
  return (
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
  )
}
