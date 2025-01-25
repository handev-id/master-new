import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      username,
      amount,
      country,
      bankName,
      rekeningName,
      rekeningNumber,
    } = body.withdrawdata;

    if (
      !username ||
      !amount ||
      !country ||
      !bankName ||
      !rekeningName ||
      !rekeningNumber
    ) {
      return NextResponse.json({
        message:
          "Complete your profile data, and make sure you have sufficient balance",
        status: 400,
        success: false,
      });
    }

    const withdraw = await prisma.withdraw.create({
      data: {
        username,
        amount: parseInt(amount),
        bankName,
        rekeningName,
        rekeningNumber,
      },
    });

    return NextResponse.json({
      success: true,
      result: withdraw,
    });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message });
  }
}
