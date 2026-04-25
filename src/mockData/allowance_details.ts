import { Allowance, AllowanceType } from "@/types/allowance";

const allowanceData: Record<AllowanceType, Allowance> = {
  medical: {
    id: "medical",
    name: "Medical",
    icon: "🏥",
    color: "red",
    remaining: 450,
    limit: 600,
    used: 150,
    progress: 75,
    status: "Active",
    transactions: [
      { date: "16 Apr 2026", merchant: "AirAsia", amount: 450 },
      { date: "14 Apr 2026", merchant: "Agoda - Hotel Stay", amount: 550 },
      { date: "12 Apr 2026", merchant: "KLIA Express", amount: 55 },
      { date: "09 Apr 2026", merchant: "Travel Insurance", amount: 95 },
    ],
  },
  gym: {
    id: "gym",
    name: "Gym / Wellness",
    icon: "💪",
    color: "green",
    remaining: 180,
    limit: 300,
    used: 120,
    progress: 60,
    status: "Active",
    transactions: [
      { date: "10 Apr 2026", merchant: "Fitness First", amount: 85 },
      { date: "03 Apr 2026", merchant: "Yoga Studio KL", amount: 35 },
    ],
  },
  meals: {
    id: "meals",
    name: "Meals",
    icon: "🍽️",
    color: "orange",
    remaining: 220,
    limit: 500,
    used: 280,
    progress: 44,
    status: "Active",
    transactions: [
      { date: "16 Apr 2026", merchant: "Starbucks", amount: 18.5 },
      { date: "15 Apr 2026", merchant: "Nasi Kandar Pelita", amount: 22 },
      { date: "14 Apr 2026", merchant: "Secret Recipe", amount: 35.8 },
      { date: "13 Apr 2026", merchant: "McDonald's", amount: 15.9 },
      { date: "12 Apr 2026", merchant: "Subway", amount: 19.5 },
    ],
  },
  transport: {
    id: "transport",
    name: "Travel",
    icon: "✈️",
    color: "blue",
    remaining: 850,
    limit: 2000,
    used: 1150,
    progress: 42,
    status: "Active",
    transactions: [
      { date: "16 Apr 2026", merchant: "AirAsia", amount: 450 },
      { date: "14 Apr 2026", merchant: "Agoda - Hotel Stay", amount: 550 },
      { date: "12 Apr 2026", merchant: "KLIA Express", amount: 55 },
      { date: "09 Apr 2026", merchant: "Travel Insurance", amount: 95 },
    ],
  },
};

export default allowanceData;
