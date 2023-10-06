import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const body = await req.json();
    const insert = await prisma.user.create({
      data: body,
    });
    return NextResponse.json({
      msg: "success",
      data: insert,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      error: error,
    });
  }
}
