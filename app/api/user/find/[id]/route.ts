import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const id = req.url.split("/").pop();
    if (!id)
      return NextResponse.json({ success: false, message: "ID is required" });

    const user = await prisma.users.findFirst({
      where: {
        OR: [{ username: id }, { reffCode: id }],
      },
    });

    return NextResponse.json({ success: true, result: user });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message });
  }
}
