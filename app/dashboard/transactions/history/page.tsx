import React from "react";
import Layout from "../../components/Layout";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextauth";

const HistoryPage = async () => {
  const session = await getServerSession(authOptions);
  const deposit = await prisma.deposit.findMany({
    where: {
      username: session?.user?.name || "",
    },
  });
  const withdraw = await prisma.withdraw.findMany({
    where: {
      username: session?.user?.name || "",
    },
  });

  const history = [...deposit, ...withdraw].sort((a, b) =>
    a.status === true ? 1 : b.status === true ? -1 : 0
  );

  return (
    <Layout title='History Transaction'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Date</th>
            <th className='text-left p-3 px-5'>Amount</th>
            <th className='text-left p-3 px-5'>Category</th>
            <th className='text-left p-3 px-5'>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>{his.createdAt.toLocaleDateString()}</td>
              <td className='p-3 px-5'>${his.amount}</td>
              <td className='p-3 px-5'>{his.title}</td>
              <td className='p-3 px-5'>{his.status ? "Success" : "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default HistoryPage;
