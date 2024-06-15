"use client";
import { RiMenu2Line } from "react-icons/ri";
import NumberCards from "./NumberCards";
import Analysis from "./Analysis";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Dashboard = ({ openNav }) => {
  const { user } = useUser();
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
        <div className="p-6">
          <div>
            <h1 className="md:text-4xl text-2xl font-extrabold ">Hi, {user?.fullName} ✌️</h1>
            <p className="text-zinc-500">
              Here&apos;s what happenning with your money, Lets Manage your expense
            </p>
          </div>

          <div>
            <NumberCards />
          </div>

          <div>
            <Analysis />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
