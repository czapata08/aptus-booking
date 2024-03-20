// [Revised]: re-usable shell or forms
import { cn } from "@/lib/utils"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function AuthFormsShell({ className, children }: UserAuthFormProps) {
  return <div className={cn("grid gap-6", className)}>{children}</div>
}

export function ContinueWithSeparator() {
  return (
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
  )
}
