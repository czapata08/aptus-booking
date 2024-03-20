/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server"

const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? " "

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? " "

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
