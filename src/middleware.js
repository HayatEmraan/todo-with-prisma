import { NextResponse } from "next/server";
import { decodeFunc } from "./helper/decode";

export async function middleware(req, res) {
  if (req.nextUrl.pathname.startsWith("/")) {
    const cookies = req.cookies.get("token")?.value;
    const decode = await decodeFunc(cookies);
    if (decode.msg === "failed") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/"],
};
