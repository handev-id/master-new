import React from "react";

const Loading = () => {
  return (
    <div className='z-50 bg-black/40 flex justify-center items-center absolute top-0 left-0 w-full h-screen'>
      <div className='custom-loader'></div>
    </div>
  );
};

export default Loading;

export const SmallLoading = () => {
  return <div className='custom-loader-sm'></div>;
};
