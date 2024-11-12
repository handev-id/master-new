import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const id = req.url.split("/").pop();
    if (!id)
      return NextResponse.json({ success: false, message: "No id provided" });

    await prisma.news.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
