import React, { useEffect, useState } from "react";
import BudgetCard from "./BudgetCard";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const LatestBudget = () => {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [budgetLoading, setBudgetLoading] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      setBudgetLoading(true);
      try {
        const res = await axios.get(`/api/budget/getbudgets/${user.id}`);
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }
        const { userBudget } = await res.data;
        const limitedBudgets = userBudget.slice(-3).reverse();
        setBudgets(limitedBudgets);
      } catch (error) {
        console.log(error);
      } finally {
        setBudgetLoading(false);
      }
    };
    fetching();
  }, [user]);

  return (
    <>
      <div className="grid gap-5">
        <h2 className="font-bold text-lg">Latest Budgets</h2>
        <div>
          {budgetLoading ? (
            <p>Loading...</p>
          ) : (
            budgets.map((budget, index) => (
              <BudgetCard
                key={budget.expenseName}
                name={budget.expenseName}
                amount={budget.expenseTotalAmount}
                emoji={budget.emoji}
                items={budget.items}
                spentAmount={budget.totalSpentAmount}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LatestBudget;
