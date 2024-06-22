import React from "react";

const BudgetCard = ({name, amount, emoji, items}) => {
  return (
    <>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">{emoji}</h2>
            <div>
              <h2 className="font-bold">{name}</h2>
              <h2 className="text-sm text-gray-500">{items} Item</h2>
            </div>
          </div>
          <h2 className="font-bold text-[#4848d2] text-lg">${amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">$2000 spend</h2>
            <h2 className="text-xs text-slate-400">$18000 Remaining</h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div className="bg-[#4548d2] h-2 rounded-full w-[10%]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetCard;
