"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import { getURL } from "@/lib/utils"

import { verifyAccountSchema } from "./schema-accounts-auth"

export async function login(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const domainUrl = getURL()
  const reqUrl = new URL("/login", domainUrl)

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    reqUrl.searchParams.set("login_error", error.message)
    redirect(reqUrl.href)
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signup(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const domainUrl = getURL()

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    const reqUrl = new URL("/login", domainUrl)
    reqUrl.searchParams.set("login_error", error.message)
    redirect(reqUrl.href)
  }

  const successUrl = new URL("/status", domainUrl)
  successUrl.searchParams.set("success", "Account created successfully")
  successUrl.searchParams.set("type", "signup")

  revalidatePath("/", "layout")
  redirect(successUrl.href)
}

export async function signOutUser() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  await supabase.auth.signOut()

  revalidatePath("/", "layout")
  redirect("/")
}

export async function resetPswdRequest(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const data = {
    email: formData.get("email") as string,
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: "/reset-pswd",
  })

  const domainUrl = getURL()
  const reqUrl = new URL("/login", domainUrl)

  if (error) {
    reqUrl.searchParams.set("error", error.message)
    redirect(reqUrl.href)
  }

  reqUrl.searchParams.set("success", "Password reset email sent.")
  revalidatePath("/", "layout")
  redirect("/status")
}

export async function resetPswd(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const pswd = formData.get("password") as string
  const confirmedPswd = formData.get("confirm") as string

  if (pswd !== confirmedPswd) {
    //set search params with error
    redirect("/reset-pswd")
  }

  const { data, error } = await supabase.auth.updateUser({
    password: pswd,
  })

  const domainUrl = getURL()

  if (error) {
    const reqUrl = new URL("/reset-pswd", domainUrl)
    reqUrl.searchParams.set("error", error.message)
    redirect(reqUrl.href)
  }

  if (data) {
    //set search params with sucess --> /then logout() --> /then redirect to login
    const successUrl = new URL("/status", domainUrl)
    successUrl.searchParams.set("success", "Password reset successfully")
    successUrl.searchParams.set("type", "pswd_reset")
    revalidatePath("/", "layout")
    redirect(successUrl.href)
  }

  revalidatePath("/", "layout")
}

export async function onboardingVerification(formData: FormData) {
  if (!formData) return new Error("No form data")
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const domainUrl = getURL()
  const reqUrl = new URL("/onboarding", domainUrl)
  // 1. validate the form data
  const verifiedData = verifyAccountSchema.safeParse({
    phone: formData.get("phone"),
    forename: formData.get("forename"),
    surname: formData.get("surname"),
    password: formData.get("password"),
  })

  if (!verifiedData.success) {
    console.log("verifiedData.error", verifiedData.error.flatten().fieldErrors)
    //set search params with error
    reqUrl.searchParams.set(
      "error",
      JSON.stringify(verifiedData.error.flatten().fieldErrors)
    )
    redirect(reqUrl.href)
  }

  //2. Update user profile information
  const { error } = await supabase.auth.updateUser({
    password: verifiedData.data.password,
    data: {
      phone: verifiedData.data.phone,
      forename: verifiedData.data.forename,
      surname: verifiedData.data.surname,
      onboardingVerification: true,
    },
  })

  //3. Handle error event
  if (error) {
    console.log("error", error)
    reqUrl.searchParams.set("error", error.message)
    redirect(reqUrl.href)
  }

  //4. On success, redirect to status page
  const successUrl = new URL("/status", domainUrl)
  successUrl.searchParams.set("success", "Account verified successfully")
  successUrl.searchParams.set("type", "onboarding")
  revalidatePath("/", "layout")

  redirect(reqUrl.href)
}
