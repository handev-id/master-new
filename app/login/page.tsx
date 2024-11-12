import { Metadata } from "next";
import React from "react";
import LoginForm from "../../components/LoginForm";

export const metadata: Metadata = {
  title: "Login - PENTAHEX",
  description: "Login to Suruhanjaaya Master Binary",
};
const LoginPage = () => {
  return (
    <section className="bg-[url('/bg-auth.jpg')] bg-no-repeat bg-cover py-[70px] h-screen">
      <div className="flex flex-col items-center justify-center h-full bg-[#000]/40 px-6 mx-auto lg:py-0">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
