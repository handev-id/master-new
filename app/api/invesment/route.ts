import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { username, amount, level } = await request.json();
    if (!username || !amount || !level) {
      return NextResponse.json({
        status: false,
        message: "Data is required",
      });
    }
    const invesment = await prisma.invesment.create({
      data: {
        username,
        amount,
        level,
      },
    });

    const user: any = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    await prisma.users.update({
      where: {
        username,
      },
      data: {
        balance: user?.balance - amount,
      },
    });

    return NextResponse.json({
      success: true,
      result: invesment,
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: (error as Error).message,
    });
  }
}
