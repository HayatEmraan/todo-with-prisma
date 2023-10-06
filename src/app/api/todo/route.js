import { decodeFunc } from "@/helper/decode";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, res) {
  try {
    const cookies = req.cookies.get("token")?.value;
    const decode = await decodeFunc(cookies);
    const find = await prisma.todo.findMany({
      where: {
        userID: decode,
      },
    });
    return NextResponse.json({
      msg: "success",
      data: find,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      error: error,
    });
  }
}
export async function POST(req, res) {
  try {
    const body = await req.json();
    
    const cookies = req.cookies.get("token")?.value;
    const decode = await decodeFunc(cookies);
    const insert = await prisma.todo.create({
      data: {
        ...body,
        user: {
          connect: {
            id: decode,
          },
        },
      },
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
export async function PATCH(req, res) {
  try {
    const params = new URL(req.url).searchParams;
    const id = params.get("id");
    const { task } = await req.json();
    const updateOne = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        task: task,
      },
    });
    return NextResponse.json({
      msg: "success",
      data: updateOne,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      error: error,
    });
  }
}
export async function PUT(req, res) {
  try {
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      error: error,
    });
  }
}
export async function DELETE(req, res) {
  try {
    const params = new URL(req.url).searchParams;
    const id = params.get("id");
    const deleteOne = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      msg: "success",
      data: deleteOne,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      error: error,
    });
  }
}
