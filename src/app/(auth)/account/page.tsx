// import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
// import EmailForm from '@/components/ui/AccountForms/EmailForm';
// import NameForm from '@/components/ui/AccountForms/NameForm';
import { redirect } from "next/navigation"

import { Card } from "@/components/ui/card"

import { createClient } from "./server-client"

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
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="bg-background text-center">
        <Card>{JSON.stringify(userDetails)}</Card>
        <Card>{JSON.stringify(user)}</Card>
      </div>
    </section>
  )
}
