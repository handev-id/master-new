import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, fullname, cardImage, faceImage, address } =
      await req.json();

    if (!username || !fullname || !cardImage || !faceImage || !address) {
      return NextResponse.json({
        success: false,
        message: "Data is required",
      });
    }

    await prisma.kyc.create({
      data: {
        username,
        fullname,
        cardImage,
        faceImage,
        address,
      },
    });

    return NextResponse.json({
      success: true,
      message: "KYC created successfully, please wait for verification",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
