import Link from "next/link";
import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - PENTAHEX",
  description: "Register to PENTAHEX",
};

const RegisterPage = () => {
  return (
    <section className="bg-[url('/bg-auth.jpg')] bg-no-repeat bg-cover py-[70px] h-full">
      <div className="flex flex-col items-center justify-center h-full bg-[#000]/40 px-6 mx-auto lg:py-0">
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
