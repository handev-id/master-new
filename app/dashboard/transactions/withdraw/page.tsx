"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUserStore } from "@/lib/zustand";
import Loading from "@/components/Loading";

const WithdrawPage = () => {
  const { user } = useUserStore();
  const [isPendingTrans, setIsPendingTrans] = useState(false);
  const { handleSubmit, register } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (withdrawdata) => {
      const { data } = await axios.post("/api/transactions/withdraw", {
        withdrawdata,
      });

      if (data?.success) {
        localStorage.setItem("newTransactionId-ms", data?.result?.id);
        const newTransactionId = localStorage.getItem("newTransactionId-ms");
        if (newTransactionId) {
          toast.success("Withdraw is process");
          window.location.href = "/dashboard/transactions/history";
        }
        return data;
      }
    },
  });

  const onWithdraw = (data: any) => {
    const amount = parseInt(data?.amount);
    if (user?.balance! < amount) {
      toast.error("your balance is low");
      return null;
    }
    if (data?.amount?.includes("-") || data?.amount === "") {
      toast.error("Amount is not a valid number");
      return null;
    }

    if (isPendingTrans) {
      toast.error("Please wait for the transaction to complete");
      return null;
    }
    const withdrawdata: any = {
      amount: amount,
      ...data,
      username: user?.username,
    };
    mutate({ ...withdrawdata });
  };

  useEffect(() => {
    const newTransactionId = localStorage.getItem("newTransactionId-ms");

    if (newTransactionId) {
      const getNewTransaction = async () => {
        const { data } = await axios.get(
          "/api/transactions/check-status/" + newTransactionId
        );
        if (data?.result?.status === false) {
          setIsPendingTrans(true);
        }
      };
      getNewTransaction();
    }
  }, []);

  return (
    <Layout title='Withdraw Transaction'>
      {isPending && <Loading />}
      <form
        onSubmit={handleSubmit(onWithdraw)}
        className='flex w-full flex-col gap-5'
      >
        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Amount</p>
          <input
            {...register("amount")}
            placeholder='Enter your Amount'
            className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
            required
            type='number'
          />
        </div>
        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Country</p>
          <input
            {...register("country")}
            placeholder='Enter your country'
            className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
            required
          />
        </div>
        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Bank Name</p>
          <input
            {...register("bankName")}
            placeholder='Enter your bank'
            className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
            required
          />
        </div>
        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Acc Name</p>
          <input
            {...register("accName")}
            placeholder='Enter your Acc Name'
            className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
            required
          />
        </div>
        <div className='text-white flex flex-col gap-2 w-full'>
          <p>Acc Number</p>
          <input
            {...register("accNumber")}
            placeholder='Enter your Acc Number'
            className='rounded-md p-2.5 w-full flex border outline-none bg-[#1f1f1f] border-white/35'
            required
          />
        </div>
        <button
          type='submit'
          className='p-3 rounded hover:bg-[#279d80] mt-5 bg-[#00CC99] text-white w-full sm:w-[30%]'
        >
          Confirm
        </button>
      </form>
    </Layout>
  );
};

export default WithdrawPage;
