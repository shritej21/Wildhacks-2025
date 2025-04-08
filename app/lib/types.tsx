import {
  Coffee,
  Bike,
  Home,
  Heart,
  Music,
  ShoppingBag,
  GraduationCap,
  Plane,
  Scissors,
  HelpCircle,
  LucideIcon,
} from "lucide-react";

export interface Expense {
  id: string;
  amount: string;
  category: string;
  date: string;
  description: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: "insight" | "warning" | "improvement" | "trend";
}

export function getCategoryIcon(category: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    food: Coffee,
    transportation: Bike,
    housing: Home,
    healthcare: Heart,
    entertainment: Music,
    shopping: ShoppingBag,
    education: GraduationCap,
    travel: Plane,
    personal: Scissors,
    other: HelpCircle,
  };

  return iconMap[category] || HelpCircle;
}
