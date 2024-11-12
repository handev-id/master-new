import React from "react";

const CardsGradient = () => {
  return (
    <section className='flex flex-col gap-10 py-6 lg:py-10'>
      <h2 className='text-center text-white text-4xl lg:text-5xl font-bold'>
        Our Invesment Plan
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
        <div className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg p-8 py-12'>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold text-white mb-4'>10%</h2>
            <p className='text-white text-3xl pb-4 border-b border-white w-full text-center'>
              Daily
            </p>
            <div>
              <p className='text-white text-xl font-semibold my-5'>
                CONTRACT 30 DAY
              </p>
              <div className='text-white text-lg w-full'>
                <div className='flex gap-10 text-center justify-center'>
                  <p>Min:</p>
                  <p>$10</p>
                </div>
                <div className='flex gap-10 text-center justify-center'>
                  <p>Max:</p>
                  <p>$100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg p-8 py-12'>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold text-white mb-4'>20%</h2>
            <p className='text-white text-3xl pb-4 border-b border-white w-full text-center'>
              Daily
            </p>
            <div>
              <p className='text-white text-xl font-semibold my-5'>
                CONTRACT 30 DAY
              </p>
              <div className='text-white text-lg w-full'>
                <div className='flex gap-10 text-center justify-center'>
                  <p>Min:</p>
                  <p>$100</p>
                </div>
                <div className='flex gap-10 text-center justify-center'>
                  <p>Max:</p>
                  <p>$1,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg p-8 py-12'>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold text-white mb-4'>30%</h2>
            <p className='text-white text-3xl pb-4 border-b border-white w-full text-center'>
              Daily
            </p>
            <div>
              <p className='text-white text-xl font-semibold my-5'>
                CONTRACT 30 DAY
              </p>
              <div className='text-white text-lg w-full'>
                <div className='flex gap-10 text-center justify-center'>
                  <p>Min:</p>
                  <p>$500</p>
                </div>
                <div className='flex gap-10 text-center justify-center'>
                  <p>Max:</p>
                  <p>$10,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 py-12'>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold text-white mb-4'>40%</h2>
            <p className='text-white text-3xl pb-4 border-b border-white w-full text-center'>
              Daily
            </p>
            <div>
              <p className='text-white text-xl font-semibold my-5'>
                CONTRACT 30 DAY
              </p>
              <div className='text-white text-lg w-full'>
                <div className='flex gap-10 text-center justify-center'>
                  <p>Min:</p>
                  <p>$1000</p>
                </div>
                <div className='flex gap-10 text-center justify-center'>
                  <p>Max:</p>
                  <p>$100,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsGradient;
