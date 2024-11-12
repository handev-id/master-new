"use client";

import HidedPassword from "@/components/HidedPassword";
import Loading from "@/components/Loading";
import { useUserStore } from "@/lib/zustand";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Data = () => {
  const { user } = useUserStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const { refresh } = useRouter();

  useEffect(() => {
    if (user) {
      setUsername(user?.username);
      setEmail(user?.email);
      setPhoneNumber(user?.phoneNumber);
      setCountry(user?.country || "");
    }
  }, [user]);

  const { data, isPending, mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch("/api/user/update/" + user?.id, {
        username,
        email,
        phoneNumber,
        country,
      });
      if (data?.success) {
        toast.success("Profile Updated!");
        refresh();
        return;
      }
      toast.error(data?.message);
      return data;
    },
  });

  return (
    <div className='bg-[#1f1f1f] p-4 rounded-lg shadow-xl shadow-[#A1A1A1]/15'>
      {isPending && <Loading />}
      <form className='flex w-full flex-col gap-5'>
        <h3 className='text-2xl text-white py-3 border-b border-white/35'>
          Profile Data
        </h3>
        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='Enter your username'
            className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
            required
          />
        </div>

        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Email Address</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            type='email'
            className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
            required
          />
        </div>
        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Phone Number</p>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='Enter your phone number'
            type='number'
            className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
            required
          />
        </div>

        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Country</p>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Enter your country'
            type='text'
            className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
            required
          />
        </div>
        <button
          onClick={() => {
            const confUpdate = confirm("Are you sure you want to update?");
            if (!confUpdate) {
              return null;
            }
            mutate();
          }}
          disabled={isPending}
          type='button'
          className='p-3 rounded hover:bg-[#279d80] mt-5 bg-[#00CC99] text-white w-full sm:w-[30%]'
        >
          Update
        </button>
      </form>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className='flex w-full mt-10 items-center p-2 text-white/70 hover:text-white rounded-lg group hover:bg-white/10'
      >
        <svg
          className='flex-shrink-0 w-5 h-5 transition duration-75 transform rotate-180'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 18 16'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3'
          />
        </svg>
        <span className='ms-5 whitespace-nowrap'>Log Out</span>
      </button>
    </div>
  );
};

export const Password = () => {
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
