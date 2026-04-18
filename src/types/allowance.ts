type AllowanceType = "medical" | "gym" | "meals" | "transport";

type Transaction = {
    date: string;
    merchant: string;
    amount: number;
};

type Allowance = {
    id: string;
    name: string;
    icon: string;
    color: string;
    remaining: number;
    limit: number;
    used: number;
    progress: number;
    transactions: Transaction[];
    status: string;
};

const spendingCategories: Record<
  string,
  Array<{ emoji: string; name: string }>
> = {
  medical: [
    { emoji: "🏥", name: "Clinics" },
    { emoji: "💊", name: "Pharmacies" },
    { emoji: "🔬", name: "Labs" },
  ],
  gym: [
    { emoji: "🏋️", name: "Gyms" },
    { emoji: "🧘", name: "Yoga Studios" },
    { emoji: "💆", name: "Wellness" },
  ],
  meals: [
    { emoji: "🍔", name: "Restaurants" },
    { emoji: "☕", name: "Cafes" },
    { emoji: "🛒", name: "Food Markets" },
  ],
  transport: [
    { emoji: "⛽", name: "Fuel Stations" },
    { emoji: "🚕", name: "Ride Hailing" },
    { emoji: "🅿️", name: "Parking" },
  ],
};
export type { AllowanceType, Transaction, Allowance };
export { spendingCategories };
