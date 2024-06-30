import { useEffect, useState } from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer  } from "recharts";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const Graph = () => {
  const [budgets, setBudgets] = useState([]);
  const [budgetLoading, setBudgetLoading] = useState(false);
  const { user } = useUser();

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

  return (
    <>
      <div className="border rounded-lg p-5">
        <h2 className="font-bold text-lg">Activity</h2>
        <div w="100%">
          {budgetLoading ? (
            <p>Loading...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={budgets}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expenseTotalAmount" stackId="a" fill="#4845d2" />
                <Bar dataKey="totalSpentAmount" stackId="a" fill="#c3c2ff" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default Graph;
