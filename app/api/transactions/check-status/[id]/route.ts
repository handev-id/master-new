import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const id = request.url.split("/").pop();

    const deposit = await prisma.deposit.findUnique({
      where: {
        id: id,
      },
    });

    const withdraw = await prisma.withdraw.findUnique({
      where: {
        id: id,
      },
    });

    if (deposit) {
      return NextResponse.json({ success: true, result: deposit });
    }

    if (withdraw) {
      return NextResponse.json({ success: true, result: withdraw });
    }

    return NextResponse.json({
      success: false,
      message: "Transaction not found",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
