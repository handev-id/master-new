"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

type PaymentMethode = {
  bankName: string;
  rekeningName: string;
  rekeningNumber: number;
};

export const AddPaymentsMethod = () => {
  const [load, setLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");

  // Fungsi untuk menangani perubahan nilai select
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const { handleSubmit, register } = useForm<PaymentMethode>();

  const onCreatePaymentMethod: SubmitHandler<PaymentMethode> = async (
    payData
  ) => {
    setLoad(true);
    const { data } = await axios.post("/api/pay", {
      rekeningName: payData.rekeningName,
      bankName: payData.bankName,
      rekeningNumber: payData.rekeningNumber,
      image: selectedValue,
    });
    console.log(data);

    if (data?.success) {
      toast.success(data?.message);
      window.location.reload();
      return;
    } else {
      toast.error(data?.message);
    }
    setLoad(false);
  };

  return (
    <>
      {load && <Loading />}
      <div
        onClick={() => setShowModal(true)}
        className='p-3 text-sm bg-blue-500 w-[50%] text-white xl:w-[20%] rounded-md uppercase cursor-pointer hover:bg-blue-400 font-bold text-center'
      >
        Add Payment Methode
      </div>
      {showModal && (
        <>
          <div className='w-[95%] lg:w-[600px] bg-[#1f1f1f] shadow-lg shadow-[#A1A1A1]/15 rounded-md z-50 shadow-3 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
            <div
              onClick={() => setShowModal(false)}
              className='absolute top-2 right-2 p-2 rounded-full cursor-pointer lg:text-xl bg-[#2F2F2F] hover:bg-[#1f1f1f]'
            >
              <IoMdClose />
            </div>
            <h2 className='text-lg lg:text-2xl font-bold uppercase py-5 text-white border-b border-slate-400 text-center'>
              Create Payment Methode
            </h2>
            <form
              onSubmit={handleSubmit(onCreatePaymentMethod)}
              className='p-3 flex flex-col text-white w-full gap-3'
            >
              <div>
                <p>Nama Bank</p>
                <input
                  {...register("bankName")}
                  required
                  type='text'
                  placeholder='Nama Bank'
                  className='p-3 border w-full bg-transparent mt-2 mb-5 border-white/30 rounded-md outline-none'
                />
              </div>
              <div>
                <p>Nama Rekening</p>
                <input
                  {...register("rekeningName")}
                  required
                  type='text'
                  placeholder='Nama Rekening'
                  className='p-3 border w-full bg-transparent mt-2 mb-5 border-white/30 rounded-md outline-none'
                />
              </div>
              <div>
                <p>No Rekening</p>
                <input
                  {...register("rekeningNumber")}
                  required
                  type='number'
                  placeholder='No rekening'
                  className='p-3 border w-full bg-transparent mt-2 mb-5 border-white/30 rounded-md outline-none'
                />
              </div>
              <label>Pilih Bank:</label>
          <select
                required
                value={selectedValue}
                onChange={handleSelectChange}
                className="border p-2 w-full bg-gray-700 rounded-lg"
              >
                <option value="" disabled>
                  Pilih Metode
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/maybank.png">
                  MAYBANK
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/download%20(4).png">
                  HSBC
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/download%20(3).png">
                  OCBC
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/cimb.png">
                  AM BANK
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/cimb.png">
                  CIMB GROUP
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/bankofamerica.jpg">
                  BANK OF AMERICA
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/bangkok.jpg">
                  BANGKOK BANK
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/abmb_logo.png">
                  ALLIANCE BANK
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/Public_Bank_Berhad_logo1.png">
                  PUBLIC BANK
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/Bank-Islam-LOGO_small.png">
                  BANK ISLAM
                </option>
                <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/AFFIN_BANK_Logo_Full_Colour.png">
                  AFFIN BANK
                </option>
              </select>
              <button className='p-3 text-sm bg-blue-500 ml-auto xl:w-[30%] text-white rounded-md uppercase cursor-pointer hover:bg-blue-400 font-bold text-center'>
                Submit
              </button>
            </form>
          </div>
          <div
            onClick={() => setShowModal(false)}
            className='bg-[#111]/60 fixed top-0 left-0 w-full h-full z-40'
          ></div>
        </>
      )}
    </>
  );
};

export const DeletePayMethode = ({ id }: { id: string }) => {
  const [load, setLoad] = useState(false);

  const onDelete = async () => {
    const confDel = confirm("Yakin Akan Menghapus ?");
    if (!confDel) return null;

    setLoad(true);
    const { data } = await axios.delete(`/api/pay/delete/${id}`);
    if (data?.success) {
      toast.success(data?.message);
      window.location.reload();
      return;
    } else {
      toast.error(data?.message);
    }
    setLoad(false);
  };

  return (
    <div>
      {load && <Loading />}
      <button
        onClick={onDelete}
        type='button'
        className='bg-red-500 hover:bg-red-600 rounded-md text-white p-2.5 text-xs lg:text-sm font-bold uppercase'
      >
        delete
      </button>
    </div>
  );
};
