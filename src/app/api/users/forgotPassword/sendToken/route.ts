import User from "@/models/userModel";
import { connect } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    //check if there is an user in that email

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 500 });
    }
    const response = await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({message : "Token sent", success : true})

  } catch (error: any) {
    throw new Error(error.message);
  }
}
