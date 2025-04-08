## About Finalyze
Finalyze is your AI-powered personal finance assistant designed to make budgeting less stressful and more insightful. By analyzing your income and expenses, it predicts your financial future and provides smart, actionable budgeting advice using the Gemini API. Whether you're trying to save more, spend smarter, or simply understand where your money is going, Finalyze helps you take control of your financial journey with clarity and confidence.

## Inspiration
Managing money is hard, especially when you're juggling subscriptions, rent, groceries, and spontaneous purchases. We wanted to build a tool that not only tracks spending but also thinks ahead. The idea was born from our own need to gain better visibility into our financial habits and make proactive decisions — powered by AI.

## What it does
Analyzes cash flow patterns from uploaded transaction data.
Predicts future balances using trends in spending and income.
Uses the Gemini API to generate personalized budgeting insights and suggestions.
Offers monthly financial health snapshots and spending breakdowns.
Empowers users to set spending goals and stay on track with adaptive insights.

## How we built it
Frontend built with Next.js and Typescript for an interactive and responsive UI.
Backend in Postgresql for storing user and processing transaction data and balance prediction.
Integrated the Gemini API for generating context-aware financial insights.
Used Auth.js and Prisma ORM for authentication and storage.

## Challenges we ran into
Making sure the AI-generated budget advice was both personalized and practical.
Handling various formats of transaction data and normalizing them for analysis.
Integrating the Gemini API efficiently while maintaining user privacy and data security.

## Accomplishments that we're proud of
Built a seamless experience from data upload to actionable insights.
Developed a fully functional MVP with real-time prediction and AI-driven feedback within a short timeframe.

##What we learn
Predictive modeling requires careful handling of edge cases and user-specific variability.

## What's next for Finalyze
Enhance the forecasting model with machine learning for better long-term accuracy.
