import { RiMenu2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import BudgetCard from "../Dashboard/BudgetCard";
import Expenses from "../Dashboard/Expenses";
import AddExpense from "./AddExpense";
import Link from "next/link";

const MyExpense = ({ openNav, openFormClick }) => {
  return (
    <>
      <div className="overflow-y-scroll h-[100vh]">
        <div className={`relative p-[20px] border-zinc-300 border-b h-[80px]`}>
          <div className="md:hidden block absolute left-5 h-[40px] mt-2">
            <RiMenu2Line size={30} onClick={openNav} />
          </div>
          <p className="h-[40px] w-[40px] rounded-full bg-zinc-300 absolute right-5"></p>
        </div>
        <div className="p-10">
          <h2 class="text-2xl font-bold gap-2 flex justify-between items-center">
            <span className="flex gap-2 items-center">
              <Link href="/budgets"><FaArrowLeftLong className="mr-2" size={20} /></Link>
              My Expenses
            </span>
            <div className="flex gap-2 items-center">
              <div>
                <button
                  className="items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset bg-[#4845d2] text-white px-5 py-2 flex"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radid:rla:"
                  data-state="closed"
                  onClick={openFormClick}
                >
                  <FiEdit size={20} className="mr-2" />
                  Edit
                </button>
              </div>
              <button
                className="items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset bg-red-600 text-white px-5 py-2 flex"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radid:rla:"
                data-state="closed"
              >
                <MdDeleteOutline size={20} className="mr-2" />
                Delete
              </button>
            </div>
          </h2>

          <div className="grid grid-cols-1  md:grid-cols-2 mt-6 gap-5">
            <BudgetCard />
            <AddExpense />
          </div>

          <div className="mt-4">
            <Expenses />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyExpense;
