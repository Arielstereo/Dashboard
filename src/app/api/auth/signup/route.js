import dbConnection from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnection();

  const body = await request.json();
  const { username, email, password, confirmPassword } = body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { msg: "failed registration!" },
        { status: 400 }
      );
    }
    const emailVerified = await User.findOne({ email });

    if (emailVerified) {
      return NextResponse.json({ msg: "email is already!" }, { status: 400 });
    }

    if (password != confirmPassword) {
      return NextResponse.json({ msg: "password not match!" }, { status: 400 });
    }

    const newUser = new User({ username, email, password: hashPassword });

    await newUser.save();
  

    // newUser._doc me trae el usuario guardado recien, destructuro para no enviar al front la password q la renombro a su vez xq ya esta nombrada esa variable, despues traigo todo el resto (username y email) y ahora si lo envio en la respuesta.
    const { password: userPass, ...user } = newUser._doc;

    return NextResponse.json({ msg: "successful registration!", user });
  } catch (error) {
    throw new Error("server error", error);
  }
}
