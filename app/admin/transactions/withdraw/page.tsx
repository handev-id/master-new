import React from "react";
import prisma from "@/lib/prisma";
import Layout from "@/app/dashboard/components/Layout";
import { AccWithdraw } from "../../components/Actions";

const HIstoryDepositPage = async () => {
  const deposit = await prisma.withdraw.findMany();
  const history = deposit.filter((his) => !his.status);

  return (
    <Layout title='Permintaan Withdraw'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Date</th>
            <th className='text-left p-3 px-5'>Username</th>
            <th className='text-left p-3 px-5'>Amount</th>
            <th className='text-left p-3 px-5'>Nama Bank</th>
            <th className='text-left p-3 px-5'>Nama Rekening</th>
            <th className='text-left p-3 px-5'>Nomor Rekening</th>
            <th className='text-left p-3 px-5'>Status</th>
            <th className='text-left p-3 px-5'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>{his.createdAt.toLocaleDateString()}</td>
              <td className='p-3 px-5'>{his.username}</td>
              <td className='p-3 px-5'>${his.amount}</td>
              <td className='p-3 px-5'>{his.bankName}</td>
              <td className='p-3 px-5'>{his.rekeningName}</td>
              <td className='p-3 px-5'>{his.rekeningNumber}</td>
              <td className='p-3 px-5'>{his.status ? "Success" : "Pending"}</td>
              <td className='p-3 px-5'>
                <AccWithdraw
                  username={his.username}
                  id={his.id}
                  balance={his.amount}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default HIstoryDepositPage;
