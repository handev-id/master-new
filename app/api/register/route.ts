import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomNumbers = () =>
  Array.from({ length: 6 }, () => getRandomNumber(1, 9));

export async function POST(request: Request) {
  const randomNumbers = generateRandomNumbers().join("");
  const resultRandNumbers = parseInt(randomNumbers);

  try {
    const body = await request.json();
    const { username, password, email, phoneNumber, invitationCode } = body;

    if (!username || !email || !password || !phoneNumber) {
      return NextResponse.json({
        message: "Harap Isi Semua Input!",
        status: 400,
        success: false,
      });
    }

    const existingUsername = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    const existingEmail = await prisma.users.findUnique({
      where: { email: email },
    });

    const existingPhoneNumber = await prisma.users.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (existingUsername) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Username Already Exists",
      });
    }

    if (existingEmail || existingPhoneNumber) {
      return NextResponse.json({
        message: existingEmail
          ? "Email Already Registered"
          : "Phone Number Already Registered",
        status: 400,
        success: false,
      });
    }

    if (invitationCode) {
      await prisma.users.update({
        where: {
          reffCode: invitationCode,
        },
        data: {
          referrers: { push: username },
        },
      });

      await prisma.refferal.create({
        data: {
          refferedBy: invitationCode,
          username: username,
          email: email,
          phoneNumber: phoneNumber,
        },
      });

      // const user = await prisma.users.update({
      //   where: {
      //     reffCode: invitationCode,
      //   },
      //   data: {
      //     bonus: { increment: 1 },
      //   },
      // });

      // await prisma.notifications.create({
      //   data: {
      //     username: user.username,
      //     sender: "Bonus Added",
      //     desc: `${username} has used your referral link, Referral Bonus Added To Your Account`,
      //   },
      // });
    }

    const users = await prisma.users.create({
      data: {
        reffCode: `${resultRandNumbers}`,
        username,
        email,
        password,
        phoneNumber,
        referrer: invitationCode || null,
      },
    });

    return NextResponse.json({
      message: "User Created",
      status: 201,
      success: true,
      userId: users.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
        success: false,
      });
    }
  }
}
