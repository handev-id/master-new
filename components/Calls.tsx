"use client";
import Link from "next/link";
import React from "react";

const Calls = () => {
  return (
    <div className='flex py-16 justify-center bg-gradient-to-t from-gray-800 to-gray-900 flex-col text-white'>
      <h1 className='text-4xl font-bold text-center'>
        10% Referral Commission
      </h1>
      <p className='text-center'>
        Aenean vulputate eleifend tellus. Aenean leo ligul porttitoeu consequat
        vitae eleifend acenim
      </p>
      <button
        onClick={() => (window.location.href = "/register")}
        className='bg-gradient-to-r from-orange-500 to-red-500 mt-10 hover:shadow-lg hover:scale-95 duration-200 w-[200px] mx-auto text-white font-bold py-2 px-4 lg:py-3 lg:px-5 rounded-full'
      >
        Get Started
      </button>
    </div>
  );
};

export default Calls;
