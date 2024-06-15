"use client"
import Budgets from "@/components/Budgets/Budgets";
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
          className={`md:w-[300px] border-zinc-300 border-r md:block ${
            open ? "block" : "hidden"
          } md:static absolute z-2`}
        >
          <Sidenav name={"budgets"} openNav={openNav} />
        </div>
        <div className="w-full">
          <Budgets openNav={openNav} />
        </div>
      </div>
    );
  }