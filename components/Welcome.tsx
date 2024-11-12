import React from "react";
import { FaHeadphones, FaMoneyBillWave, FaRocket } from "react-icons/fa6";
import { RiSecurePaymentFill } from "react-icons/ri";

const Welcome = () => {
  return (
    <div
      id="why"
      className="flex flex-col gap-4 text-center py-10 lg:py-16 text-white"
    >
      <h1 className="text-4xl lg:text-4xl font-bold">Why choose PENTAHEX</h1>
      <p>
        PENTAHEX is an investment or stock trading company that was founded in
        2009 and is present in almost all countries in the world.
      </p>
      <p>
        Apart from forex and crypto trading, we also offer the most profitable
        and reliable investment contracts providing daily payouts on all
        investment packages.
      </p>
      <p>
        As one of the largest companies in the world, of course FBS has official
        legality even from various organizations, especially those engaged in
        supervision or in the economic field.
      </p>
      <div className="grid grid-cols-1 items-center justify-center text-center mt-6 gap-6">
        <div className="flex gap-7 flex-col">
          <span className="flex items-center justify-between w-full lg:w-[30%] mx-auto text-4xl lg:text-5xl bg-gradient-to-r from-orange-500 to-red-500 p-5 rounded-lg">
            <FaHeadphones />
            <span className="text-xl lg:text-2xl font-bold mb-2">
              Professional Team
            </span>
          </span>
          <div className="mb-5 text-base text-body-color">
            <p>
              We are team of professional traders dealing in Bitcoin & other
              crypto currencies, who know the magic of profitable trading.
            </p>
          </div>
        </div>
        <div className="flex gap-7 flex-col">
          <span className="flex items-center justify-between w-full lg:w-[30%] mx-auto text-4xl lg:text-5xl bg-gradient-to-r from-blue-500 to-sky-500 p-5 rounded-lg">
            <FaRocket />
            <span className="text-xl lg:text-2xl font-bold mb-2">
              Comodo SSL
            </span>
          </span>
          <div className="mb-5 text-base text-body-color">
            <p>
              Our website is using Comodo SSL Security encryption and that
              confirms that the presented content is legitimate.
            </p>
          </div>
        </div>
        <div className="flex gap-7 flex-col">
          <span className="flex items-center justify-between w-full lg:w-[30%] mx-auto text-4xl lg:text-5xl bg-gradient-to-r from-green-400 to-green-600 p-5 rounded-lg">
            <RiSecurePaymentFill />
            <span className="text-xl lg:text-2xl font-bold mb-2">
              Registered Company
            </span>
          </span>
          <div className="mb-5 text-base text-body-color">
            <p>
              We are a legal company registered, providing its investment
              services to the members all around the world.
            </p>
          </div>
        </div>
        <div className="flex gap-7 flex-col">
          <span className="flex items-center justify-between w-full lg:w-[30%] mx-auto text-4xl lg:text-5xl bg-gradient-to-r from-orange-500 to-yellow-500 p-5 rounded-lg">
            <FaMoneyBillWave />
            <span className="text-xl lg:text-2xl font-bold mb-2">
              Quick Withdrawal
            </span>
          </span>
          <div className="mb-5 text-base text-body-color">
            <p>
              Get your payment instantly as soon as you request it ! No waiting
              for your payments ! Every payment is Instant !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
