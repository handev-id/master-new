"use client";
import Link from "next/dist/client/link";
import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Marquee from "react-fast-marquee";

import { usePathname } from "next/navigation";
import {
  FaChartLine,
  FaIdCard,
  FaMoneyBillTrendUp,
  FaMoneyCheckDollar,
  FaRegChartBar,
  FaUser,
} from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { TbUsersPlus } from "react-icons/tb";
import { signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { useUserStore } from "@/lib/zustand";
import IconsNav from "@/app/dashboard/components/IconsNav";
import {
  Funds,
  Menus,
  Notifications,
  Traded,
} from "@/app/dashboard/components/MenuSidebar";

type TradeViewItemType = {
  title: string;
  price: string;
  change: string;
  changePercent: string;
  image: string[];
};

interface TradeViewType extends Array<TradeViewItemType> {}

const Sidebar = ({
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

  // const [tradeView, setTradeView] = useState<TradeViewType>([]);

  // useEffect(() => {
  //   const getTrade = async () => {
  //     const res = await fetch("/api/trade-view");
  //     const data = await res.json();
  //     setTradeView(data?.result?.slice(2));
  //   };

  //   getTrade();
  // }, []);

  const tradeView = [
    {
      title: "EURUSD",
      price: "1.07965",
      changePercent: "+0.08%",
      change: "0.00082",
      image: [
        "https://s3-symbol-logo.tradingview.com/country/US.svg",
        "https://s3-symbol-logo.tradingview.com/country/EU.svg",
      ],
    },
    {
      title: "USDJPY",
      price: "151.225",
      changePercent: "−0.10%",
      change: "−0.154",
      image: [
        "https://s3-symbol-logo.tradingview.com/country/US.svg",
        "https://s3-symbol-logo.tradingview.com/country/JP.svg",
      ],
    },
    {
      title: "GBPUSD",
      price: "1.2640",
      changePercent: "+0.16%",
      change: "0.0020",
      image: [
        "https://s3-symbol-logo.tradingview.com/country/US.svg",
        "https://s3-symbol-logo.tradingview.com/country/GB.svg",
      ],
    },
    {
      title: "AUDUSD",
      price: "0.65277",
      changePercent: "+0.20%",
      change: "0.00129",
      image: [
        "https://s3-symbol-logo.tradingview.com/country/US.svg",
        "https://s3-symbol-logo.tradingview.com/country/AU.svg",
      ],
    },
    {
      title: "USDCAD",
      price: "1.35440",
      changePercent: "+0.06%",
      change: "0.00080",
      image: [
        "https://s3-symbol-logo.tradingview.com/country/US.svg",
        "https://s3-symbol-logo.tradingview.com/country/CA.svg",
      ],
    },
    {
      title: "USDCHF",
      price: "0.90121",
      changePercent: "−0.09%",
      change: "−0.00078",
      image: [
        "https://s3-symbol-logo.tradingview.com/country/US.svg",
        "https://s3-symbol-logo.tradingview.com/country/CH.svg",
      ],
    },
    {
      title: "NZDUSD",
      price: "0.59841",
      changePercent: "+0.23%",
      change: "0.00137",
      image: [
        "https://s3-symbol-logo.tradingview.com/country/US.svg",
        "https://s3-symbol-logo.tradingview.com/country/NZ.svg",
      ],
    },
  ];

  return (
    <>
      <aside
        id="default-sidebar"
        className={
          showNav
            ? "fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0"
            : "fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0"
        }
      >
        <div
          className={`h-full px-3 pb-4 overflow-y-auto overflow-x-hidden bg-[#232A34] shadow-xl`}
        >
          <img
            src="/logo.png"
            className="w-[100px] mx-auto object-contain"
            alt=""
          />
          <div className="flex justify-center items-center flex-col bg-[#333c49] p-5 rounded-lg mb-6">
            <div className="p-2 rounded-full text-white text-xl bg-yellow-500">
              <FaUser />
            </div>
            <h3 className="text-white">{session?.username}</h3>
          </div>
          <ul className="space-y-5 font-medium">
            <li onClick={() => setShowNav(false)}>
              <Link
                href="/dashboard"
                className="flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10"
              >
                <svg
                  className="w-5 h-5 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-5">Dashboard</span>
              </Link>
            </li>
            <li onClick={() => setShowNav(false)}>
              <Link
                href="/dashboard/profile"
                className="flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10"
              >
                <div className="text-2xl">
                  <CgProfile />
                </div>
                <span className="ms-4">Profile</span>
              </Link>
            </li>
            <li onClick={() => setShowNav(false)}>
              <Link
                href="/dashboard/kyc"
                className="flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10"
              >
                <div className="text-2xl">
                  <FaIdCard />
                </div>
                <span className="ms-4">KYC</span>
              </Link>
            </li>
            <Dropdown
              Menus={Menus}
              Title="Wallet"
              onPress={() => setShowNav(false)}
              icon={<FaMoneyCheckDollar />}
            />
            <li onClick={() => setShowNav(false)}>
              <Link
                href="/dashboard/invesment"
                className="flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10"
              >
                <div className="text-2xl">
                  <FaRegChartBar />
                </div>
                <span className="ms-4">Invesment</span>
              </Link>
            </li>
            <Dropdown
              Menus={Traded}
              Title="Trade"
              onPress={() => setShowNav(false)}
              icon={<FaChartLine />}
            />
            <li onClick={() => setShowNav(false)}>
              <Link
                href="/dashboard/refferal"
                className="flex items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10"
              >
                <div className="text-2xl">
                  <TbUsersPlus />
                </div>
                <span className="ms-4">Reffreral</span>
              </Link>
            </li>
            <Dropdown
              Menus={Funds}
              Title="Funds"
              onPress={() => setShowNav(false)}
              icon={<FaMoneyBillTrendUp />}
            />
            <Dropdown
              Menus={Notifications}
              Title="Notifications"
              onPress={() => setShowNav(false)}
              icon={<MdNotificationsActive />}
            />
            <li onClick={() => setShowNav(false)}>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex w-full items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 transition duration-75 transform rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="ms-5 whitespace-nowrap">Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="bg-[#2F2F2F] lg:ml-64 h-screen overflow-y-scroll">
        <div className="flex p-2 bg-[#00CC99]">
          <div className="flex w-full justify-end pr-4 items-center gap-3">
            <button
              onClick={() => setShowNav(true)}
              type="button"
              className="text-white mr-auto lg:hidden hover:text-white items-center p-2 text-sm rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <img
              src="/logo.png"
              className="w-[50px] mr-2"
              alt="logo suruhanjaya masterbinary"
            />
            <IconsNav saldo={session?.balance} />
          </div>
        </div>
        {/* MARQUEE */}
        <Marquee className="flex bg-[#232A34] p-3">
          {tradeView?.map((item, index) => (
            <a
              href={`https://in.tradingview.com/symbols/${item.title}`}
              target="_blank"
              key={index}
              className="flex items-center px-6 border-x border-white/20"
            >
              <div className="relative mr-3">
                <img
                  src={item.image[1]}
                  alt="PENTAHEX"
                  className="w-[30px] rounded-full border-4 border-[#232A34]"
                />
                <div className="absolute bottom-[-40%] left-[-40%]">
                  <img
                    src={item.image[0]}
                    alt="PENTAHEX"
                    className="w-[30px] rounded-full border-4 border-[#232A34]"
                  />
                </div>
              </div>
              <div className="flex gap-3 font-semibold">
                <h3 className="text-lg text-white">{item.title}</h3>
                <h3 className="text-lg text-white">{item.price}</h3>
                <h3
                  className={`text-lg ${
                    item.change.includes("−")
                      ? "text-red-500"
                      : "text-[#00CC99]"
                  }`}
                >
                  {item.change.substring(0, 6)}
                </h3>
                <h3
                  className={`text-lg ${
                    item.change.includes("−")
                      ? "text-red-500"
                      : "text-[#00CC99]"
                  }`}
                >
                  {item.changePercent.split("%")[0] + "%"}
                </h3>
              </div>
            </a>
          ))}
        </Marquee>
        <div className="flex p-5 m-3 bg-[#1f1f1f] shadow-lg shadow-[#A1A1A1]/15 text-white rounded-lg">
          <h2 className="text-2xl">
            {pathName.split("/").pop()?.toUpperCase()}
          </h2>
        </div>
        <div className="p-3">{children}</div>
      </div>
      {showNav && (
        <div
          onClick={() => setShowNav(false)}
          className="w-full h-screen overflow-hidden bg-black/40 absolute top-0 right-0"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
