import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodedToken } from "@/utils/jwt-decode";

const AuthRoutes = ["/"];
const commonPrivateRoutes = [/^\/dashboard\/.+$/];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // If no access token is found and the route is public, allow access
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the access token is found and the route is common, allow access
  if (
    accessToken &&
    commonPrivateRoutes.some((route) => route.test(pathname))
  ) {
    return NextResponse.next();
  }

  let decodedData: any = null;

  // Decode the JWT token to get user data
  if (accessToken) {
    decodedData = decodedToken(accessToken);
  }

  const username = decodedData?.username;
  const email = decodedData?.email;

  // Check if the user role matches the role-based routes
  if (username || email) {
    if (username === "touhidcodes" || email === "touhidcodes@gmail.com") {
      return NextResponse.next();
    }
  }

  // If none of the conditions are met, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
