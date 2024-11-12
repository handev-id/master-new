import CopyUrl, { Welcome } from "@/components/CopyUrl";
import DashboardCard from "@/components/DashboardCard";
import authOptions from "@/lib/nextauth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { FaGift, FaRegNewspaper, FaUsers, FaWallet } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import prisma from "@/lib/prisma";
import { MdOutlineCircleNotifications } from "react-icons/md";

const data = [1];
const labels = ["Jan"];
const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.name === "adminmaster99") return redirect("/admin");

  const user = await prisma.users.findUnique({
    where: {
      username: session?.user?.name || "",
    },
  });

  const notifications = await prisma.notifications.findMany({
    where: {
      username: session?.user?.name || "",
    },
    take: 3,
    orderBy: {
      date: "desc",
    },
  });

  const AllNews = await prisma.news.findMany({
    take: 3,
    orderBy: {
      date: "desc",
    },
  });

  return (
    <section>
      <CopyUrl />
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
        <DashboardCard
          icon={<FaWallet />}
          desc='Total Balance'
          title='USD Wallet'
          total={user?.balance || 0}
          data={data}
          labels={labels}
        />
        <DashboardCard
          icon={<FaGift />}
          desc='Total Bonus'
          title='Bonus'
          total={user?.bonus || 0}
          data={data}
          labels={labels}
        />
        <DashboardCard
          icon={<GiTakeMyMoney />}
          desc='Total Profits'
          title='Profits'
          total={0}
          data={data}
          labels={labels}
        />
        <DashboardCard
          icon={<FaUsers />}
          desc='Total Refferal'
          title='Refferal'
          total={user?.referrers.length || 0}
          data={data}
          labels={labels}
        />
      </div>
      <Welcome />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        <div className='flex bg-[#1f1f1f] rounded-lg flex-col my-5 text-white w-full shadow-lg shadow-[#A1A1A1]/15'>
          <h2 className='text-xl border-b border-[#A1A1A1]/60 p-3'>
            Latest News
          </h2>
          {AllNews?.map((news) => (
            <div
              key={news.id}
              className='flex items-center border border-white/20 gap-4 m-3 rounded-lg p-2'
            >
              <div className='p-2 rounded-md text-3xl text-white bg-blue-500'>
                <FaRegNewspaper />
              </div>
              <div>
                <h3 className='font-bold'>{news.title}</h3>
                <p className='text-sm my-1 text-[#A1A1A1]'>{news.desc}</p>
                <p className='text-xs text-[#A1A1A1]'>
                  {news.date.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='flex bg-[#1f1f1f] rounded-lg flex-col my-5 text-white w-full shadow-lg shadow-[#A1A1A1]/15'>
          <h2 className='text-xl border-b border-[#A1A1A1]/60 p-3'>
            Latest Notifications
          </h2>
          {notifications?.map((notif) => (
            <div
              key={notif.id}
              className='flex items-center border border-white/20 gap-4 m-3 rounded-lg p-2'
            >
              <div className='p-2 rounded-md text-3xl text-white bg-blue-500'>
                <MdOutlineCircleNotifications />
              </div>
              <div>
                <h3 className='font-bold'>{notif.sender}</h3>
                <p className='text-sm my-1 text-[#A1A1A1]'>{notif.desc}</p>
                <p className='text-xs text-[#A1A1A1]'>
                  {notif?.date?.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
