import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, desc } = await req.json();
    if (!title || !desc) {
      return NextResponse.json({
        success: false,
        message: "Data is required",
      });
    }
    await prisma.news.create({
      data: {
        title,
        desc,
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
