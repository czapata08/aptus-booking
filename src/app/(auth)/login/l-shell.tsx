"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { googleLogin } from "@/app/auth/server/auth/google"
import { siteConfig } from "@/app/config/site"

import { Icons } from "./icons"

interface LoginShellProps {
  children: React.ReactNode
}

export function LoginShell({ children }: LoginShellProps) {
  const [isLoading, setLoading] = useState<boolean>(false)

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
    <div className="container relative h-[100dvh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href={siteConfig.links.esme_elite_landing}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-4 top-4 md:right-8 md:top-8 rounded-full"
        )}
      >
        ✨ Elite Membership
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="h-10 w-8 mr-2" />
          <span className="dark:text-foreground scroll-m-20 font-sans text-3xl font-bold tracking-tighter first:mt-0">
            {siteConfig.name}
          </span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Event management for Esmé Chicago.&rdquo;
            </p>
            {/* <footer className="text-sm">Carlos Zapata</footer> */}
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center mt-40 md:mt-0">
            <h1 className="text-2xl font-semibold tracking-tight">
              Account Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to get a one time access code
            </p>
          </div>
          {children}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

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
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
