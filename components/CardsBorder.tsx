import React from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaFlag, FaMoneyBillWheat, FaUsers } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";

const CardsBorder = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-5 py-10 lg:py-16 pb-20'>
      <div className='p-6 flex border justify-between border-blue-400 from-cyan-500 to-blue-500 shadow-lg bg-gray-700 hover:-translate-y-5 duration-300'>
        <span className='text-blue-400 text-4xl'>
          <FaUsers />
        </span>
        <div className='text-white'>
          <h3 className='text-3xl font-bold'>7,996</h3>
          <h2 className='text-xl font-semibold'>Active Members</h2>
        </div>
      </div>
      <div className='p-6 flex border justify-between border-orange-400 from-orange-400 to-blue-500 shadow-lg bg-gray-700 hover:-translate-y-5 duration-300'>
        <span className='text-orange-400 text-4xl'>
          <FaMoneyBillWheat />
        </span>
        <div className='text-white'>
          <h3 className='text-3xl font-bold'>$36,000</h3>
          <h2 className='text-xl font-semibold'>Total Deposit</h2>
        </div>
      </div>
      <div className='p-6 flex border justify-between border-green-400 from-green-400 to-blue-500 shadow-lg bg-gray-700 hover:-translate-y-5 duration-300'>
        <span className='text-green-400 text-4xl'>
          <BiMoneyWithdraw />
        </span>
        <div className='text-white'>
          <h3 className='text-3xl font-bold'>$2,836,228.139</h3>
          <h2 className='text-xl font-semibold'>Total Withdraw</h2>
        </div>
      </div>
      <div className='p-6 flex border justify-between border-red-400 from-red-400 to-blue-500 shadow-lg bg-gray-700 hover:-translate-y-5 duration-300'>
        <span className='text-red-400 text-4xl'>
          <FaFlag />
        </span>
        <div className='text-white'>
          <h3 className='text-3xl font-bold'>29</h3>
          <h2 className='text-xl font-semibold'>Countries Joined</h2>
        </div>
      </div>
    </div>
  );
};

export default CardsBorder;
