"use client";
import { RiMenu2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import BudgetCard from "../Dashboard/BudgetCard";
import Expenses from "../Dashboard/Expenses";
import AddExpense from "./AddExpense";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const MyExpense = ({ openNav, openFormClick, name, amount, emoji, id }) => {
  const [expenses, setExpenses] = useState([]);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [names, setName] = useState("");
  const [amounts, setAmount] = useState("");
  const { user } = useUser();

  const handleSetName = (names) => {
    setName(names);
  };
  const handleSetAmount = (amount) => {
    setAmount(amount);
  };

  useEffect(() => {
    const fetching = async () => {
      setExpenseLoading(true);
      try {
        const res = await axios.get(`/api/expense/getallexpense/${id}`);
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }
        const { expenses } = res.data;
        setExpenses(expenses.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setExpenseLoading(false);
      }
    };
    if (id) {
      fetching();
    }
  }, [id]);

  const handleAddExpense = async () => {
    setAddLoading(true);
    try {
      const res = await axios.post("/api/expense/addExpense", {
        expenseName: names,
        expenseAmount: amounts,
        expenseid: id,
        names: names,
        userId: user.id,
      });
      if (res.status !== 200) {
        console.log(res.error);
      } else {
        const newExpense = {
          budgetName: names,
          budgetAmount: amounts,
          createdAt: new Date().toISOString(),
        };
        setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
      }

      setName("");
      setAmount("");
    } catch (error) {
      console.log(error);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <div className="overflow-y-scroll h-[100vh]">
        <div className={`relative p-[20px] border-zinc-300 border-b h-[80px]`}>
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
          <h2 class="text-2xl font-bold gap-2 flex justify-between items-center">
            <span className="flex gap-2 items-center md:text-2xl text-lg">
              <Link href="/budgets">
                <FaArrowLeftLong className="mr-2" size={20} />
              </Link>
              My Expenses
            </span>
            <div className="flex gap-2 items-center">
              <div>
                <button
                  className="items-center justify-center whitespace-nowrap rounded-md md:text-lg text-sm font-medium ring-offset bg-[#4845d2] text-white px-5 py-2 flex"
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
                className="items-center justify-center whitespace-nowrap rounded-md md:text-lg text-sm font-medium ring-offset bg-red-600 text-white px-5 py-2 flex"
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
            <BudgetCard name={name} amount={amount} emoji={emoji} id={id} />
            <AddExpense
              handleAddExpense={handleAddExpense}
              loading={addLoading}
              handleSetAmount={handleSetAmount}
              handleSetName={handleSetName}
              names={names}
              amounts={amounts}
            />
          </div>

          <div className="mt-4">
            <Expenses expenses={expenses} loading={expenseLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyExpense;
