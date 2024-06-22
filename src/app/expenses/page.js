"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import Expense from "@/components/Expenses/Expense";
import Sidenav from "@/components/Sidenav";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const openNav = () => {
    setOpen(!open);
    console.log("opened");
  };
  return (
    <div className="flex w-[100%] fixed  h-[100vh]">
      <div
        className={`w-[330px] border-zinc-300 border-r md:block ${
          open ? "block" : "hidden"
        } md:static absolute z-2`}
      >
        <Sidenav name={"expenses"} openNav={openNav} />
      </div>
      <div className="w-full">
        <Expense openNav={openNav} />
      </div>
    </div>
  );
}