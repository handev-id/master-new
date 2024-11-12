import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, amount, image } = body;
    if (!username || !amount || !image) {
      return NextResponse.json({
        message: "Data is required",
        status: 400,
        success: false,
      });
    }

    const deposit = await prisma.deposit.create({
      data: {
        username,
        amount,
        image,
      },
    });

    return NextResponse.json({
      success: true,
      result: deposit,
    });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message });
  }
}
