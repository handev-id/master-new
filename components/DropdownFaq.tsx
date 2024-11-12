"use client";
import React, { useState } from "react";

const DropdownFaq = () => {
  const [show, setShow] = useState(0);
  return (
    <>
      {Faqs.map((faq, index) => (
        <div
          key={index}
          className={
            show === index
              ? "w-full bg-gradient-to-t from-cyan-500 to-blue-600 lg:w-[700px] duration-300 overflow-hidden mx-auto text-white my-5"
              : "w-full bg-gray-700 lg:w-[700px] duration-300 overflow-hidden mx-auto text-white my-5"
          }
        >
          <div
            onClick={() => (index !== 0 ? setShow(index) : setShow(0))}
            className='text-xl font-bold p-3 cursor-pointer flex justify-between'
          >
            <h2>{faq.title}</h2>
            <h2>+</h2>
          </div>
          <div
            className={
              show === index
                ? "bg-white h-full duration-300 text-gray-900 p-3"
                : "hidden"
            }
          >
            {faq.desc}
          </div>
        </div>
      ))}
    </>
  );
};

export default DropdownFaq;

const Faqs = [
  {
    title: "How can I open a trading investment account?",
    desc: "You can open two types of accounts- Demo account and live account. Inthe demo account, you will get virtual money through with you can tradeand learn virtually. In live account first, you need to deposit funds totrade invest",
  },
  {
    title: "How to login to the trading investment platform?",
    desc: "Upon registering you will get a username and password through which you can log in into your account.",
  },
  {
    title: "Is any document required to open an account with Daxtradefx?",
    desc: "To open an account following documents will be required: –Identification proof like passport or driving license. - Residential proof",
  },
  {
    title: "How many accounts can I open?",
    desc: "Daxtradefx offers three base currencies in which you can trade invest. You can have multiple accounts for each base currency.",
  },
  {
    title: "What leverage is applied to my account?",
    desc: "Your account can have a maximum of 1:1000 leverage.",
  },
  {
    title: "What leverage is applied to my account?",
    desc: "Your account can have a maximum of 1:1000 leverage.",
  },
  {
    title: "How can I verify my account?",
    desc: "To verify your account, you need to submit a government-issued id and address proof.",
  },
  {
    title: "How can I open an account?",
    desc: "To open an account with Daxtradefx you need to provide us with some necessary information and submit some identification documents.",
  },
  {
    title: "How can I deposit funds into my account?",
    desc: "First, you need to go through our security and identification documents and then you can deposit funds into your account using a variety of different methods including bank transfer, bitcoin & many more.",
  },
  {
    title: "How can I withdraw money?",
    desc: "To do so you need to fill our security and identification documents and select the amount you wish to withdraw.",
  },
  {
    title: "What is spread?",
    desc: "Spread is a difference between the bid and ask price of the base currency.",
  },
  {
    title: "Is there any minimum trading investment volume?",
    desc: "You can trade with as low as few dollars using our micro-accounts",
  },
  {
    title: "How to manage my risk?",
    desc: "The limit orders and the stop-loss orders are the most common risk management tools in Forex Trading Investment. A limit order helps to restrict the minimum price to be received or a maximum price to be paid. Stop-loss orders are used to set a position to be involuntarily liquidated at a present price to limit possible losses that the market should move against an investor’s position.",
  },
];
