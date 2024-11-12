import React from "react";
import Layout from "../components/Layout";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextauth";
import prisma from "@/lib/prisma";
import InvestCard from "./InvestCard";

const InvesmentPage = async () => {
  const session = await getServerSession(authOptions);
  const history = await prisma.invesment.findMany({
    where: {
      username: session?.user?.name || "",
    },
  });
  return (
    <div className='flex flex-col gap-10'>
      <InvestCard />
      <Layout title='History Invesment'>
        <table className='w-full text-white/60 rounded my-6 overflow-x-scroll'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-3 px-5'>Date</th>
              <th className='text-left p-3 px-5'>Amount</th>
              <th className='text-left p-3 px-5'>Level</th>
            </tr>
          </thead>
          <tbody>
            {history.map((his, idx) => (
              <tr key={idx} className='border-b'>
                <td className='p-3 px-5'>
                  {his.createdAt.toLocaleDateString()}
                </td>
                <td className='p-3 px-5'>${his.amount}</td>
                <td className='p-3 px-5'>{his.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default InvesmentPage;
