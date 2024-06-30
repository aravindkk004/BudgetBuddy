import { useEffect, useState } from "react";
import Expenses from "./Expenses";
import Graph from "./Graph";
import LatestBudget from "./LatestBudget";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const Analysis = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/expense/${user?.id}`);
        if (res.status !== 200) {
          console.log(res.data.error);
        }
        const { budgetDetails } = await res.data;
        const sortedBudgets = budgetDetails.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setExpenses(sortedBudgets);
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
          setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense._id !== expenseId)
          );
        }
      } catch (error) {
        console.log("Deletion canceled.");
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <Graph budgets={expenses} />
          <Expenses
            expenses={expenses}
            loading={loading}
            handleExpenseDelete={handleExpenseDelete}
          />
        </div>
        <div>
          <LatestBudget />
        </div>
      </div>
    </>
  );
};

export default Analysis;
