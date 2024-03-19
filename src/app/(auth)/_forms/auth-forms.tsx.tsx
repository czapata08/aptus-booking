import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  login,
  resetPswd,
  resetPswdRequest,
  // signup,
} from "../../auth/server/auth/actions"

// import { Icons } from "./icons"

export function LoginOtpForm() {
  return (
    <form action="/auth/otp" method="post">
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            name="email"
            type="email"
            required
            className="rounded-md border"
          />
        </div>
        <Button type="submit" className="w-auto rounded-md border">
          Log in with email
        </Button>
      </div>
    </form>
  )
}

export function ResetPswdForm() {
  return (
    <form method="post">
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            name="email"
            type="email"
            required
            className="rounded-md border"
          />
        </div>
        <Button formAction={resetPswdRequest} type="submit">
          Submit password request
        </Button>
      </div>
    </form>
  )
}

export function LoginForm() {
  return (
    <form>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            name="email"
            type="email"
            required
            className="rounded-md border"
          />
        </div>
        <Label className="sr-only" htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="rounded-md border"
        />

        <Button formAction={login} type="submit">
          Log in
        </Button>
        {/* <button formAction={signup} className="mx-2 w-auto rounded-md border">
        Sign up
      </button> */}
      </div>
    </form>
  )
}

export function ConfirmResetPasswordForm() {
  return (
    <form method="post">
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="rounded-md border"
          />

          <Label htmlFor="confirm">Confirm Password</Label>
          <Input
            id="confirm"
            name="confirm"
            type="confirm"
            required
            className="rounded-md border"
          />
        </div>
        <Button formAction={resetPswd} type="submit">
          Submit New Password
        </Button>
      </div>
    </form>
  )
}
