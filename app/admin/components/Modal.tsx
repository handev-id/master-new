"use client";
import Link from "next/link";
import { FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp, IoMdClose } from "react-icons/io";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";

interface UserProps {
  id: string;
  username: string;
  reffCode: string;
  bonus: number;
  profits: number;
  date: string;
  country: string | null;
  refferers: Array<string>;
  reffer: string | null;
}

const Modal: React.FC<UserProps> = ({
  country,
  username,
  reffCode,
  date,
  id,
  refferers,
  reffer,
  bonus,
  profits,
}) => {
  const [getReffer, setGetreffer] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getReffer = async () => {
      const { data } = await axios.get(`/api/user/find/${reffer}`);
      setGetreffer(data?.result?.username);
    };
    getReffer();
  }, []);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className='p-1 text-sm bg-blue-500 rounded-md uppercase cursor-pointer hover:bg-blue-400 font-bold text-center'
      >
        Detail
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
            <h2 className='text-lg lg:text-2xl font-bold uppercase py-5 border-b border-slate-400 text-center'>
              User {username}
            </h2>
            <div className='p-3 flex flex-col gap-3'>
              <p className='text-white text-sm sm:text-base'>
                Daftar Pada: {date}
              </p>
              <p className='text-white text-sm sm:text-base'>
                RefferalCode: {reffCode}
              </p>
              <p className='text-white text-sm sm:text-base'>
                Bonus: ${bonus ? bonus : "0"}
              </p>
              <p className='text-white text-sm sm:text-base'>
                Profits: ${profits ? profits : "0"}
              </p>
              <p className='text-white text-sm sm:text-base'>
                Country: {country ? country : "-"}
              </p>
              <div className='text-white text-sm sm:text-base'>
                Mengundang:{" "}
                {refferers.map((reff, idx) => (
                  <li key={idx} className='list-disc'>
                    {reff}
                  </li>
                ))}
                {refferers.length === 0 && "-"}
              </div>
              <p className='text-white'>
                DI Undang Oleh: {getReffer ? getReffer : "-"}
              </p>
              <div className='w-[25%]'>
                <DeleteUser id={id} username={username} />
              </div>
            </div>
            <div className='flex gap-5 mt-5 flex-col p-2'>
              <SendBonus username={username} />
              <SendProfits username={username} />
            </div>
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

export default Modal;

const DeleteUser = ({ id, username }: { id: string; username: string }) => {
  const [load, setLoad] = useState(false);

  const onDelete = async () => {
    const confDel = confirm("Yakin Akan Menghapus " + username + "?");
    if (!confDel) return null;

    const { data } = await axios.delete("/api/user/delete/" + id);
    setLoad(true);
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

const SendBonus = ({ username }: { username: string }) => {
  const [load, setLoad] = useState(false);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  const onSendBonus = async () => {
    if (!amount) {
      toast.error("Amount is required");
      return null;
    }
    setLoad(true);
    const { data } = await axios.post("/api/user/bonus", {
      username,
      amount: parseInt(amount),
      desc,
    });
    if (data?.success) {
      toast.success(data?.message);
      window.location.reload();
    } else {
      toast.error(data?.message);
      setLoad(false);
    }
  };

  return (
    <div>
      <div className='flex justify-end'>
        {load && <Loading />}
        <div className='p-2.5 w-full rounded-md flex border outline-none bg-[#1f1f1f] border-white/35'>
          <h3 className='pr-2 border-r text-xs lg:text-sm m-auto border-white/35'>
            USD
          </h3>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter Bonus min 1'
            className='disabled:opacity-50 w-full px-2 rounded-md text-xs lg:text-sm flex outline-none bg-[#1f1f1f]'
          />
        </div>
      </div>
      <div className='p-2.5 w-full rounded-md mt-3 flex border outline-none bg-[#1f1f1f] border-white/35'>
        <h3 className='pr-2 border-r text-xs lg:text-sm m-auto border-white/35'>
          DESC
        </h3>
        <input
          type='text'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder='Deskripsi Bonus'
          className='disabled:opacity-50 w-full px-2 rounded-md text-xs lg:text-sm flex outline-none bg-[#1f1f1f]'
        />
      </div>
      <div className='flex mt-3 justify-end'>
        <button
          onClick={onSendBonus}
          type='button'
          className='bg-green-500 ml-auto hover:bg-green-600 rounded-md text-white p-1.5 sm:p-2 text-xs lg:text-sm font-bold uppercase'
        >
          kirim
        </button>
      </div>
    </div>
  );
};

const SendProfits = ({ username }: { username: string }) => {
  const [load, setLoad] = useState(false);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  const onSendProfit = async () => {
    if (!amount) {
      toast.error("Amount is required");
      return null;
    }
    setLoad(true);
    const { data } = await axios.post("/api/user/profit", {
      username,
      amount: parseInt(amount),
      desc,
    });
    if (data?.success) {
      toast.success(data?.message);
      window.location.reload();
    } else {
      toast.error(data?.message);
      setLoad(false);
    }
  };
  return (
    <div>
      <div className='flex justify-end'>
        {load && <Loading />}
        <div className='p-2.5 w-full rounded-md flex border outline-none bg-[#1f1f1f] border-white/35'>
          <h3 className='pr-2 border-r text-xs lg:text-sm m-auto border-white/35'>
            USD
          </h3>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter Profits for user'
            className='disabled:opacity-50 w-full px-2 rounded-md text-xs lg:text-sm flex outline-none bg-[#1f1f1f]'
          />
        </div>
      </div>
      <div className='p-2.5 w-full rounded-md mt-3 flex border outline-none bg-[#1f1f1f] border-white/35'>
        <h3 className='pr-2 border-r text-xs lg:text-sm m-auto border-white/35'>
          DESC
        </h3>
        <input
          type='text'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder='Deskripsi Profit'
          className='disabled:opacity-50 w-full px-2 rounded-md text-xs lg:text-sm flex outline-none bg-[#1f1f1f]'
        />
      </div>
      <div className='flex mt-3 justify-end'>
        <button
          onClick={onSendProfit}
          type='button'
          className='bg-blue-500 ml-auto hover:bg-blue-600 rounded-md text-white p-1.5 sm:p-2 text-xs lg:text-sm font-bold uppercase'
        >
          kirim
        </button>
      </div>
    </div>
  );
};
