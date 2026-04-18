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
      { date: "15 Apr 2026", merchant: "Guardian Pharmacy", amount: 45.5 },
      { date: "08 Apr 2026", merchant: "Klinik Kesihatan", amount: 60 },
      { date: "02 Apr 2026", merchant: "Watsons", amount: 44.5 },
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
    name: "Transport",
    icon: "🚗",
    color: "blue",
    remaining: 85,
    limit: 400,
    used: 315,
    progress: 21,
    status: "Low balance",
    transactions: [
      { date: "16 Apr 2026", merchant: "Petronas", amount: 60 },
      { date: "14 Apr 2026", merchant: "Grab", amount: 28.5 },
      { date: "12 Apr 2026", merchant: "Touch n Go RFID", amount: 12.8 },
      { date: "09 Apr 2026", merchant: "Petronas", amount: 55 },
    ],
  },
};

export default allowanceData;
