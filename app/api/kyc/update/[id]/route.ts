import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const id = req.url.split("/").pop();
    if (!id)
      return NextResponse.json({
        success: false,
        message: "Data is required!",
      });

    await prisma.kyc.update({
      where: {
        id,
      },
      data: {
        verified: true,
      },
    });

    return NextResponse.json({ success: true, message: "Update SuccessFully" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
