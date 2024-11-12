import React from "react";
import KycForm from "./Form";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextauth";

const KYCPage = async () => {
  const user = await getServerSession(authOptions);
  const kyc = await prisma.kyc.findUnique({
    where: {
      username: user?.user?.name || "",
    },
  });
  return <KycForm isVerified={kyc?.verified} />;
};

export default KYCPage;
