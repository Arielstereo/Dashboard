import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnection from "@/lib/dbConnection";
import User from "@/models/User";

export async function GET(request) {
  try {
    const jwtSecret = process.env.JWT_SECRET_KEY;
    const getCookie = cookies();
    const token = getCookie.get("USER_TOKEN");

    if (!token) {
      return NextResponse.json({ msg: "token not found" });
    }

    const { value } = token;

    const {payload} = jwt.verify(value, jwtSecret);

    if (!payload) {
      return NextResponse.json({ msg: "profile not found" });
    }

    return NextResponse.json({
      profile: payload,
    });
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function PUT(request) {
  await dbConnection()
  const jwtSecret = process.env.JWT_SECRET_KEY;
  const getCookie = cookies();
  const token = getCookie.get("USER_TOKEN");

  if (!token) {
    return NextResponse.json({ msg: "token not found" });
  }

  const { value } = token;

  const {payload} = jwt.verify(value, jwtSecret);
  const {email} = payload;

  const body = await request.json();
  const {newEmail, newUsername} = body


  const userFound = await User.findOneAndUpdate({email} ,{email: newEmail, username: newUsername}, { new: true })

  cookies().delete('USER_TOKEN')
  
  return  NextResponse.json(userFound)

}
