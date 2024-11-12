import React from "react";
import Layout from "../../components/Layout";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextauth";

const BonusPage = async () => {
  const user = await getServerSession(authOptions);
  const history = await prisma.bonus.findMany({
    where: {
      username: user?.user?.name || "",
    },
  });
  return (
    <Layout title='Bonus History'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>From</th>
            <th className='text-left p-3 px-5'>Description</th>
            <th className='text-left p-3 px-5'>Amount</th>
            <th className='text-left p-3 px-5'>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx: number) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>{his?.from}</td>
              <td className='p-3 px-5'>{his?.desc}</td>
              <td className='p-3 px-5'>${his?.amount}</td>
              <td className='p-3 px-5'>{his?.date.toLocaleDateString()}2024</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default BonusPage;
