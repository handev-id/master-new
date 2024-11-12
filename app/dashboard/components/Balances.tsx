"use client";
import { useUpload, useUserStore } from "@/lib/zustand";
import Layout from "./Layout";
import UploadForm from "./UploadImage";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export const BuyBalance = () => {
  const { user } = useUserStore();
  const { imgUrl } = useUpload();
  const [amount, setAmount] = useState("");
  const [isPendingTrans, setIsPendingTrans] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/transactions/deposit", {
        username: user?.username,
        image: imgUrl,
        amount: parseInt(amount),
      });
      if (data?.success) {
        localStorage.setItem("newTransactionId-ms", data?.result?.id);
        const newTransactionId = localStorage.getItem("newTransactionId-ms");
        if (newTransactionId) {
          toast.success("Buy balance is process");
          window.location.href = "/dashboard/transactions/history";
          return;
        }
      }
      toast.error(data?.message);
      return data;
    },
  });

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
    <Layout title='Buy Balance'>
      {isPending && <Loading />}
      <form>
        <div className='text-white flex flex-col gap-2 w-full'>
          {isPendingTrans && (
            <div className='p-2 text-sm bg-red-500 text-white rounded-lg'>
              You still have a transaction pending status. Wait until the
              transaction is processed in order to be able to buy USD balance
              again. Check History
            </div>
          )}
          <p className='text-sm'>Amount</p>
          <div className='p-2.5 w-full rounded-md flex border outline-none bg-[#1f1f1f] border-white/35'>
            <h3 className='pr-2 border-r border-white/35'>USD</h3>
            <input
              disabled={isPendingTrans}
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Enter amount min $10'
              className='disabled:opacity-50 w-full px-2 rounded-md flex outline-none bg-[#1f1f1f]'
            />
          </div>
          <div className='my-3'>
            payment screenshot:
            <UploadForm isPending={isPendingTrans} />
          </div>
          <button
            onClick={() => {
              if (amount.includes("-") || amount === "") {
                toast.error("Amount is not a valid number");
                return null;
              }

              if (isPendingTrans) {
                toast.error("Please wait for the transaction to complete");
                return null;
              }
              mutate();
            }}
            type='button'
            className='p-3 rounded hover:bg-[#279d80] mt-5 bg-[#00CC99] text-white w-[20%] max-lg:w-full'
          >
            Add Balance
          </button>
        </div>
      </form>
    </Layout>
  );
};

// export const HistoryBalance = ({}) => {
//   const [deposit, setDeposit]
//   return (
//     <Layout title='History'>
//       <table className='min-w-full text-white/60 rounded my-6'>
//         <thead>
//           <tr className='border-b'>
//             <th className='text-left p-3 px-5'>Date</th>
//             <th className='text-left p-3 px-5'>Amount</th>
//             <th className='text-left p-3 px-5'>Pay</th>
//             <th className='text-left p-3 px-5'>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className='border-b'>
//             <td className='p-3 px-5'>1</td>
//             <td className='p-3 px-5'>John Doe</td>
//             <td className='p-3 px-5'>
//               30{" "}
//               <a
//                 href=''
//                 className='text-white bg-yellow-500 p-2 rounded text-sm'
//               >
//                 Payment
//               </a>
//             </td>
//             <td className='p-3 px-5'>Jakarta</td>
//           </tr>
//         </tbody>
//       </table>
//     </Layout>
//   );
// };
