import Layout from "@/app/dashboard/components/Layout";
import React from "react";
import prisma from "@/lib/prisma";
import UpdateKyc from "../components/UpdateKyc";

const KycPage = async () => {
  const history = await prisma.kyc.findMany();
  return (
    <Layout title='All KYC'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Username</th>
            <th className='text-left p-3 px-5'>Address</th>
            <th className='text-left p-3 px-5'>Id Documents</th>
            <th className='text-left p-3 px-5'>Selfie</th>
            <th className='text-left p-3 px-5'>Date</th>
            <th className='text-left p-3 px-5'>Status</th>
            <th className='text-left p-3 px-5'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>{his.username}</td>
              <td className='p-3 px-5'>{his.address}</td>
              <td className='p-3 px-5'>
                <img
                  src={his.cardImage}
                  className='w-[120px] object-contain'
                  alt=''
                />
                <a href={his.cardImage} className='underline' target='_blank'>
                  Detail
                </a>
              </td>
              <td className='p-3 px-5'>
                <img
                  src={his.faceImage}
                  className='w-[120px] object-contain'
                  alt=''
                />
                <a href={his.faceImage} className='underline' target='_blank'>
                  Detail
                </a>
              </td>
              <td className='p-3 px-5'>{his.createdAt.toLocaleDateString()}</td>
              <td className='p-3 px-5'>
                {his.verified ? "Success" : "Pending "}
              </td>
              <td className='p-3 px-5'>
                <UpdateKyc id={his.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default KycPage;
