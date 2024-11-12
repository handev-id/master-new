import Link from "next/link";
import React from "react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

interface MenuProps {
  url: string;
  name: string;
}

const DropMenu = ({
  Title,
  Menus,
  onPress,
  icon,
}: {
  Title: string;
  Menus: Array<MenuProps>;
  onPress: () => void;
  icon: React.ReactNode;
}) => {
  return (
    <div className='group relative cursor-pointer'>
      <div className='flex items-center justify-between'>
        <a className='menu-hover text-base font-medium'>
          <span className='flex justify-between text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg w-60 items-center cursor-pointer'>
            <div className='flex gap-4'>
              <div className='text-2xl'>{icon}</div>
              <p>{Title}</p>
            </div>
            <p className='text-xl'>
              <IoMdArrowDropdown />
            </p>
          </span>
        </a>
      </div>

      <div className='invisible absolute z-50 flex w-60 flex-col bg-white py-1 px-4 text-gray-800 shadow-xl group-hover:visible'>
        {Menus.map((item, idx) => (
          <Link href={item.url} key={idx}>
            <div
              onClick={onPress}
              className='my-2 text-sm block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2'
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropMenu;
