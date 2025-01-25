import { useEffect, useState } from "react";
import axios from "axios";
import { useUploadVideo } from "@/lib/zustand";
import Loading from "@/components/Loading";
import { BsPersonVideo } from "react-icons/bs";

export const UploadVideo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { setVideoUrl, videoUrl, setIsUploaded } = useUploadVideo();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.type.startsWith("video/")) {
        setSelectedFile(file);
      } else {
        alert("Please select a valid video file.");
      }
    }
  };

  const uploadFile = async () => {
    setIsLoading(true);
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
      formData.append("upload_preset", "byanquy0");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/doxxfay9h/video/upload`,
          formData
        );
        if (response.status === 200) {
          setIsUploaded(true);
          setVideoUrl(response.data.secure_url);
        }
      } catch (error) {
        console.error(error);
        window.location.reload();
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadFile();
    }
  }, [selectedFile]);

  return (
    <div className="text-white">
      {isLoading && <Loading />}
      <div>
        <h2 className="text-xl flex items-center gap-2">
          <BsPersonVideo className="text-2xl" /> Upload Video
        </h2>
        <div className="w-[300px] border overflow-hidden border-white/40 rounded-lg my-3">
          {videoUrl ? (
            <video
              src={videoUrl || ""}
              controls
              className="w-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center text-white/70 text-5xl h-[200px]">
              <BsPersonVideo />
            </div>
          )}
        </div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Video File:
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>
    </div>
  );
};
