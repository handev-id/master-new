import authOptions from "@/lib/nextauth";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "@/lib/prisma";
import Layout from "../components/Layout";
import CopyUrl from "@/components/CopyUrl";

const RefferalPage = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.users.findUnique({
    where: {
      username: session?.user?.name || "",
    },
  });
  const history = await prisma.refferal.findMany({
    where: {
      refferedBy: user?.reffCode || "",
    },
  });

  return (
    <div>
      <CopyUrl />
      <Layout title={`Refferal (${history.length} User)`}>
        <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-3 px-5'>Date Join</th>
              <th className='text-left p-3 px-5'>Username</th>
              <th className='text-left p-3 px-5'>Email</th>
              <th className='text-left p-3 px-5'>Phone Number</th>
              <th className='text-left p-3 px-5'>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((his, idx) => (
              <tr key={idx} className='border-b'>
                <td className='p-3 px-5'>{his.date.toLocaleDateString()}</td>
                <td className='p-3 px-5'>${his.username}</td>
                <td className='p-3 px-5'>{his.email}</td>
                <td className='p-3 px-5'>{his.phoneNumber}</td>
                <td className='p-3 px-5'>
                  {his.status ? "Success" : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default RefferalPage;
