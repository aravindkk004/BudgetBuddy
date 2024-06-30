import { RiMenu2Line } from "react-icons/ri";
import Expenses from "../Dashboard/Expenses";
import { SignedIn, UserButton } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const Expense = ({ openNav, openForm }) => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        console.log("id is", user?.id);
        const res = await axios.get(`/api/expense/${user?.id}`);
        if (res.status !== 200) {
          console.log(res.data.error);
        }
        const { budgetDetails } = await res.data;
        const sortedBudgets = budgetDetails.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setBudgets(sortedBudgets);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [user]);

  const handleExpenseDelete = async (expenseId) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      try {
        const res = await axios.delete(
          `/api/dashboard/deleteExpense?userId=${user?.id}&expenseId=${expenseId}`
        );
        if (res.status === 200) {
          setBudgets((prevExpenses) =>
            prevExpenses.filter((expense) => expense._id !== expenseId)
          );
          toast.success("Successfully deleted")
        }
      } catch (error) {
        console.log("Deletion canceled.");
        toast.error("Error while deleting")
      }
    }
  };

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
          <Expenses
            expenses={budgets}
            loading={loading}
            handleExpenseDelete={handleExpenseDelete}
          />
        </div>
      </div>
    </>
  );
};

export default Expense;
