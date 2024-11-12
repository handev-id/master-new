"use client";
import React from "react";
import { BiArrowToTop } from "react-icons/bi";

const BackToTop = () => {
  return (
    <div
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      className='fixed p-2 text-3xl rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-70 hover:opacity-100 text-white bottom-5 right-5'
    >
      <BiArrowToTop />
    </div>
  );
};

export default BackToTop;
