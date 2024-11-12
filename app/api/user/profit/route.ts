import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, amount, desc } = await req.json();
    if (!username || !amount || !desc) {
      return NextResponse.json({
        success: false,
        message: "Data is required",
      });
    }

    await prisma.profits.create({
      data: {
        username,
        amount,
        desc,
      },
    });

    await prisma.users.update({
      where: {
        username,
      },
      data: {
        profits: {
          increment: amount,
        },
      },
    });

    await prisma.notifications.create({
      data: {
        username,
        sender: "PENTAHEX",
        desc: `Profit Added: ${amount} To Your Account!`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profit added successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
