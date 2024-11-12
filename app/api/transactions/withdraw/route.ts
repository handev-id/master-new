import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, amount, country, bankName, accNumber, accName } =
      body.withdrawdata;

    if (
      !username ||
      !amount ||
      !country ||
      !bankName ||
      !accNumber ||
      !accName
    ) {
      return NextResponse.json({
        message: "Data is required",
        status: 400,
        success: false,
      });
    }

    const withdraw = await prisma.withdraw.create({
      data: {
        username,
        amount: parseInt(amount),
        country,
        bankName,
        rekeningName: accName,
        rekeningNumber: accNumber,
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
