import Image from "next/image";
import Link from "next/link";
import React from "react";

const StartBlock = () => {
  return (
    <div id="home" className="mt-14 text-white py-20">
      <div className="grid grid-cols-1 max-lg:text-center lg:grid-cols-2 items-center ">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold">Get Your Profit.</h1>
          <p className="my-4 text-sm sm:text-base">
            Bursa Malaysia Bhs is online investment platform, specifically
            servicing the online investment community. We guarantee decent
            profits even to those members who have zero knowledge of currency
            trading.
          </p>
          <Link href={"/register"}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 lg:py-3 lg:px-5 rounded-full">
              Get Started
            </button>
          </Link>
        </div>
        <div className="ml-auto">
          <img src="/hero-img.png" alt="hero image" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-4 justify-center items-center">
        <img
          src={"/chart/chart (1).png"}
          alt={"chart"}
          className="lg:w-[50%] m-auto"
        />
        <img
          src={"/chart/chart.png"}
          alt={"chart"}
          className="lg:w-[70%] m-auto"
        />
        <img
          src={"/chart/chart (3).png"}
          alt={"chart"}
          className="lg:w-[50%] m-auto"
        />
        <img
          src={"/chart/chart (4).png"}
          alt={"chart"}
          className="lg:w-[50%] m-auto"
        />
      </div>
    </div>
  );
};

export default StartBlock;
