import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/sign-up(.*)",
  "/api/leads(.*)",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
]);

const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // Check if custom admin_session cookie is present
    const hasAdminSession = req.cookies.has("admin_session");
    if (!hasAdminSession) {
      await auth.protect();
    }
  }
});

export default function middleware(req: NextRequest, event: any) {
  // If custom admin_session cookie is present, allow access to admin routes
  if (req.cookies.has("admin_session") && !isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (!hasClerkKey) {
    return NextResponse.next();
  }
  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|png|jpg|jpeg|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
