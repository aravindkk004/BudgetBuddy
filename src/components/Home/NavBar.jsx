import Link from "next/link";
import React from "react";
import Image from "next/image";

const NavBar = () => {
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-500 absolute w-full bg-white">
        <div>
        <h2 className="font-sans font-extrabold text-2xl text-[#4845d2] text-center  flex items-center">
          <Image src="/buddy_logo.png" width={50} height={60} />
          BudgetBuddy
        </h2>
        </div>
        <div className="flex gap-5">
          <button className="border-zinc-400 border px-3 py-2 rounded-md">
            <Link href="/dashboard">Dashboard</Link>
          </button>
          <button className="bg-[#4845d2] text-white p-3 rounded-md">
            <Link href="/sign-in">Get Started</Link>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
