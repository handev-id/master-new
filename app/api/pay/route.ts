import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { bankName, rekeningName, rekeningNumber, image } = await req.json();

    if (!bankName || !rekeningName || !rekeningNumber || !image) {
      return NextResponse.json({
        success: false,
        message: "Data is required",
      });
    }

    await prisma.paymentsMethod.create({
      data: {
        bankName,
        rekeningName,
        noRekening: rekeningNumber,
        image,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment Method Added",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
