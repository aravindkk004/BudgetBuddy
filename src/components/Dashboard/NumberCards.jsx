import { MdOutlineSavings } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { FaMoneyCheckAlt } from "react-icons/fa";

const NumberCards = () => {
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm">Total Budget</p>
          <h2 className="text-2xl font-bold">$20000</h2>
        </div>
        <div className="h-[50px] w-[50px] bg-[#4845d2] rounded-full flex items-center justify-center">
          <MdOutlineSavings className="text-white" size={30} />
        </div>
      </div>

      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm">Total spent</p>
          <h2 className="text-2xl font-bold">$200</h2>
        </div>
        <div className="h-[50px] w-[50px] bg-[#4845d2] rounded-full flex items-center justify-center">
          <FaMoneyCheckAlt className="text-white" size={30} />
        </div>
      </div>

      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm">No. of Budget</p>
          <h2 className="text-2xl font-bold">2</h2>
        </div>
        <div className="h-[50px] w-[50px] bg-[#4845d2] rounded-full flex items-center justify-center">
          <LuWallet  className="text-white" size={30} />
        </div>
      </div>
    </div>
  );
};

export default NumberCards;
