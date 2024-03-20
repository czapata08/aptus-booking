// [revised]: shell is responsive alongise acc root layout config
import { Separator } from "@/components/ui/separator"

interface AccountShellProps {
  children: React.ReactNode
  title: string
  subTitle?: string
}

export function AccountShell(props: AccountShellProps) {
  return (
    <section className="space-y-6 w-full max-w-4xl">
      <div>
        <h3 className="text-xl font-semibold">{props.title}</h3>
        {props.subTitle && (
          <p className="text-sm text-muted-foreground">{props.subTitle}</p>
        )}
      </div>
      <Separator />
      {/* to center use mx-auto */}
      <div className="lg:w-3/4">{props.children}</div>
    </section>
  )
}
