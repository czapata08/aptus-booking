"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function OtpConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(4)

  //Use useEffect to start the timer with ui countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    const type = searchParams.get("success_type")

    // Redirect to the "/" route when countdown reaches 0
    if (countdown === 0) {
      switch (type) {
        case "otp_login":
          router.push("/otp-verify")
          break
        case "signup":
          router.push("/signup")
          break
        case "onboarding":
          router.push("/dashboard")
          break
        default:
          router.push("/")
      }

      router.push("/")
    }

    // Clear the timer if the component is unmounted
    return () => clearInterval(timer)
  }, [countdown, router, searchParams])

  return (
    <div className="mt-10 text-center">
      <h1 className="mb-4 text-3xl font-bold text-blue-500">
        Check Your Email
      </h1>
      <p>We&rsquo;ve sent you an email with a confirmation link.</p>
      <p>You will be redirected to the homepage in {countdown} seconds.</p>
    </div>
  )
}
