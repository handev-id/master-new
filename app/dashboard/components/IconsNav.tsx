"use client";
import { useUserStore } from "@/lib/zustand";
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa6";
import {
  MdNotificationsActive,
  MdOutlineCircleNotifications,
} from "react-icons/md";

const IconsNav = ({ saldo }: { saldo: number }) => {
  const { user } = useUserStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotif = async () => {
      const { data } = await axios.get("/api/notifications/" + user?.username);
      setNotifications(data?.result);
    };
    if (user) {
      getNotif();
    }
  }, [user]);
  return (
    <div className='flex items-center gap-5'>
      <div className='hover:bg-[#3ab093] relative rounded-lg cursor-pointer text-white'>
        <h2 className='p-2 rounded bg-[#232A34] text-base'>
          ${saldo}{" "}
          <span className='bg-[#00CC99] text-sm p-1 ml-2 rounded text-[#232A34]'>
            Real
          </span>
        </h2>
      </div>
      <Dropdown username={user?.username || ""} />
    </div>
  );
};

export default IconsNav;

interface Option {
  label: string;
  icon: React.ReactNode;
}

const Dropdown = ({ username }: { username: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const options: Option[] = [{ label: "Profile", icon: <CgProfile /> }];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        className='p-2 rounded-full cursor-pointer text-white text-xl bg-yellow-500 hover:bg-yellow-600'
        onClick={toggleDropdown}
      >
        <FaUser />
      </button>
      {isOpen && (
        <div className='absolute top-full z-50 p-3 w-[200px] left-[-450%] bg-[#232A34] text-white shadow-md mt-1 rounded'>
          <div className='flex items-center gap-2 justify-center mb-3'>
            <div className='bg-yellow-500 p-2 rounded-full cursor-pointer text-white text-xl '>
              <FaUser />
            </div>
            <h2>{username}</h2>
          </div>
          {options.map((option) => (
            <Link href='/dashboard/profile' key={option.label}>
              <div
                onClick={() => handleOptionClick(option)}
                className='my-2 p-2 cursor-pointer hover:bg-gray-100/20 flex items-center gap-2'
              >
                <div className='text-3xl'>{option.icon}</div>
                <h2>{option.label}</h2>
              </div>
            </Link>
          ))}
          <div
            onClick={() => signOut({ callbackUrl: "/" })}
            className='my-2 p-2 cursor-pointer hover:bg-gray-100/20 flex items-center gap-2'
          >
            <div className='text-3xl'>
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
            </div>
            <h2>Logout</h2>
          </div>
        </div>
      )}
    </div>
  );
};
