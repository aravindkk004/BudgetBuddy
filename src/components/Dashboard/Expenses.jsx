import { MdDelete } from "react-icons/md";

const Expenses = ({ expenses, loading }) => {
  return (
    <>
      <div className="mt-3">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <div className="grid grid-cols-4 bg-slate-200 p-2 mt-3">
          <h2 className="font-bold">Name</h2>
          <h2 className="font-bold">Amount</h2>
          <h2 className="font-bold">Date</h2>
          <h2 className="font-bold">Action</h2>
        </div>
        {loading ? (<p>Loading...</p>): 
        expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <div key={index} className="grid grid-cols-4 bg-slate-50 p-2">
              <h2>{expense.budgetName}</h2>
              <h2>{expense.budgetAmount}</h2>
              <h2>{new Date(expense.createdAt).toLocaleDateString()}</h2>
              <h2 className="cursor-pointer">
                <MdDelete className="text-red-600" size={30} />
              </h2>
            </div>
          ))
        ) : (
          <p className="mt-2">No expenses found.</p>
        )}
      </div>
    </>
  );
};

export default Expenses;
