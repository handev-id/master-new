"use client";

import { useState } from "react";
import Layout from "../components/Layout";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "@/lib/zustand";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

const TradePage = () => {
  const { user } = useUserStore();
  const [amount, setAmount] = useState("10");

  const [selectedValue, setSelectedValue] = useState("");

  // Fungsi untuk menangani perubahan nilai select
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const { isPending, data, mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/trade", {
        username: user?.username,
        amount: parseInt(amount),
        rateStake: "0.1",
        rateEnd: "0.2",
        time: selectedValue,
        category: "Buy",
      });

      console.log(data);

      if (data?.success) {
        toast.success(data?.message);
        window.location.reload();
        return;
      }
    },
  });

  return (
    <div>
      {isPending && <Loading />}
      <Layout title='BTC/USD'>
        <iframe
          src='https://lighthearted-narwhal-80283a.netlify.app/'
          width={"100%"}
          height={"400px"}
          scrolling={"no"}
        ></iframe>
        <div className='my-5 flex text-white gap-5 pb-[100px] flex-wrap'>
          <div className='p-2.5 w-full rounded-md flex border outline-none bg-[#1f1f1f] border-white/35'>
            <h3 className='pr-2 border-r border-white/35'>USD</h3>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Enter amount min $10'
              className='disabled:opacity-50 w-full px-2 rounded-md flex outline-none bg-[#1f1f1f]'
            />
          </div>
          <select
            required
            value={selectedValue}
            onChange={handleSelectChange}
            className='border p-2 w-full bg-[#1f1f1f] rounded-lg'
          >
            <option value='' disabled>
              Time
            </option>
            <option value='30 SECONDS'>30 SECONDS</option>
            <option value='10 Minutes'>10 Minutes</option>
            <option value='1 Hour'>1 Hour</option>
            <option value='4 Hours'>4 Hours</option>
            <option value='1 Day'>1 Day</option>
            <option value='1 Week'>1 Week</option>
            <option value='1 Month'>1 Month</option>
          </select>
          <button
            onClick={() => {
              if (Number(user?.balance) < Number(amount)) {
                toast.error("Insufficient balance");
                return;
              }
              mutate();
            }}
            className='bg-green-500 p-3 w-[100px] rounded-lg text-white'
          >
            Buy 180%
          </button>
          <button className='bg-red-500 p-3 w-[100px] rounded-lg text-white'>
            Sell 180%
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default TradePage;
