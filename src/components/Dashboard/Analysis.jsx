import Expenses from "./Expenses";
import Graph from "./Graph";
import LatestBudget from "./LatestBudget";

const Analysis = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <Graph />
          <Expenses />
        </div>
        <div>
            <LatestBudget />
        </div>
      </div>
    </>
  );
};

export default Analysis;
