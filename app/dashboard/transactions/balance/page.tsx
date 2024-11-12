import React from "react";
import { BuyBalance } from "../../components/Balances";
import prisma from "@/lib/prisma";
import Layout from "../../components/Layout";

const BalancePage = async () => {
  const paymentMethod = await prisma.paymentsMethod.findMany();

  return (
    <div className='flex w-full flex-col xl:flex-row gap-6'>
      <div className='w-full flex flex-col gap-5'>
        <BuyBalance />
        <Layout title='Payment Method'>
          <div className='flex flex-col text-white/60'>
            {paymentMethod.map((pay) => (
              <div
                key={pay.id}
                className='grid grid-cols-2 items-center lg:px-10 py-2 border-t border-white/35'
              >
                <img
                  src={pay.image}
                  alt='logo payment method'
                  className='w-[100px] lg:w-[150px] object-contain'
                />
                <div className='w-full max-md:text-sm'>
                  {pay.bankName} <br />
                  Acc Name: {pay.rekeningName} <br />
                  Acc Number: {pay.noRekening}
                </div>
              </div>
            ))}
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default BalancePage;
