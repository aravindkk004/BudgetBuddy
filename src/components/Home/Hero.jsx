import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="bg-[#f9fafb] h-[100vh] flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold">Managae Your Expense</h1>
        <h1 className="text-[#4845d2] text-5xl mt-2 font-extrabold">Control Your Money</h1>
        <p className="mt-4 text-lg">Start Creating your budget and save ton of money</p>
        <button className="bg-[#4845d2] text-white py-3 px-8 rounded-md my-7">
          <Link href="/sign-in">Get Started</Link>
        </button>
      </div>
    </>
  );
};

export default Hero;
