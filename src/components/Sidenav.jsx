import { RxDashboard } from "react-icons/rx";
import { MdOutlineSavings } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Sidenav = ({ name, openNav }) => {
  const { user } = useUser();
  return (
    <>
      <nav className="h-[100vh] relative bg-white z-50 pt-2">
        <IoMdClose
          className="absolute right-3 top-5  md:hidden cursor-pointer"
          onClick={openNav}
          size={25}
        />
        <h2 className="font-sans font-extrabold text-2xl text-[#4845d2]  mt-3 flex items-center justify-center">
          <Image src="/buddy_logo.png" width={50} height={60} />
          BudgetBuddy
        </h2>
        <div className="p-4 mt-2">
          <Link href="/dashboard">
            <p
              className={`p-5 ${
                name == "dashboard"
                  ? "bg-[#dbeafe] text-[#4845d2]"
                  : "text-[#6b7280]"
              } rounded-md font-bold flex items-center mb-2 cursor-pointer`}
            >
              <RxDashboard className="mr-2" size={25} />
              Dashboard
            </p>
          </Link>
          <Link href="/budgets">
            <p
              className={`p-5 ${
                name == "budgets"
                  ? "bg-[#dbeafe] text-[#4845d2]"
                  : "text-[#6b7280]"
              } rounded-md font-bold flex items-center mb-2 cursor-pointer`}
            >
              <MdOutlineSavings className="mr-2" size={25} />
              Budgets
            </p>
          </Link>
          <Link href="/expenses">
            <p
              className={`p-5 ${
                name == "expenses"
                  ? "bg-[#dbeafe] text-[#4845d2]"
                  : "text-[#6b7280]"
              } rounded-md font-bold flex items-center mb-2 cursor-pointer`}
            >
              <FaMoneyCheckAlt className="mr-2" size={25} />
              Expenses
            </p>
          </Link>
        </div>
        <div className="absolute bottom-10 w-full px-4">
          <div className="p-4 flex items-center gap-3 rounded-md cursor-pointer">
            <SignedIn>
              <UserButton />
              <p className="font-bold">{user?.fullName}</p>
            </SignedIn>
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidenav;
