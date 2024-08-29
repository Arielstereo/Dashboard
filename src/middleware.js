import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function middleware(request) {
  try {
    const getCookie = cookies();
    const token = getCookie.get("USER_TOKEN");

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    else {
      return NextResponse.next();
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
