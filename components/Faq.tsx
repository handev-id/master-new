import React from "react";
import DropdownFaq from "./DropdownFaq";

const Faq = () => {
  return (
    <div id='faq' className='gap-4 flex flex-col text-white text-center py-16'>
      <span className='text-lg text-blue-500'>FAQ</span>
      <h2 className='font-bold text-4xl lg:text-5xl'>
        Frequently Asked Questions
      </h2>
      <p>please check our FAQ if you have any questions before contacting us</p>
      <div className='mt-10'>
        <DropdownFaq />
      </div>
    </div>
  );
};

export default Faq;
