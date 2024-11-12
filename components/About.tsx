import React from "react";
import { FaHeadphones, FaRocket } from "react-icons/fa6";

const About = () => {
  return (
    <>
      <section id='about' className='overflow-hidden py-10 lg:py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center'>
          <div className='w-full'>
            <img
              src='/money.png'
              alt='hero image'
              className='w-[80%] mx-auto lg:mr-auto'
            />
          </div>

          <div className='w-full text-white'>
            <div className='mt-10 lg:mt-0'>
              <span className='block mb-4 text-lg font-semibold text-blue-500'>
                ABOUT US
              </span>
              <span className='text-4xl lg:text-5xl font-bold '>
                Our Investment Plan
              </span>
              <p className='text-lg mb-5'>
                Aenean vulputate eleifend tellus. Aenean leo ligul porttitoeu
                consequat vitae eleifend acenim
              </p>
              <div className='flex items-center gap-7'>
                <span className='text-5xl bg-gradient-to-r from-orange-500 to-red-500 p-5 rounded-lg '>
                  <FaHeadphones />
                </span>
                <div className='mb-5 text-base text-body-color'>
                  <span className='text-2xl font-bold mb-2'>24/7 Support</span>
                  <p>
                    Please don't hesitate to contact us if you have any
                    questions and we will get back to you within 24 Hours!
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-7 mt-5'>
                <span className='text-5xl bg-gradient-to-r from-orange-500 to-red-500 p-5 rounded-lg '>
                  <FaRocket />
                </span>
                <div className='mb-5 text-base text-body-color'>
                  <span className='text-2xl font-bold mb-2'>
                    COMODO Ssl Security
                  </span>
                  <p>
                    Our website is using Comodo SSL Security encryption and that
                    confirms that the presented content is legitimate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
