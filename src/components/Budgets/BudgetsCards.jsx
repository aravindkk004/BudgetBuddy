import BudgetCard from "../Dashboard/BudgetCard";
import { useRouter } from "next/navigation";

const BudgetsCards = ({ openFormClick, budgets }) => {
  const router = useRouter();

  const handleBudgetClick = (budget) => {
    const { _id, expenseName, expenseTotalAmount, emoji, totalSpentAmount } = budget;
    console.log("from another", totalSpentAmount)
    router.push(
      `/expenses/${_id}?name=${expenseName}&amount=${expenseTotalAmount}&emoji=${emoji}&spentAmount=${totalSpentAmount}`
    );
  };

  return (
    <>
      <div className="mt-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            className="bg-slate-100 p-10 rounded-md text-center items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r0:"
            data-state="closed"
            onClick={openFormClick}
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
          {budgets.map((budget) => (
            <div key={budget._id} onClick={() => handleBudgetClick(budget)}>
              <BudgetCard
                items={budget.budgets?.length}
                key={budget.expenseName}
                name={budget.expenseName}
                amount={budget.expenseTotalAmount}
                emoji={budget.emoji}
                id={budget._id}
                spentAmount={budget.totalSpentAmount}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BudgetsCards;
