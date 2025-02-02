import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const id = request.url.split("/").pop();
    const { username, country, phoneNumber, email, accName, accNumber, bank } =
      await request.json();

    if (
      !id ||
      !username ||
      !country ||
      !phoneNumber ||
      !email ||
      !accName ||
      !accNumber ||
      !bank
    ) {
      return NextResponse.json({ message: "Data is required" });
    }

    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        username,
        country,
        phoneNumber,
        email,
        rekeningName: accName,
        rekeningNumber: accNumber,
        bankName: bank,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
