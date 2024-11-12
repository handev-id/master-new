"use client";
import Loading from "@/components/Loading";
import { useUserStore } from "@/lib/zustand";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const InvestCard = () => {
  const { user } = useUserStore();
  const [load, setLoad] = useState(false);
  const [amount, setAmount] = useState("");
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [amount3, setAmount3] = useState("");

  function getValue(index: number) {
    if (index === 0) {
      return amount;
    }
    if (index === 1) {
      return amount1;
    }
    if (index === 2) {
      return amount2;
    }
    if (index === 3) {
      return amount3;
    }
  }

  function getOnchage(index: number, e: ChangeEvent<HTMLInputElement>) {
    if (index === 0) {
      return setAmount(e.target.value);
    }
    if (index === 1) {
      return setAmount1(e.target.value);
    }
    if (index === 2) {
      return setAmount2(e.target.value);
    }
    if (index === 3) {
      return setAmount3(e.target.value);
    }
  }

  const createInvesment = async (
    level: string,
    minAmount: number,
    maxAmount: number,
    idx: number
  ) => {
    const realAmount =
      idx === 0 ? amount : idx === 1 ? amount1 : idx === 2 ? amount2 : amount3;

    if (parseInt(realAmount) > user?.balance!) {
      toast.error("Insufficient balance");
      return;
    }

    if (parseInt(realAmount) < minAmount) {
      toast.error(`Min amount is ${minAmount}`);
      return;
    }

    if (parseInt(realAmount) > maxAmount) {
      toast.error(`Max amount is ${maxAmount}`);
      return;
    }

    setLoad(true);
    const { data } = await axios.post("/api/invesment", {
      level,
      username: user?.username,
      amount: parseInt(realAmount),
    });

    if (data?.success) {
      toast.success("Invesment Success");
      window.location.reload();
      return;
    }
    toast.error(data?.message);
    setLoad(false);
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>
      {load && <Loading />}
      {InvesmentCartsData.map((invest, index: number) => (
        <form
          key={index}
          className='flex bg-[#1f1f1f] shadow-lg py-10 border border-white/15 shadow-[#A1A1A1]/15 rounded-lg gap-3 flex-col justify-center items-center'
        >
          <h3 className='text-xl font-bold text-blue-500'>{invest.level}</h3>
          <ul className='text-white opacity-70 my-6 text-sm'>
            <li>Min Amount: ${invest.minAmount}</li>
            <li>Max Amount: ${invest.maxAmpunt}</li>
            <li>Profit: {invest.profit}</li>
            <li>Contract: {invest.contract}</li>
          </ul>
          <div className='p-2.5 w-[90%] mt-5 rounded-md flex border outline-none bg-[#1f1f1f] border-white/35'>
            <h3 className='pr-2 border-r text-white border-white/35'>USD</h3>
            <input
              key={index}
              type='number'
              onChange={(e) => getOnchage(index, e)}
              placeholder='Amount'
              className='disabled:opacity-50 text-white w-full px-2 rounded-md flex outline-none bg-[#1f1f1f]'
              required
              value={getValue(index)}
            />
          </div>
          <button
            onClick={() =>
              createInvesment(
                invest.level,
                invest.minAmount,
                invest.maxAmpunt,
                index
              )
            }
            type='button'
            className='bg-[#00CC99] w-[90%] text-white py-2 rounded-full hover:bg-[#30ad8e]'
          >
            INVEST NOW
          </button>
        </form>
      ))}
    </div>
  );
};

export default InvestCard;

const InvesmentCartsData = [
  {
    level: "BASIC",
    minAmount: 50,
    maxAmpunt: 100,
    profit: "10% (Daily)",
    contract: "30Day",
  },
  {
    level: "SILVER",
    minAmount: 100,
    maxAmpunt: 1000,
    profit: "20% (Daily)",
    contract: "30Day",
  },
  {
    level: "GOLD",
    minAmount: 500,
    maxAmpunt: 10000,
    profit: "30% (Daily)",
    contract: "30Day",
  },
  {
    level: "PLATINUM",
    minAmount: 1000,
    maxAmpunt: 100000,
    profit: "40% (Daily)",
    contract: "30Day",
  },
];
