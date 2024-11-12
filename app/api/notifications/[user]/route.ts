import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const username = req.url.split("/").pop();
    const notifications = await prisma.notifications.findMany({
      where: {
        username,
      },
    });

    return NextResponse.json({ success: true, result: notifications });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
