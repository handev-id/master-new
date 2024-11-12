"use client";

import Loading from "@/components/Loading";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const AccDeposit = ({
  id,
  balance,
  username,
}: {
  id: string;
  balance: number;
  username: string;
}) => {
  const [load, setLoad] = useState(false);

  const onAccDepo = async () => {
    const confUpdate = confirm("Yakin Akan Mengupdate?");
    if (!confUpdate) return null;

    setLoad(true);
    const { data } = await axios.patch(
      `/api/transactions/update/deposit/${username}`,
      {
        id,
        balance,
      }
    );

    if (data?.success) {
      toast.success(data?.message);
      window.location.reload();
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <div>
      {load && <Loading />}
      <button
        onClick={onAccDepo}
        type='button'
        className='p-2 lg:p-3 rounded-lg bg-blue-500 text-[10px] lg:text-sm font-bold hover:bg-blue-600 text-white uppercase'
      >
        Konfirmasi
      </button>
    </div>
  );
};
export const AccWithdraw = ({
  id,
  balance,
  username,
}: {
  id: string;
  balance: number;
  username: string;
}) => {
  const [load, setLoad] = useState(false);

  const onAccWith = async () => {
    const confUpdate = confirm("Yakin Akan Mengupdate?");
    if (!confUpdate) return null;

    setLoad(true);
    const { data } = await axios.patch(
      `/api/transactions/update/withdraw/${username}`,
      {
        id,
        balance,
      }
    );

    if (data?.success) {
      toast.success(data?.message);
      window.location.reload();
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <div>
      {load && <Loading />}
      <button
        onClick={onAccWith}
        type='button'
        className='p-2 lg:p-3 rounded-lg bg-blue-500 text-[10px] lg:text-sm font-bold hover:bg-blue-600 text-white uppercase'
      >
        Konfirmasi
      </button>
    </div>
  );
};
