import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const id = request.url.split("/").pop();
    const { password } = await request.json();

    if (!id || !password) {
      return NextResponse.json({ message: "User Not Found" });
    }

    const user = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        password,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
