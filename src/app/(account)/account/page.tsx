// import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
// import EmailForm from '@/components/ui/AccountForms/EmailForm';
// import NameForm from '@/components/ui/AccountForms/NameForm';
import { redirect } from "next/navigation"

import { AccountForm } from "../_forms/account-form"
import { createClient } from "../../(auth)/server-client-db"
import { AccountShell } from "../account-shell"

export default async function Account({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userDetails } = await supabase
    .from("users")
    .select("*")
    .single()

  //   const { data: subscription, error } = await supabase
  //     .from('subscriptions')
  //     .select('*, prices(*, products(*))')
  //     .in('status', ['trialing', 'active'])
  //     .maybeSingle();

  //   if (error) {
  //     console.log(error);
  //   }

  if (!user) {
    return redirect("/signin")
  }

  return (
    <AccountShell
      title="Account"
      subTitle="Update your account settings. Set your preferred language and timezone."
    >
      <AccountForm />
    </AccountShell>
  )
}
