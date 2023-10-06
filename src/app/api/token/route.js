import { encodeFunc } from "@/helper/encode";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req, res) {
  try {
    const { email } = await req.json();
    const token = await encodeFunc(email);
    cookies().set("token", token.data, {
      httpOnly: true,
      path: "/",
    });
    return NextResponse.json({
      msg: "success",
      data: token,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      error: error,
    });
  }
}
