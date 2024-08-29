import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function DELETE(request) {
  cookies().delete('USER_TOKEN')
  return NextResponse.json({msg: 'Logout..'})
}