"use client";
import { RiMenu2Line } from "react-icons/ri";
import BudgetsCards from "./BudgetsCards";
import { SignedIn, UserButton } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const Budgets = ({ openNav, openFormClick, budgets, budgetLoading }) => {
  

  return (
    <>
      <div className="overflow-y-scroll h-[100vh]">
        <div className="relative p-[20px] border-zinc-300 border-b h-[80px]">
          <div className="md:hidden block absolute left-5 h-[40px] mt-2">
            <RiMenu2Line size={30} onClick={openNav} />
          </div>
          <div className="absolute right-8">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="p-10">
          <h2 className="font-bold text-3xl">My Budgets</h2>
          {budgetLoading ? (
            <div>Loading...</div>
          ) : (
            <BudgetsCards openFormClick={openFormClick} budgets={budgets} />
          )}
        </div>
      </div>
    </>
  );
};

export default Budgets;
