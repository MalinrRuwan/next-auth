import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/db";

import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userID = getDataFromToken(request);
    const user = await User.findOne({ _id: userID }).select("-password");
    return NextResponse.json({message : "User found", data : user})
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 404 });
  }
}
