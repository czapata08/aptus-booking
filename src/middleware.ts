/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NextResponse, type NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })


  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser();
  const session = await supabase.auth.getSession()

  // Paths to allow without authentication
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
 

  //check for user supabase auth user session
  if (!session && protectedPaths.includes(pathname)) {
   NextResponse.redirect("/")
  }


return response
}

export const config = {
  matcher: [
    '/((?!api|elysia|_next/static|_next/image|favicon.ico).*)',
  ],
}

const protectedPaths = ["/dashboard", "/account"];
const publicPaths = ["/", "/events"];
// https://github.com/Chensokheng/next-supabase-boilerplate/blob/master/middleware.ts