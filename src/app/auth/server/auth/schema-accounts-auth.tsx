import { z } from "zod"

// ------------------- Validators -------------------
export const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[@$!%*?&]/, {
    message:
      "Password must contain at least one special character (@, $, !, %, *, ?, &)",
  })

export const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

export const phone = z.string().regex(phoneRegex, {
  message:
    "Invalid phone number format. Make sure to include the country code, for the US use +1.",
})

const biscLpRegex = /^[^@]+@bischicagolp\.org$/

export const bisLpEmail = z
  .string()
  .regex(biscLpRegex, "Email must be from @bischicagolp.org domain")

export const email = z.string({ required_error: "Email is required." }).email()

export const forename = z
  .string({
    required_error: "Forename is required",
  })
  .min(2)
  .max(50)

export const surname = z
  .string({
    required_error: "Surname is required",
  })
  .min(2)
  .max(50)

// ------------------- Schemas -------------------
export const resetPasswordSchema = z.object({
  password: password,
  confirmPassword: password,
})

export const loginFormSchema = z.object({
  email: email,
  // .regex(/^[^@]+@bischicagolp\.org$/, 'Email must be from @bischicagolp.org domain'),
  password: password,
})

export const verifyAccountSchema = z.object({
  phone: phone,
  forename: forename,
  surname: surname,
  password: password,
})
