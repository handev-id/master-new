"use client";
import HidedPassword from "@/components/HidedPassword";
import Loading from "@/components/Loading";
import { useUserStore } from "@/lib/zustand";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Password = () => {
  const { user } = useUserStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { refresh } = useRouter();

  const { data, isPending, mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(
        "/api/user/update-password/" + user?.id,
        {
          password,
        }
      );
      if (data?.success) {
        toast.success("Password Updated!");
        refresh();
        return;
      }
      toast.error(data?.message);
      return data;
    },
  });

  const [hide1, setHide1] = useState(true);
  const [hide2, setHide2] = useState(true);
  const [hide3, setHide3] = useState(true);

  return (
    <div className='bg-[#1f1f1f] p-4 rounded-lg shadow-xl shadow-[#A1A1A1]/15'>
      {isPending && <Loading />}
      <form className='flex w-full flex-col gap-5'>
        <h3 className='text-2xl text-white py-3 border-b border-white/35'>
          Update Password
        </h3>
        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Current Password</p>
          <HidedPassword isHide={hide1} onClick={() => setHide1(!hide1)}>
            <input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type={hide1 ? "password" : "text"}
              placeholder='Enter your current password'
              className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
              required
            />
          </HidedPassword>
        </div>
        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Update Password</p>
          <HidedPassword isHide={hide2} onClick={() => setHide2(!hide2)}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={hide2 ? "password" : "text"}
              placeholder='Enter update password'
              className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
              required
            />
          </HidedPassword>
        </div>

        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Confirm Update Password</p>
          <HidedPassword isHide={hide3} onClick={() => setHide3(!hide3)}>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Enter your confirm update password'
              type={hide3 ? "password" : "text"}
              className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
              required
            />
          </HidedPassword>
        </div>
        <button
          onClick={() => {
            const confUpdate = confirm("Are you sure you want to update?");
            if (!confUpdate) {
              return null;
            }
            if (currentPassword !== user?.password) {
              toast.error("Current password is not correct");
              return null;
            }

            if (password !== confirmPassword) {
              toast.error("Password does not match");
              return null;
            }
            mutate();
          }}
          type='button'
          className='p-3 rounded hover:bg-[#279d80] mt-5 bg-[#00CC99] text-white w-full sm:w-[30%]'
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Password;
