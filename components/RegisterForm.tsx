"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading, { SmallLoading } from "./Loading";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import HidedPassword from "./HidedPassword";

interface UserType {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const RegisterForm = () => {
  const { handleSubmit, register } = useForm<UserType>();
  const [err, setErr] = useState("");
  const [hide, setHide] = useState(true);
  const router = useRouter();
  const invitationCode = useSearchParams().get("reff");

  const { isPending, mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (userData: UserType) => {
      const { data } = await axios.post("/api/register", {
        invitationCode,
        ...userData,
      });
      if (data?.status !== 201) {
        setErr(data?.message);
        return null;
      }

      router.push("/login");
      return data;
    },
  });

  const onRegister: SubmitHandler<UserType> = (userData) => {
    mutate(userData);
  };

  return (
    <div className="w-full bg-blue-600/70 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="flex flex-col items-center">
        <img
          className="rounded-full h-[100px] mx-auto w-[100px] object-contain"
          src="/logo.png"
          alt="logo"
        />
        <h1 className="text-xl font-bold text-white md:text-2xl">PENTAHEX</h1>
      </div>
      <div className="p-6 space-y-4 sm:p-8">
        <h1 className="text-lg font-bold leading-tight tracking-tight text-white">
          Create New account
        </h1>
        <p className="my-3 text-sm text-center text-red-500">{err}</p>
        <form
          onSubmit={handleSubmit(onRegister)}
          className="space-y-4 md:space-y-6"
          action="#"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className="bg-black/30 border focus:outline-none focus:border-red-500 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:p-3 duration-200"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your email
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              className="bg-black/30 border focus:outline-none focus:border-red-500 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:p-3 duration-200"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              type="number"
              placeholder="+6096 7865 4321"
              className="bg-black/30 border focus:outline-none focus:border-red-500 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:p-3 duration-200"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Password
            </label>
            <HidedPassword isHide={hide} onClick={() => setHide(!hide)}>
              <input
                {...register("password")}
                type={!hide ? "text" : "password"}
                placeholder="••••••••"
                className="bg-black/30 border focus:outline-none focus:border-red-500 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:p-3 duration-200"
                required
              />
            </HidedPassword>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border focus:outline-none focus:border-red-500 rounded bg-black/30"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-gray-300">
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 hover:underline"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full text-white flex justify-center disabled:bg-red-700 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isPending ? <SmallLoading /> : "Create an account"}
          </button>
          <p className="text-sm font-light text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
