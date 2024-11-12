import React from "react";
import Layout from "../dashboard/components/Layout";
import prisma from "@/lib/prisma";
import Modal from "./components/Modal";

const page = async () => {
  const history = await prisma.users.findMany();
  return (
    <Layout title='User Management'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Username</th>
            <th className='text-left p-3 px-5'>Email</th>
            <th className='text-left p-3 px-5'>PhoneNumber</th>
            <th className='text-left p-3 px-5'>Balance</th>
            <th className='text-left p-3 px-5'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>{his.username}</td>
              <td className='p-3 px-5'>{his.email}</td>
              <td className='p-3 px-5'>{his.phoneNumber}</td>
              <td className='p-3 px-5'>${his.balance}</td>
              <td className='p-3 px-5'>
                <Modal
                  username={his.username}
                  id={his.id}
                  date={his.createdAt.toLocaleDateString()}
                  reffCode={his.reffCode}
                  country={his.country}
                  bonus={his.bonus || 0}
                  profits={his.profits || 0}
                  refferers={his.referrers}
                  reffer={his.referrer}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default page;
