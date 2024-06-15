import { RiMenu2Line } from "react-icons/ri";
import Expenses from "../Dashboard/Expenses";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Expense = ({ openNav, openForm }) => {
  return (
    <>
      <div
        className={`${
          openForm ? "opacity-30" : "opacity-100"
        } overflow-y-scroll h-[100vh]`}
      >
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
          <h2 className="font-bold text-3xl">My Expenses</h2>
          <Expenses />
        </div>
      </div>
    </>
  );
};

export default Expense;
