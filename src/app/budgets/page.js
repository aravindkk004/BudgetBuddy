"use client";
import Budgets from "@/components/Budgets/Budgets";
import Sidenav from "@/components/Sidenav";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function Home() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [emojiIcon, setEmojiIcon] = useState("😁");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        setBudgets(userBudget.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setBudgetLoading(false);
      }
    };
    fetching();
  }, [user]);

  const openNav = () => {
    setOpen(!open);
    console.log(user);
  };

  const openFormClick = () => {
    setOpenForm(!openForm);
  };

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/budget/newbudget", {
        emoji: emojiIcon,
        budgetName: name,
        budgetAmount: amount,
        clerkId: user.id,
      });

      if (res.status !== 200) {
        setError(res.data.error);
      } else {
        setOpenForm(!openForm);
        const newBudget = {
          emoji: emojiIcon,
          expenseName: name,
          expenseTotalAmount: amount,
        };
        setBudgets((prevBudgets) => [newBudget, ...prevBudgets]);
        toast.success("Added successfully")
      }
    } catch (error) {
      console.error("Axios error:", error);
      setError(error.response ? error.response.data.error : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`flex w-[100%] fixed h-[100vh] ${
          openForm ? "opacity-30" : "opacity-100"
        }`}
        onClick={() => openForm && setOpenForm(!openForm)}
      >
        <div
          className={`w-[330px] border-zinc-300 border-r md:block ${
            open ? "block" : "hidden"
          } md:static absolute z-2`}
        >
          <Sidenav name={"budgets"} openNav={openNav} />
        </div>
        <div className="w-full">
          <Budgets
            openNav={openNav}
            openFormClick={openFormClick}
            budgets={budgets}
            budgetLoading={budgetLoading}
          />
        </div>
      </div>

      {openForm && (
        <div className="transform  bg-white p-6 rounded-lg shadow-lg z-50 fixed left-[50%] top-[50%]  grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background  duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <IoClose
            className="absolute right-5 top-5 cursor-pointer"
            size={20}
            onClick={openFormClick}
          />
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Create New Budget
            </h2>
            <div>
              <div className="mt-5 mb-2">
                <button
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  className="border border-black text-3xl p-2 rounded-lg cursor-pointer"
                >
                  {emojiIcon}
                </button>
                <div className="mt-5 absolute">
                  {openEmojiPicker && (
                    <EmojiPicker
                      open={openEmojiPicker}
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <input
                    type="text"
                    placeholder="Car"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <input
                    type="text"
                    placeholder="20000"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              className="bg-[#4845d2] text-white w-full h-[40px] rounded-md"
              disabled={loading}
              onClick={handleBudgetSubmit}
            >
              {loading ? "Adding..." : "Add Budget"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
