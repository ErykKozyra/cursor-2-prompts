import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Only create the Supabase client if the environment variables are available
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = createMiddlewareClient({ req, res });

    // Refresh session if expired
    await supabase.auth.getSession();
  }

  return res;
}

// This ensures the middleware runs for all routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
