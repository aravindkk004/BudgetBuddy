import { MdDelete } from "react-icons/md";

const Expenses = () => {
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

        <div className="grid grid-cols-4 bg-slate-50 p-2">
          <h2>New Car</h2>
          <h2>2000</h2>
          <h2>13/06/2024</h2>
          <h2 className="cursor-pointer">
            <MdDelete className="text-red-600" size={30} />
          </h2>
        </div>
      </div>
    </>
  );
};

export default Expenses;
