import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="bg-[#f9fafb] h-[100vh] flex flex-col items-center justify-center text-center px-4 pb-[150px]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          Manage Your Expense
        </h1>
        <h1 className="text-[#4845d2] text-3xl sm:text-4xl md:text-5xl mt-2 font-extrabold">
          Control Your Money
        </h1>
        <p className="mt-4 text-base sm:text-lg">
          Start creating your budget and save tons of money
        </p>
        <button className="bg-[#4845d2] text-white py-3 px-6 sm:px-8 rounded-md mt-7">
          <Link href="/sign-in">Get Started</Link>
        </button>
      </div>
    </>
  );
};

export default Hero;
