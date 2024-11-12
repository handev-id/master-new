"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateKyc = ({ id }: { id: string }) => {
  const [load, setLoad] = useState(false);
  const updateVerif = async () => {
    const confUpdate = confirm("Yakin Akan Mengupdate?");
    if (!confUpdate) return null;

    setLoad(true);
    const { data } = await axios.patch(`/api/kyc/update/${id}`);
    if (data?.success) {
      toast.success(data?.message);
      window.location.reload();
    } else {
      toast.error(data?.message);
    }
    setLoad(true);
  };

  return (
    <div>
      {load && <Loading />}
      <button
        onClick={updateVerif}
        className='p-2 rounded text-white text-sm uppercase bg-blue-500 hover:bg-blue-700'
      >
        Konfirmasi
      </button>
    </div>
  );
};

export default UpdateKyc;
