import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const id = request.url.split("/").pop();
    if (!id)
      return NextResponse.json({ success: false, message: "ID is required" });
    await prisma.users.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
