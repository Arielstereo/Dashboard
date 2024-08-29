"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useBalanceStore from "@/store/BalanceStore";
import SkeletonLoading from "./SkeletonLoading";

const Chart = ({ isLoading }) => {
  const total = useBalanceStore((state) => state.totalBalance);
  const incomes = useBalanceStore((state) => state.incomes);
  const expenses = useBalanceStore((state) => state.expenses);
  const chartData = [
    { operation: "incomes", quantity: incomes, fill: "var(--color-incomes)" },
    {
      operation: "expenses",
      quantity: expenses,
      fill: "var(--color-expenses)",
    },
  ];

  const chartConfig = {
    coin: {
      label: "pesos",
    },
    incomes: {
      label: "incomes",
      color: "#12D853",
    },
    expenses: {
      label: "expenses",
      color: "#DF0000",
    },
  };


  return (
    <>
      {isLoading ? (
        <SkeletonLoading className= "h-[425px] w-[400px] rounded-xl" />
      ) : (
        <Card className="flex flex-col h-full">
          <CardHeader className="items-center pb-0">
            <CardTitle>Total Balance</CardTitle>
            <CardDescription>Up to date</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  className="w-[150px]"
                />
                <Pie
                  data={chartData}
                  dataKey="quantity"
                  nameKey="operation"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              K{total.toLocaleString().slice(total.length, 4)}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              PESOS{" "}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Total transactions for the year <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Income and expenses
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Chart;
