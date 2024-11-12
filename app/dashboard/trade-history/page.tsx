import React from "react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextauth";
import Layout from "../components/Layout";

const HistoryPage = async () => {
  const session = await getServerSession(authOptions);
  const history = await prisma.trade.findMany({
    where: {
      username: session?.user?.name || "",
    },
  });

  return (
    <Layout title='History Transaction'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Date</th>
            <th className='text-left p-3 px-5'>Market</th>
            <th className='text-left p-3 px-5'>Amount</th>
            <th className='text-left p-3 px-5'>Rate Stake</th>
            <th className='text-left p-3 px-5'>Rate End</th>
            <th className='text-left p-3 px-5'>Time</th>
            <th className='text-left p-3 px-5'>Category</th>
            <th className='text-left p-3 px-5'>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>{his.date.toLocaleDateString()}</td>
              <td className='p-3 px-5'>{his.market}</td>
              <td className='p-3 px-5'>${his.amount}</td>
              <td className='p-3 px-5'>{his.rateStake}</td>
              <td className='p-3 px-5'>{his.rateEnd}</td>
              <td className='p-3 px-5'>{his.time}</td>
              <td className='p-3 px-5'>{his.category}</td>
              <td className='p-3 px-5'>{his.status ? "Success" : "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default HistoryPage;
