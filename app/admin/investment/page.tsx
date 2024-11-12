import Layout from "@/app/dashboard/components/Layout";
import React from "react";
import prisma from "@/lib/prisma";

const InvestmentHistoryPage = async () => {
  const history = await prisma.invesment.findMany();

  return (
    <Layout title='Semua History Invesment'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Username</th>
            <th className='text-left p-3 px-5'>Level</th>
            <th className='text-left p-3 px-5'>Amount</th>
            <th className='text-left p-3 px-5'>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>{his.username}</td>
              <td className='p-3 px-5'>{his.level}</td>
              <td className='p-3 px-5'>${his.amount}</td>
              <td className='p-3 px-5'>{his.createdAt.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default InvestmentHistoryPage;
