import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sparkles, RefreshCw, WifiOff, AlertTriangle } from "lucide-react";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { InsightCard } from "./InsightCard";

interface AiSuggestionsProps {
  loading: boolean;
  insights: Array<{
    id: string;
    title: string;
    description: string;
    type: "insight" | "warning" | "improvement" | "trend";
  }>;
  onGenerateInsights: () => void;
  className?: string;
}

export function AiSuggestions({
  loading,
  insights,
  onGenerateInsights,
  className,
}: AiSuggestionsProps) {
  const handleGenerateInsights = () => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        try {
          onGenerateInsights();
          setTimeout(resolve, 1000);
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Analyzing your spending patterns...",
        success: "AI analysis complete!",
        error: "Failed to generate insights. Please try again.",
      }
    );
  };

  const hasError = insights.some(
    (insight) =>
      insight.title.includes("Error") ||
      insight.title.includes("Failed") ||
      insight.title.includes("Connection Issue")
  );

  return (
    <Card className={cn("border-none shadow-2xl", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-12 space-y-0">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-budget-accent" />
          <span>AI-Powered Insights</span>
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateInsights}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Analyzing</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>{hasError ? "Try Again" : "Generate Insights"}</span>
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <Sparkles className="h-12 w-12 mb-3 text-muted-foreground/60" />
            <h3 className="text-lg font-medium mb-1">No insights yet</h3>
            <p className="mb-4">
              Click the "Generate Insights" button to get AI-powered suggestions
              based on your spending patterns.
            </p>
          </div>
        ) : hasError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <WifiOff className="h-12 w-12 mb-3 text-muted-foreground/60" />
            <h3 className="text-lg font-medium mb-1">{insights[0].title}</h3>
            <p className="mb-4 text-muted-foreground">
              {insights[0].description}
            </p>
            <div className="text-sm text-muted-foreground mt-4 border border-muted p-4 rounded-md bg-muted/30">
              <h4 className="flex items-center gap-2 font-medium mb-2">
                <AlertTriangle className="h-4 w-4" />
                Troubleshooting Tips
              </h4>
              <ul className="list-disc list-inside text-left space-y-1">
                <li>Check your internet connection</li>
                <li>Verify that the API key is correct</li>
                <li>The Gemini API service may be experiencing issues</li>
                <li>Try again in a few minutes</li>
              </ul>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {insights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
