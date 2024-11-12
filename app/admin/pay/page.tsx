import Layout from "@/app/dashboard/components/Layout";
import React from "react";
import prisma from "@/lib/prisma";
import { AddNews, DeleteNews } from "../components/AddNews";
import {
  AddPaymentsMethod,
  DeletePayMethode,
} from "../components/PayMethodeAction";

const NewsPage = async () => {
  const history = await prisma.paymentsMethod.findMany();
  return (
    <Layout title='History News'>
      <AddPaymentsMethod />
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Nama Bank</th>
            <th className='text-left p-3 px-5'>Nama rekening</th>
            <th className='text-left p-3 px-5'>Nomor rekening</th>
            <th className='text-left p-3 px-5'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>
                <img
                  src={his.image}
                  alt=''
                  className='w-[200px] object-contain'
                />
                <p className='uppercase'>{his.bankName}</p>
              </td>
              <td className='p-3 px-5'>{his.rekeningName}</td>
              <td className='p-3 px-5'>{his.noRekening}</td>
              <td className='p-3 px-5'>
                <DeletePayMethode id={his.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default NewsPage;
