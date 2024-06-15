import React from "react";
import BudgetCard from "./BudgetCard";

const LatestBudget = () => {
  return (
    <>
      <div className="grid gap-5">
        <h2 className="font-bold text-lg">Latest Budgets</h2>
        <div>
          <BudgetCard />
        </div>
      </div>
    </>
  );
};

export default LatestBudget;
