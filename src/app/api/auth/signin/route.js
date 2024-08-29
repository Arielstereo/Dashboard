import dbConnection from "@/lib/dbConnection";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  await dbConnection();
  const jwtSecret = process.env.JWT_SECRET_KEY;
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { msg: "email and password are required" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ msg: "User not found!" }, { status: 400 });
  }

  const { password: userPass, ...userLogged } = user._doc;

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    return NextResponse.json({ msg: "Password incorrect!" }, { status: 400 });
  }

  const token = jwt.sign(
    {
      payload: {
        username: userLogged.username,
        email: userLogged.email,
        id: userLogged._id,
      },
    },
    jwtSecret,
    {
      expiresIn: "1h",
    }
  );

  cookies().set("USER_TOKEN", token);
  // const cookie = cookies().get('USER_TOKEN')
  // console.log(cookie);

  return NextResponse.json({
    msg: "User authenticated",
    data: userLogged,
    token: token,
  });
}
