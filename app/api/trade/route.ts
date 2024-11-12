import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, rateStake, rateEnd, amount, time, category } =
      await req.json();

    if (!username || !rateStake || !rateEnd || !amount || !time || !category) {
      return NextResponse.json({
        success: false,
        message: "Data is required",
      });
    }

    await prisma.users.update({
      where: {
        username,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    await prisma.trade.create({
      data: {
        username,
        rateStake,
        rateEnd,
        amount,
        time,
        category,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Buy successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
