import React from "react";
import prisma from "@/lib/prisma";
import Layout from "@/app/dashboard/components/Layout";

const HistoryPage = async () => {
  const deposit = await prisma.deposit.findMany();
  const withdraw = await prisma.withdraw.findMany();

  const history = [...deposit, ...withdraw];

  return (
    <Layout title='Semua History Transaksi'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Username</th>
            <th className='text-left p-3 px-5'>Date</th>
            <th className='text-left p-3 px-5'>Amount</th>
            <th className='text-left p-3 px-5'>Category</th>
            <th className='text-left p-3 px-5'>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>{his.username}</td>
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
