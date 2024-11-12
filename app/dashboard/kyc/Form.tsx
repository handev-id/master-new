"use client";
import React from "react";
import Layout from "../components/Layout";
import { FaIdCardAlt, FaMapMarkerAlt } from "react-icons/fa";
import { UploadCard, UploadPersons } from "../components/UploadKyc";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUploadCard, useUploadFace, useUserStore } from "@/lib/zustand";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

type KycType = {
  username: string;
  fullname: string;
  cardImage: string;
  faceImage: string;
  address: string;
};

const KycForm = ({ isVerified }: { isVerified: boolean | undefined }) => {
  const { user } = useUserStore();
  const { handleSubmit, register } = useForm<KycType>();

  const { imgUrl: cardImg } = useUploadCard();
  const { imgUrl: faceImg } = useUploadFace();

  const { mutate, isPending } = useMutation({
    mutationKey: ["KYC"],
    mutationFn: async (kycData: KycType) => {
      const res = await axios.post("/api/kyc/create", {
        username: user?.username,
        fullname: kycData.fullname,
        address: kycData.address,
        cardImage: cardImg,
        faceImage: faceImg,
      });
      const data = res.data;
      if (data?.success) {
        toast.success(data?.message);
        window.location.reload();
      } else {
        toast.error(data?.message);
      }
      return data;
    },
  });

  const onCreateKyc: SubmitHandler<KycType> = (data) => {
    mutate(data);
  };

  return (
    <div className='flex lg:flex-row flex-col gap-5'>
      {isPending && <Loading />}
      <div className='w-full lg:w-[80%]'>
        <Layout title='Send Verification'>
          {isVerified === undefined ? (
            <form
              onSubmit={handleSubmit(onCreateKyc)}
              className='flex flex-col'
            >
              <div className='p-2.5 w-full mb-4 rounded-md flex border outline-none bg-[#1f1f1f] border-white/35'>
                <div className='text-2xl pr-3 border-white/35 border-r text-white/70'>
                  <FaIdCardAlt />
                </div>
                <input
                  {...register("fullname")}
                  required
                  placeholder='Full Name'
                  className='disabled:opacity-50 w-full px-2 text-white rounded-md flex outline-none bg-[#1f1f1f]'
                />
              </div>
              <div className='p-2.5 w-full rounded-md flex border outline-none bg-[#1f1f1f] border-white/35'>
                <div className='text-2xl pr-3 border-white/35 border-r text-white/70'>
                  <FaMapMarkerAlt />
                </div>
                <input
                  {...register("address")}
                  required
                  placeholder='Address'
                  className='disabled:opacity-50 w-full px-2 text-white rounded-md flex outline-none bg-[#1f1f1f]'
                />
              </div>
              <div className='my-4 p-3 rounded-lg border border-white/35'>
                <UploadCard />
              </div>
              <div className='mb-4 p-3 rounded-lg border border-white/35'>
                <UploadPersons />
              </div>
              <button className='bg-green-500 w-[30%] lg:w-[10%] ml-auto mt-3 hover:bg-green-600 rounded-md text-white p-2.5 text-xs lg:text-sm font-bold uppercase'>
                Submit
              </button>
            </form>
          ) : isVerified === false ? (
            <p className='text-white bg-blue-500 p-3 rounded-lg'>
              You have sent verification, please wait, we will process your
              verification as soon as possible.
            </p>
          ) : (
            <h1 className='text-white bg-green-500 p-3 rounded-lg'>
              Your Account Is Verified
            </h1>
          )}
        </Layout>
      </div>
      <div className='w-full lg:w-[20%]'>
        <Layout title='Status'>
          {!isVerified ? (
            <div>
              <img
                src='/unverified.png'
                className='w-[120px] m-auto'
                alt='unverif'
              />
              <h3 className='text-xl font-bold uppercase text-center text-white'>
                unverified
              </h3>
            </div>
          ) : (
            <div>
              <img
                src='/verified.png'
                className='w-[120px] m-auto'
                alt='verif'
              />
              <h3 className='text-xl font-bold uppercase text-center text-white'>
                verified
              </h3>
            </div>
          )}
        </Layout>
      </div>
    </div>
  );
};

export default KycForm;
