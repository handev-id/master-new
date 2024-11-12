import React from "react";

const HowToDo = () => {
  return (
    <div id='how' className='gap-4 flex flex-col text-white text-center py-20'>
      <span className='text-lg text-blue-500'>HOW TO DO</span>
      <h2 className='font-bold text-4xl lg:text-5xl'>Our Working Process</h2>
      <p>
        Curabitur ullamcorper ultricies nisi Nam eget dui. Etiam rhoncus fdsf df
        vulputate.
      </p>
      <div className='grid grid-cols-1 gap-10 lg:grid-cols-3 justify-center items-center mt-10'>
        <div className='flex flex-col'>
          <div className='p-4 rounded-full text-3xl font-bold bg-gradient-to-r from-orange-500 mb-3 to-red-500 w-[100px] mx-auto flex justify-center items-center h-[100px]'>
            01
          </div>
          <h3 className='text-2xl font-bold'>Create Account</h3>
          <p>create a free account</p>
        </div>
        <div className='flex flex-col'>
          <div className='p-4 rounded-full text-3xl font-bold bg-gradient-to-r from-cyan-500 mb-3 to-blue-500 w-[100px] mx-auto flex justify-center items-center h-[100px]'>
            02
          </div>
          <h3 className='text-2xl font-bold'>Choose Plan</h3>
          <p>
            make purchases of wallet balances and make purchases of packages
          </p>
        </div>
        <div className='flex flex-col'>
          <div className='p-4 rounded-full text-3xl font-bold bg-gradient-to-r from-green-400 mb-3 to-green-500 w-[100px] mx-auto flex justify-center items-center h-[100px]'>
            03
          </div>
          <h3 className='text-2xl font-bold'>Get Profit</h3>
          <p>receive profit per day until the end of the contract</p>
        </div>
      </div>
    </div>
  );
};

export default HowToDo;
