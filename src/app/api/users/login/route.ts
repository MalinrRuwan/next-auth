import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    //check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User doesn'exist" }, { status: 400 });
    }
    //compare the password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    //create token dat
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
