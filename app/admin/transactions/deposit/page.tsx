import React from "react";
import prisma from "@/lib/prisma";
import Layout from "@/app/dashboard/components/Layout";
import { AccDeposit } from "../../components/Actions";

const HIstoryDepositPage = async () => {
  const deposit = await prisma.deposit.findMany();
  const history = deposit.filter((his) => !his.status);

  return (
    <Layout title='Permintaan Deposit'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Date</th>
            <th className='text-left p-3 px-5'>Username</th>
            <th className='text-left p-3 px-5'>Amount</th>
            <th className='text-left p-3 px-5'>Bukti pay</th>
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
              <td className='p-3 px-5'>
                <img
                  src={his.image}
                  alt='bukti'
                  className='w-[100px] object-contain mb-3'
                />
                <a
                  target='_blank'
                  href={his.image}
                  className='underline text-sm text-blue-500'
                >
                  Lihat
                </a>
              </td>
              <td className='p-3 px-5'>{his.status ? "Success" : "Pending"}</td>
              <td className='p-3 px-5'>
                <div className='flex'>
                  <AccDeposit
                    username={his.username}
                    balance={his.amount}
                    id={his.id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default HIstoryDepositPage;
