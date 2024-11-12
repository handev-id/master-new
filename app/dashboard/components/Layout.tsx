import React from "react";

const Layout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='bg-[#1f1f1f] flex w-full p-4 rounded-lg shadow-xl max-lg:overflow-x-scroll shadow-[#A1A1A1]/15'>
      <div className='flex w-full flex-col gap-5'>
        <h3 className='text-2xl text-white py-3 border-b border-white/35'>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};

export default Layout;
