import BudgetCard from "../Dashboard/BudgetCard";

const BudgetsCards = () => {
  return (
    <>
      <div className="mt-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            className="bg-slate-100 p-10 rounded-md text-center items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md"
            type="button"
            aria-hashpopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r0:"
            data-state="closed"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>

          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
        </div>
      </div>
    </>
  );
};

export default BudgetsCards;
