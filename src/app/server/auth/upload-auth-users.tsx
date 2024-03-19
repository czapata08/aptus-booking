/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server"

const { createClient } = require("@supabase/supabase-js")

// const SUPABASE_URL = 'http://127.0.0.1:54321';
// const SUPABASE_SERVICE_ROLE_KEY =
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const NEXT_PUBLIC_SUPABASE_URL = "https://ztyzupbkbbyqyhjkuauu.supabase.co"
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0eXp1cGJrYmJ5cXloamt1YXV1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzE4MDc0MywiZXhwIjoyMDE4NzU2NzQzfQ.-xhPmm98IV8zf0NERRcC5meQhmoBOhvX9pYVVJBOvMg"
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_SERVICE_ROLE_KEY

interface IdOrError {
  id?: string
  error?: string
}

async function insertSupabaseAccount(user: any): Promise<IdOrError> {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  console.log("user from createSupabaseAccount", user)

  try {
    // Create a new user account in the auth table
    const { data: createdUser, error: createUserError } =
      await supabase.auth.admin.createUser({
        email: user.email,
        email_confirm: true,
        app_metadata: user.app_metadata,
        user_metadata: user.user_metadata,
      })

    if (createUserError ?? !createdUser.user.id) {
      console.log(
        "❌ Error creating new account in auth table:",
        createUserError
      )
      throw new Error(`❌ Error creating new account in auth table}`)
    }

    console.log("🎉 New user inserted into auth table:", createdUser.user.id)
    return { id: createdUser.user.id }
  } catch (error) {
    console.error("❌ Unknown Error in createSupabaseAccount:", error)
    return { error: "unkown error in create supabase account" }
  }
}

//[Note!]: Using app_metadata to store user role - given that the user cannot modify app_metadata,
// this is a good place to store the user's role

//[Note!] create users admin -- Object below is set correctly
const adminUsers = [
  {
    email: "czapata1992@gmail.com",
    password: "Knight2020!",
    user_metadata: {
      full_name: "Parent Carlos",
      primary_contact: "",
    },
    app_metadata: {
      role: "parent",
    },
  },
  {
    email: "czapata@studentflow.io",
    password: "Knight2020!",
    user_metadata: {
      full_name: "Carlos Zapata",
      primary_contact: "",
    },
    app_metadata: {
      role: "admin",
    },
  },
  {
    email: "cazb1992@gmail.com",
    password: "Knight2020!",
    user_metadata: {
      full_name: "CAZ",
      primary_contact: "",
    },
    app_metadata: {
      role: "staff",
    },
  },

  {
    email: "zapata.carlos.a@outlook.com",
    password: "Knight2020!",
    user_metadata: {
      full_name: "Zapata Carlos A",
      primary_contact: "",
    },
    app_metadata: {
      role: "teacher",
    },
  },
]

for (const adminUser of adminUsers) {
  insertSupabaseAccount(adminUser).catch((e) => {
    console.log("Error occurred adding admin user:", e)
  })
}

//READ_ME
// Command to run this script: ts-node insert-admin-accounts.tsx
// Command to run in Bun Environment: bun run upload-auth-users.tsx
// The script should be run from the _server directory
// The script will create the admin accounts in the auth table

// module.exports = supabase;
