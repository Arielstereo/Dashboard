import { Card } from "@/components/ui/card";
import useBalanceStore from "@/store/BalanceStore";
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react";
import MotionNumber from "motion-number";
import SkeletonLoading from "./SkeletonLoading";

const CardBank = ({ isLoading }) => {
  const operations = useBalanceStore((state) => state.operations);

  const income = operations?.filter((operation) => operation.type === "income");
  const expense = operations?.filter(
    (operation) => operation.type === "expense"
  );
  const setIncomes = useBalanceStore((state) => state.setIncomes);
  const totalIncome = income?.reduce(
    (acc, operation) => acc + operation.amount,
    0
  );
  setIncomes(totalIncome);
  const totalExpense = expense?.reduce(
    (acc, operation) => acc + operation.amount,
    0
  );
  const setExpenses = useBalanceStore((state) => state.setExpenses);
  setExpenses(totalExpense);
  const totalBalance = totalIncome - totalExpense;
  const setTotal = useBalanceStore((state) => state.setTotalBalance);
  setTotal(totalBalance);
  const total = useBalanceStore((state) => state.totalBalance);
  const lastOperation = operations?.slice().reverse().slice(0, 4);

  return (
    <>
      {isLoading ? (
        <SkeletonLoading className="h-[425px] w-[650px] rounded-xl" />
      ) : (
        <Card className="p-6 bg-background shadow-sm">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col items-center gap-4">
              <div>
                <MotionNumber
                  className="text-4xl"
                  value={total}
                  format={{
                    notation: "standard",
                    style: "currency",
                    currency: "USD",
                  }}
                  locales="en-US"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <h3 className="text-muted-foreground">
                {operations?.length > 0
                  ? "Last operations"
                  : "You have no operations to date"}
              </h3>
              {lastOperation?.map((operation) => (
                <div className="flex items-center gap-4" key={operation._id}>
                  <div
                    className={
                      operation.type === "income"
                        ? "bg-green-500 p-3 rounded-full text-green-500-foreground"
                        : "bg-red-500 p-3 rounded-full text-green-500-foreground"
                    }
                  >
                    {operation.type === "income" ? (
                      <ArrowUpIcon className="h-6 w-6" />
                    ) : (
                      <ArrowDownIcon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <p className="text-muted-foreground">
                        {operation.description}
                      </p>
                      <p
                        className={
                          operation.type === "income"
                            ? "text-2xl font-semibold text-green-500"
                            : "text-2xl font-semibold text-red-500"
                        }
                      >
                        $ {operation.amount}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-muted-foreground text-sm">
                        {operation.date.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default CardBank;
