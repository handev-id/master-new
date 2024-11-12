import { useEffect, useState } from "react";
import axios from "axios";
import { useUploadCard, useUploadFace } from "@/lib/zustand";
import Loading from "@/components/Loading";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa6";

export const UploadCard = () => {
  const [file, setFile] = useState<any>(null);
  const { setImgUrl, imgUrl, setIsUpload } = useUploadCard();
  const [IsLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "byanquy0");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/doxxfay9h/image/upload`,
        formData
      );
      if (response.status === 200) {
        setIsUpload(true);
        setImgUrl(response.data.secure_url);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (file) {
      handleSubmit();
    }
  }, [file]);

  return (
    <div className='text-white'>
      {IsLoading && <Loading />}
      <div>
        <h2 className='text-xl'>identity card</h2>
        <div className='w-[250px] border overflow-hidden border-white/40 h-[142px] rounded-lg my-3'>
          {imgUrl ? (
            <img
              src={imgUrl || ""}
              alt='card'
              className='w-full object-contain'
            />
          ) : (
            <div className='text-white/70 text-5xl m-3'>
              <FaRegAddressCard />
            </div>
          )}
        </div>
        <input
          type='file'
          onChange={handleFileChange}
          className='border text-xs rounded border-slate-500'
        />
      </div>
      {IsLoading && "Loading..."}
    </div>
  );
};

export const UploadPersons = () => {
  const [file, setFile] = useState<any>(null);
  const { setImgUrl, imgUrl, setIsUpload } = useUploadFace();
  const [IsLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "byanquy0");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/doxxfay9h/image/upload`,
        formData
      );
      if (response.status === 200) {
        setIsUpload(true);
        setImgUrl(response.data.secure_url);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (file) {
      handleSubmit();
    }
  }, [file]);

  return (
    <div className='text-white'>
      {IsLoading && <Loading />}
      <div>
        <h2 className='text-xl'>Selfie</h2>
        <div className='w-[250px] border overflow-hidden border-white/40 rounded-lg my-3'>
          {imgUrl ? (
            <img
              src={imgUrl || ""}
              alt='card'
              className='w-full object-contain'
            />
          ) : (
            <div className='text-white/70 text-5xl m-3'>
              <BsPersonBoundingBox />
            </div>
          )}
        </div>
        <input
          type='file'
          onChange={handleFileChange}
          className='border text-xs rounded border-slate-500'
        />
      </div>
      {IsLoading && "Loading..."}
    </div>
  );
};
