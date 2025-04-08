import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { cn } from '../lib/utils';
import { Sparkles, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  type: 'insight' | 'warning' | 'improvement' | 'trend';
  className?: string;
}

export function InsightCard({ title, description, type, className }: InsightCardProps) {
  const icons = {
    insight: <Sparkles className="h-5 w-5 text-purple-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-orange-500" />,
    improvement: <TrendingUp className="h-5 w-5 text-green-500" />,
    trend: <TrendingDown className="h-5 w-5 text-blue-500" />,
  };

  const styles = {
    insight: "border-l-4 border-purple-500",
    warning: "border-l-4 border-orange-500",
    improvement: "border-l-4 border-green-500",
    trend: "border-l-4 border-blue-500",
  };

  return (
    <Card className={cn("shadow-sm", styles[type], className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icons[type]}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-foreground/80 whitespace-pre-line">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
