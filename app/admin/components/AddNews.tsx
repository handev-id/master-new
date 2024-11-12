"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

type News = {
  title: string;
  desc: string;
};

export const AddNews = () => {
  const [load, setLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { handleSubmit, register } = useForm<News>();

  const onCreateNews: SubmitHandler<News> = async (newsData) => {
    setLoad(true);
    const { data } = await axios.post("/api/news/create", {
      title: newsData.title,
      desc: newsData.desc,
    });

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
        className='p-3 text-sm bg-blue-500 w-[30%] text-white xl:w-[10%] rounded-md uppercase cursor-pointer hover:bg-blue-400 font-bold text-center'
      >
        Add News
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
              Create News
            </h2>
            <form
              onSubmit={handleSubmit(onCreateNews)}
              className='p-3 flex flex-col text-white w-full gap-3'
            >
              <div>
                <p>Title</p>
                <input
                  {...register("title")}
                  required
                  type='text'
                  placeholder='Title'
                  className='p-3 border w-full bg-transparent mt-2 mb-5 border-white/30 rounded-md outline-none'
                />
              </div>
              <div>
                <p>Description</p>
                <textarea
                  {...register("desc")}
                  required
                  placeholder='Descriptions'
                  className='p-3 border w-full h-[100px] bg-transparent mt-2 mb-5 border-white/30 rounded-md outline-none'
                />
              </div>
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

export const DeleteNews = ({ id }: { id: string }) => {
  const [load, setLoad] = useState(false);

  const onDelete = async () => {
    const confDel = confirm("Yakin Akan Menghapus ?");
    if (!confDel) return null;

    setLoad(true);
    const { data } = await axios.delete(`/api/news/delete/${id}`);
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
