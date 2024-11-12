import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const username = request.url.split("/").pop();
    const { balance, id } = await request.json();

    if (!username || !balance || !id) {
      return NextResponse.json({ success: false, message: "Data is required" });
    }

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
        balance: user?.balance - balance,
      },
    });

    await prisma.withdraw.update({
      where: {
        id,
      },
      data: {
        status: true,
      },
    });

    return NextResponse.json({ success: true, message: "Deposit updated" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
