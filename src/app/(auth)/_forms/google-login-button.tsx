"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { googleLogin } from "@/app/auth/server/auth/google"

import { Icons } from "../../../components/auth/icons"

export function GoogleLoginButton() {
  const [isLoading] = useState<boolean>(false)

  async function handleSignInWithGoogle() {
    const promise = googleLogin()

    toast.promise(promise, {
      loading: "Loading...",
      success: "Redirecting...",
      error: (error) => {
        if (error && error instanceof Error) return error.message.toString()
        else return "An error ocurred with your login. Please try again."
      },
    })
  }

  return (
    <Button
      variant="outline"
      type="submit"
      disabled={isLoading}
      onClick={handleSignInWithGoogle}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Google
    </Button>
  )
}
