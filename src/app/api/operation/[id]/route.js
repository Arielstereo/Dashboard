import dbConnection from "@/lib/dbConnection";
import Balance from "@/models/Balance";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  await dbConnection();

  try {
    const { id } = params;
    const body = await request.json();
    const { description, amount, type } = body;
    const date = Date.now();

    const operation = new Balance({
      description,
      amount,
      type,
      date,
      user: id,
    });
    await operation.save();
    const user = await User.findById(id);
    user.balance = [...user.balance, operation._id];

    const addOperation = await user.save();

    return NextResponse.json({
      msg: "balance saved",
      addOperation,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request, { params }) {
  await dbConnection();

  try {
    const { id } = params;
    console.log(id);
    if (id) {
      const getOperationsUser = await User.findById({ _id: id }).populate(
        "balance"
      );
      return NextResponse.json(getOperationsUser);
    }
    if (id === undefined) {
      return NextResponse.json({ msg: "id not found" });
    }
  } catch (error) {
    return NextResponse.json({ msg: error });
  }
}
