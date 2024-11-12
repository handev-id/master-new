import React from "react";
import Layout from "../components/Layout";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextauth";
import prisma from "@/lib/prisma";

const NotificationsPage = async () => {
  const session = await getServerSession(authOptions);
  const history = await prisma.notifications.findMany({
    where: {
      username: session?.user?.name || "",
    },
  });

  return (
    <Layout title='All Notifications'>
      <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
        <thead>
          <tr className='border-b'>
            <th className='text-left p-3 px-5'>Date</th>
            <th className='text-left p-3 px-5'>From</th>
            <th className='text-left p-3 px-5'>Description</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, idx) => (
            <tr key={idx} className='border-b'>
              <td className='p-3 px-5'>
                {his?.date?.toLocaleDateString()}2024
              </td>
              <td className='p-3 px-5'>{his?.sender}</td>
              <td className='p-3 px-5'>{his?.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default NotificationsPage;
