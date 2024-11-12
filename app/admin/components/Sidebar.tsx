"use client";
import Link from "next/dist/client/link";
import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import {
  FaChartLine,
  FaIdCard,
  FaMoneyCheckDollar,
  FaRegNewspaper,
  FaUser,
} from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { signOut } from "next-auth/react";
import Dropdown from "@/components/Dropdown";
import { useUserStore } from "@/lib/zustand";
import { MdPayments } from "react-icons/md";

const AdminSidebar = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) => {
  const [showNav, setShowNav] = useState(false);
  const pathName = usePathname();

  const { setUser } = useUserStore();
  useEffect(() => {
    setUser(session);
  }, []);

  return (
    <>
      <aside
        id='default-sidebar'
        className={
          showNav
            ? "fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0"
            : "fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0"
        }
      >
        <div
          className={`h-full px-3 py-4 overflow-y-auto bg-[#232A34] shadow-xl`}
        >
          <div className='flex justify-center items-center flex-col bg-[#333c49] p-5 rounded-lg my-6'>
            <h2 className='text-white mb-4 text-center'>
              Welcome {pathName.includes("admin") ? "Admin" : "User"}
            </h2>
            <div className='p-2 rounded-full text-white text-xl bg-yellow-500'>
              <FaUser />
            </div>
            <h3 className='text-white'>{session?.username}</h3>
          </div>
          <ul className='space-y-5 font-medium'>
            <li onClick={() => setShowNav(false)}>
              <Link
                href='/admin'
                className='flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10'
              >
                <svg
                  className='w-5 h-5 transition duration-75'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 21'
                >
                  <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                  <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                </svg>
                <span className='ms-5'>User</span>
              </Link>
            </li>
            <li onClick={() => setShowNav(false)}>
              <Link
                href='/admin/profile'
                className='flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10'
              >
                <div className='text-2xl'>
                  <CgProfile />
                </div>
                <span className='ms-4'>Profile</span>
              </Link>
            </li>
            <Dropdown
              icon={<FaMoneyCheckDollar />}
              Menus={Menus}
              Title='Transaksi'
              onPress={() => setShowNav(false)}
            />
            <li onClick={() => setShowNav(false)}>
              <Link
                href='/admin/investment'
                className='flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10'
              >
                <div className='text-2xl'>
                  <FaChartLine />
                </div>
                <span className='ms-4'>History Investmen</span>
              </Link>
            </li>
            <li onClick={() => setShowNav(false)}>
              <Link
                href='/admin/kyc'
                className='flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10'
              >
                <div className='text-2xl'>
                  <FaIdCard />
                </div>
                <span className='ms-4'>KYC</span>
              </Link>
            </li>
            <li onClick={() => setShowNav(false)}>
              <Link
                href='/admin/pay'
                className='flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10'
              >
                <div className='text-2xl'>
                  <MdPayments />
                </div>
                <span className='ms-4'>Payment</span>
              </Link>
            </li>
            <li onClick={() => setShowNav(false)}>
              <Link
                href='/admin/news'
                className='flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10'
              >
                <div className='text-2xl'>
                  <FaRegNewspaper />
                </div>
                <span className='ms-4'>News</span>
              </Link>
            </li>
            <li onClick={() => setShowNav(false)}>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className='flex w-full items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10'
              >
                <svg
                  className='flex-shrink-0 w-5 h-5 transition duration-75 transform rotate-180'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 18 16'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3'
                  />
                </svg>
                <span className='ms-5 whitespace-nowrap'>Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className='bg-[#2F2F2F] lg:ml-64 h-screen overflow-y-scroll'>
        <div className='flex p-2 bg-[#00CC99]'>
          <div className='flex w-full justify-end pr-4 items-center gap-3'>
            <button
              onClick={() => setShowNav(true)}
              type='button'
              className='text-white mr-auto lg:hidden hover:text-white items-center p-2 text-sm rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
            >
              <span className='sr-only'>Open sidebar</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  clipRule='evenodd'
                  fillRule='evenodd'
                  d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                ></path>
              </svg>
            </button>
            <div className='p-2 rounded-full text-white text-xl bg-yellow-500'>
              <FaUser />
            </div>
          </div>
        </div>

        <div className='flex p-5 m-3 bg-[#1f1f1f] shadow-lg shadow-[#A1A1A1]/15 text-white rounded-lg'>
          <h2 className='text-2xl'>
            {pathName.split("/").pop()?.toUpperCase()}
          </h2>
        </div>

        <div className='p-3'>{children}</div>
      </div>
      {showNav && (
        <div
          onClick={() => setShowNav(false)}
          className='w-full h-screen overflow-hidden bg-black/40 absolute top-0 right-0'
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
const Menus = [
  { name: "Deposit", url: "/admin/transactions/deposit" },
  { name: "Withdraw", url: "/admin/transactions/withdraw" },
  { name: "Semua History", url: "/admin/transactions" },
];
