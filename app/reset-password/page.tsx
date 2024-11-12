"use client";

import HidedPassword from "@/components/HidedPassword";
import { SmallLoading } from "@/components/Loading";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const id = useSearchParams().get("user");
  const [hide, setHide] = useState(false);
  const [err, setErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewpassword] = useState("");

  const handleReset = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const { data } = await axios.patch("/api/user/update-password/" + id, {
      password: newPassword,
    });

    if (data?.success) {
      toast.success("Password Updated");
      window.location.href = "/login";
    }
    setIsLoading(false);
    setErr(data?.message);
  };

  return (
    <section className="bg-[url('/bg-auth.jpg')] bg-no-repeat bg-cover py-[70px] h-screen">
      <div className="flex flex-col items-center justify-center h-full bg-[#000]/40 px-6 mx-auto lg:py-0">
        <div className="w-full bg-blue-600/70 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="flex flex-col items-center">
            <img
              className="rounded-full h-[100px] mx-auto w-[100px]"
              src="/logo.png"
              alt="logo"
            />
            <h1 className="text-xl font-bold text-white md:text-2xl">
              PENTAHEX
            </h1>
          </div>
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-white">
              Reset your Password
            </h1>
            <p className="my-3 text-sm text-center text-red-500">{err}</p>
            <form className="space-y-4 md:space-y-6" onSubmit={handleReset}>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  New Password
                </label>
                <HidedPassword isHide={hide} onClick={() => setHide(!hide)}>
                  <input
                    value={newPassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                    type={hide ? "password" : "text"}
                    name="identifier"
                    className="bg-black/30 border focus:outline-none focus:border-red-500 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:p-3 duration-200"
                    placeholder="Enter Username Or Email"
                    required
                  />
                </HidedPassword>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full disabled:bg-red-700 flex justify-center text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {isLoading ? <SmallLoading /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
