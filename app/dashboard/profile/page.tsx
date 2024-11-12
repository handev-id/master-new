import React from "react";
import { Data, Password } from "../components/Profiles";

const ProfilePage = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-6'>
      <div className='w-full xl:w-[70%]'>
        <Data />
      </div>
      <div className='w-full xl:w-[30%]'>
        <Password />
      </div>
    </div>
  );
};

export default ProfilePage;
