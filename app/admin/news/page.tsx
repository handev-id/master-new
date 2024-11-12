import Layout from "@/app/dashboard/components/Layout";
import React from "react";
import prisma from "@/lib/prisma";
import { AddNews, DeleteNews } from "../components/AddNews";

const NewsPage = async () => {
  const history = await prisma.news.findMany();
  return (
    <Layout title='History News'>
      <AddNews />
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Title</th>
            <th className='text-left p-3 px-5'>Description</th>
            <th className='text-left p-3 px-5'>Date</th>
            <th className='text-left p-3 px-5'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>{his.title}</td>
              <td className='p-3 px-5'>{his.desc}</td>
              <td className='p-3 px-5'>{his.date.toLocaleDateString()}</td>
              <td className='p-3 px-5'>
                <DeleteNews id={his.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default NewsPage;
