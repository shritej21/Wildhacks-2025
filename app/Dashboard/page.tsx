"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";
import { AiSuggestions } from "../components/AiSuggestions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Expense, Insight } from "../lib/types";
import { mockExpenses } from "../lib/mockData";
import { analyzeExpensesWithGemini } from "../lib/geminiApi";

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  const handleAddExpense = (data: any) => {
    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      amount: data.amount,
      category: data.category,
      date: data.date.toISOString(),
      description: data.description || "",
    };

    setExpenses([newExpense, ...expenses]);
  };

  const handleGenerateInsights = async () => {
    setIsGeneratingInsights(true);
    try {
      const newInsights = await analyzeExpensesWithGemini(expenses);
      setInsights(newInsights);
    } catch (error) {
      console.error("Error generating insights:", error);
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  const totalSpending = expenses.reduce((total, expense) => {
    const expenseDate = new Date(expense.date);
    const currentDate = new Date();
    if (
      expenseDate.getMonth() === currentDate.getMonth() &&
      expenseDate.getFullYear() === currentDate.getFullYear()
    ) {
      return total + parseFloat(expense.amount);
    }
    return total;
  }, 0);

  return (
    <div className="min-h-screen bg-background px-8 py-1 bg-gradient-to-r from-blue-150/75 to-blue-300/50">
      <Header />

      <div className="py-6 leading-none tracking-tight">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <Card className="md:col-span-3 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl">
                Welcome to Budget Whisperer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xl text-[#827b7b]">
                Track your expenses, analyze spending patterns, and get
                AI-powered insights to improve your financial habits.
              </p>
            </CardContent>
          </Card>

          <div className="md:col-span-1 space-y-1">
            <ExpenseList expenses={expenses} />
          </div>

          <div className="md:col-span-2 space-y-8">
            <AiSuggestions
              loading={isGeneratingInsights}
              insights={insights}
              onGenerateInsights={handleGenerateInsights}
            />
            <ExpenseForm onSubmit={handleAddExpense} />
          </div>

          {/* This Month Card */}
          <Card className="border-none shadow-none">
            <CardHeader className="pb-2">
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-budget-primary">
                ${totalSpending.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">Total Spending</p>
            </CardContent>
          </Card>

          {/* Expenses Card */}
          <Card className="border-none shadow-none">
            <CardHeader className="pb-2">
              <CardTitle>Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-budget-secondary">
                {expenses.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Entries</p>
            </CardContent>
          </Card>

          {/* Insights Card */}
          <Card className="border-none shadow-none">
            <CardHeader className="pb-2">
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-budget-accent">
                {insights.length}
              </div>
              <p className="text-sm text-muted-foreground">
                AI Recommendations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

