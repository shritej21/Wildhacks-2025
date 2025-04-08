import React from "react";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Expense, getCategoryIcon } from "../lib/types";
import { format } from "date-fns";
import { cn } from "../lib/utils";

interface ExpenseListProps {
  expenses: Expense[];
  className?: string;
}

export function ExpenseList({ expenses, className }: ExpenseListProps) {
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const dateString = format(new Date(expense.date), "yyyy-MM-dd");
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(expense);
    return acc;
  }, {} as Record<string, Expense[]>);

  const sortedDates = Object.keys(groupedExpenses).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-0">
        <h3 className="text-xl font-bold p-2 ">Recent Expenses</h3>

        {expenses.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No expenses yet. Add your first expense to get started!
          </div>
        ) : (
          <ScrollArea className="h-[760px]">
            {sortedDates.map((dateString) => (
              <div key={dateString} className="">
                <div className="bg-muted/30 px-4 py-2 top-0">
                  <span className="font-medium">
                    {format(new Date(dateString), "EEEE, MMMM d, yyyy")}
                  </span>
                </div>

                {groupedExpenses[dateString].map((expense) => {
                  const CategoryIcon = getCategoryIcon(expense.category);

                  return (
                    <div
                      key={expense.id}
                      className="px-4 py-3 flex items-center justify-between border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            getCategoryColor(expense.category)
                          )}
                        >
                          <CategoryIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {getCategoryLabel(expense.category)}
                          </div>
                          {expense.description && (
                            <div className="text-sm text-muted-foreground">
                              {expense.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="font-semibold">
                        ${parseFloat(expense.amount).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

function getCategoryLabel(category: string): string {
  const found = expenseCategories.find((c) => c.value === category);
  return found ? found.label : "Other";
}

function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    food: "bg-orange-500",
    transportation: "bg-blue-500",
    housing: "bg-indigo-500",
    healthcare: "bg-red-500",
    entertainment: "bg-purple-500",
    shopping: "bg-pink-500",
    education: "bg-yellow-500",
    travel: "bg-green-500",
    personal: "bg-teal-500",
    other: "bg-gray-500",
  };

  return colorMap[category] || "bg-gray-500";
}

const expenseCategories = [
  { value: "food", label: "Food & Dining" },
  { value: "transportation", label: "Transportation" },
  { value: "housing", label: "Housing & Utilities" },
  { value: "healthcare", label: "Healthcare" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "education", label: "Education" },
  { value: "travel", label: "Travel" },
  { value: "personal", label: "Personal Care" },
  { value: "other", label: "Other" },
];
