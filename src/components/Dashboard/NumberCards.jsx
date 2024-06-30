import { MdOutlineSavings } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const NumberCards = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/dashboard/${user?.id}`);
        if (res.status !== 200) {
          console.log(res.data.error);
        }
        const { totalExpenseAmount, totalSpentAmount, totalExpenses } =
          await res.data;
        setTotalBudget(totalExpenseAmount);
        setTotalSpent(totalSpentAmount);
        setBudget(totalExpenses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [user]);

  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {loading ? (<p>Loading...</p>):(
        <div className="p-7 border rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm">Total Budget</p>
            <h2 className="text-2xl font-bold">${totalBudget}</h2>
          </div>
          <div className="h-[50px] w-[50px] bg-[#4845d2] rounded-full flex items-center justify-center">
            <MdOutlineSavings className="text-white" size={30} />
          </div>
        </div>
      )}

      {loading ? (<p>Loading...</p>): (
        <div className="p-7 border rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm">Total spent</p>
            <h2 className="text-2xl font-bold">${totalSpent}</h2>
          </div>
          <div className="h-[50px] w-[50px] bg-[#4845d2] rounded-full flex items-center justify-center">
            <FaMoneyCheckAlt className="text-white" size={30} />
          </div>
        </div>
      )}

      {loading ? (<p>Loading...</p>): (
        <div className="p-7 border rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm">No. of Budget</p>
            <h2 className="text-2xl font-bold">{budget}</h2>
          </div>
          <div className="h-[50px] w-[50px] bg-[#4845d2] rounded-full flex items-center justify-center">
            <LuWallet className="text-white" size={30} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberCards;
