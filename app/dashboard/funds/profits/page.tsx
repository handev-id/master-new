import React from "react";
import Layout from "../../components/Layout";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextauth";

const ProfitPage = async () => {
  const user = await getServerSession(authOptions);
  const history = await prisma.profits.findMany({
    where: {
      username: user?.user?.name || "",
    },
  });
  return (
    <Layout title='Profits History'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Amount</th>
            <th className='text-left p-3 px-5'>Description</th>
            <th className='text-left p-3 px-5'>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx: number) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>${his?.amount}</td>
              <td className='p-3 px-5'>{his?.desc}</td>
              <td className='p-3 px-5'>{his?.date.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default ProfitPage;
