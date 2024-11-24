import Link from "next/link";
import React from "react";
import Image from "next/image";
import { AiOutlineDashboard, AiOutlineArrowRight } from "react-icons/ai";

const NavBar = () => {
  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 border-b border-zinc-500 w-full bg-white">
        <div className="flex items-center">
          <Image src="/buddy_logo.png" width={40} height={50} alt="logo" />
          <span className="hidden sm:block font-sans font-extrabold text-xl sm:text-2xl text-[#4845d2] ml-2">
            BudgetBuddy
          </span>
        </div>
        <div className="flex gap-3">
          <button className="border-zinc-400 border px-3 py-2 rounded-md flex items-center justify-center">
            <Link href="/dashboard">
              <AiOutlineDashboard className="text-xl sm:hidden" />
              <span className="hidden sm:block">Dashboard</span>
            </Link>
          </button>
          <button className="bg-[#4845d2] text-white p-3 rounded-md flex items-center justify-center">
            <Link href="/sign-in">
              <AiOutlineArrowRight className="text-xl sm:hidden" />
              <span className="hidden sm:block">Get Started</span>
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
