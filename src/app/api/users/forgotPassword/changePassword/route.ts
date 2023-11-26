import User from "@/models/userModel";
import { connect } from "@/db/db";
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    //hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password Changed", success: true },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
