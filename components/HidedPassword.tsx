import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const HidedPassword = ({
  children,
  isHide,
  onClick,
}: {
  children: React.ReactNode;
  isHide: boolean;
  onClick: () => void;
}) => {
  return (
    <div className='relative'>
      {children}
      <div
        onClick={onClick}
        className={`absolute cursor-pointer p-1 text-white text-xl opacity-60 top-1/2 right-2 -translate-y-1/2`}
      >
        {isHide ? <FaEye /> : <FaEyeSlash />}
      </div>
    </div>
  );
};

export default HidedPassword;
