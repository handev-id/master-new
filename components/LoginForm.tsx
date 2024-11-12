"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import HidedPassword from "./HidedPassword";
import { SmallLoading } from "./Loading";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [hide, setHide] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const username = e.currentTarget.identifier.value;
    const password = e.currentTarget.password.value;

    const res = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    console.log(res);

    if (res?.status === 200) {
      router.push("/dashboard");
    }

    if (res?.status === 401) {
      setErr("Wrong username or password");
      setIsLoading(false);
    }
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
          Log In to your account
        </h1>
        <p className="my-3 text-sm text-center text-red-500">{err}</p>
        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              name="identifier"
              className="bg-black/30 border focus:outline-none focus:border-red-500 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:p-3 duration-200"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Password
            </label>
            <HidedPassword isHide={hide} onClick={() => setHide(!hide)}>
              <input
                type={hide ? "password" : "text"}
                name="password"
                placeholder="••••••••"
                className="bg-black/30 border focus:outline-none focus:border-red-500 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:p-3 duration-200"
                required
              />
            </HidedPassword>
          </div>
          <div className="text-sm font-light text-gray-300">
            <a
              href="/forgot-password"
              className="font-medium text-primary-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full disabled:bg-red-700 flex justify-center text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? <SmallLoading /> : "Log In"}
          </button>
          <div className="text-sm font-light text-gray-300">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-primary-600 hover:underline"
            >
              Sign up here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
