const AddExpense = ({
  handleAddExpense,
  loading,
  names,
  amounts,
  handleSetName,
  handleSetAmount,
}) => {
  return (
    <>
      <div className="border p-5 rounded-lg">
        <h2 className="font-bold text-lg">Add Expenses</h2>
        <div className="mt-2">
          <h2 className="text-black font-medium my-1">Expense Name</h2>
          <h2>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g. Bedroom Decor"
              value={names}
              onChange={(e) => handleSetName(e.target.value)}
            />
          </h2>
        </div>
        <div className="mt-2">
          <h2 className="text-black font-medium my-1">Expense Amount</h2>
          <h2>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g. 1000"
              value={amounts}
              onChange={(e) => handleSetAmount(e.target.value)}
            />
          </h2>
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  bg-[#4845d2] text-zinc-200 hover:bg-[#4845d2]/90 h-10 px-4 py-2 mt-3 w-full cursor-pointer"
          onClick={handleAddExpense}
        >
          {loading ? "Adding..." : "Add New Expense"}
        </button>
      </div>
    </>
  );
};

export default AddExpense;
