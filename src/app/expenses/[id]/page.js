"use client";
import MyExpense from "@/components/Expenses/MyExpense";
import Sidenav from "@/components/Sidenav";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [emojiIcon, setEmojiIcon] = useState("😁");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [open, setOpen] = useState(false);

  const queries = useSearchParams();
  const params = useParams();
  const router = useRouter();
  // const {name, amount, emoji} = queries.get();
  const id = params.id

  const name = queries.get("name")
  const amount = queries.get("amount")
  console.log(amount)
  const emoji = queries.get("emoji")

  const [expenseDetails, setExpenseDetails] = useState({
    id: '',
    name: '',
    amount: '',
    emoji: '',
  });

  useEffect(() => {
      setExpenseDetails({
        id: id,
        name: name ,
        amount: amount ,
        emoji: emoji,
      });
    
  }, [ id, name, amount, emoji, emojiIcon]);

  const openNav = () => {
    setOpen(!open);
  };

  const [openForm, setOpenForm] = useState(false);
  const openFormClick = () => {
    console.log("clicked");
    setOpenForm(!openForm);
  };

  return (
    <>
      <div
        className={`flex w-full ${
          openForm ? "opacity-30" : "opacity-100"
        } fixed  h-[100vh]`}
        onClick={() => openForm && setOpenForm(!openForm)}
      >
        <div
          className={`w-[330px] border-zinc-300 border-r md:block ${
            open ? "block" : "hidden"
          } md:static absolute z-20`}
        >
          <Sidenav name={""} openNav={openNav} />
        </div>
        <div className="w-full">
          <MyExpense
            openNav={openNav}
            openFormClick={openFormClick}
            name={expenseDetails.name}
            amount={expenseDetails.amount}
            emoji={expenseDetails.emoji}
            id={expenseDetails.id}
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
              Update Budget
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
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <input
                    type="text"
                    placeholder="20000"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="bg-[#4845d2] text-white w-full h-[40px] rounded-md">
              Update Budget
            </button>
          </div>
        </div>
      )}
    </>
  );
}
