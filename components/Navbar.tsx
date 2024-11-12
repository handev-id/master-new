"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = ({ session }: { session: any }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="absolute top-0 w-full">
      <nav className="bg-gray-900 py-5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="#" className="flex items-center">
            <img
              src="/logo.png"
              className="mr-3 max-lg:hidden h-16"
              alt="Landwind Logo"
            />
            <span className="text-xl max-lg:ml-5 font-semibold whitespace-nowrap text-white">
              PENTAHEX
            </span>
          </a>
          <div className="lg:flex hidden items-center lg:order-2">
            <Link href={session?.name ? "/dashboard" : "/login"}>
              <button className="text-white ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800">
                Log in
              </button>
            </Link>
            <Link href={session?.name ? "/dashboard" : "/register"}>
              <button className="text-white hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 bg-blue-600 focus:outline-none focus:ring-blue-800">
                Register
              </button>
            </Link>
          </div>
          <div className="flex items-center justify-between w-full lg:hidden">
            <img src="/logo.png" className="mr-3 h-16" alt="Landwind Logo" />
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                type="button"
                className="inline-flex items-center p-2 ml-auto mt-2 text-sm text-white rounded-lg lg:hidden  focus:outline-none focus:ring-2 bg-gray-700 focus:ring-gray-600"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <div
                className={
                  showMenu
                    ? "absolute top-16 right-0 bg-white duration-300 h-[340px] overflow-hidden w-[200px] p-3 rounded-lg shadow-xl"
                    : "absolute top-16 right-0 bg-white w-[200px] h-[0px] overflow-hidden duration-300 rounded-lg shadow-xl"
                }
              >
                <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <a
                      id="home"
                      href="#home"
                      className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-gray-900"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-gray-900"
                      aria-current="page"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#why"
                      className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-gray-900"
                      aria-current="page"
                    >
                      Why Choose us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how"
                      className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-gray-900"
                      aria-current="page"
                    >
                      How To Do
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-gray-900"
                      aria-current="page"
                    >
                      FaQ
                    </a>
                  </li>
                  <div className="flex flex-col gap-3 mt-5">
                    <a
                      href="/login"
                      className="text-gray-900 ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 hover:bg-gray-200 focus:outline-none focus:ring-gray-200"
                    >
                      Log in
                    </a>
                    <a
                      href="/register"
                      className="text-white hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 bg-blue-600 focus:outline-none focus:ring-blue-800"
                    >
                      Register
                    </a>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  id="home"
                  href="#home"
                  className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-white"
                  aria-current="page"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#why"
                  className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-white"
                  aria-current="page"
                >
                  Why Choose us
                </a>
              </li>
              <li>
                <a
                  href="#how"
                  className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-white"
                  aria-current="page"
                >
                  How To Do
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 text-white"
                  aria-current="page"
                >
                  FaQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
