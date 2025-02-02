import create from "zustand";

// Definisikan tipe untuk data user
interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  balance: number;
  password: string;
  country: string;
  bankName: string;
  rekeningName: string;
  rekeningNumber: string;
  reffCode: string;
  avatar?: string;
}

interface UploadType {
  isUpload: boolean;
  setIsUpload: (value: boolean) => void;
  imgUrl: null | string;
  setImgUrl: (url: string | undefined) => void;
}

interface UploadVideoType {
  isUploaded: boolean;
  setIsUploaded: (value: boolean) => void;
  videoUrl: null | string;
  setVideoUrl: (url: string | undefined) => void;
}

export const useUploadVideo = create<UploadVideoType>((set) => ({
  isUploaded: false,
  videoUrl: null,
  setIsUploaded(value) {
    set(() => ({ isUploaded: value }));
  },
  setVideoUrl(url) {
    set(() => ({ videoUrl: url }));
  },
}));

export const useUpload = create<UploadType>((set) => ({
  isUpload: false,
  imgUrl: null,
  setIsUpload(value) {
    set((state) => ({ isUpload: value }));
  },
  setImgUrl(url) {
    set((state) => ({ imgUrl: url }));
  },
}));

export const useUploadCard = create<UploadType>((set) => ({
  isUpload: false,
  imgUrl: null,
  setIsUpload(value) {
    set((state) => ({ isUpload: value }));
  },
  setImgUrl(url) {
    set((state) => ({ imgUrl: url }));
  },
}));

export const useUploadFace = create<UploadType>((set) => ({
  isUpload: false,
  imgUrl: null,
  setIsUpload(value) {
    set((state) => ({ isUpload: value }));
  },
  setImgUrl(url) {
    set((state) => ({ imgUrl: url }));
  },
}));

// Definisikan tipe untuk state dan action
type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

// Membuat Zustand store dengan tipe yang telah ditentukan
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
