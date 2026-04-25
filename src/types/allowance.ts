type AllowanceType = "medical" | "gym" | "meals" | "transport";

type Transaction = {
  date: string;
  merchant: string;
  amount: number;
};

interface Allowance {
  id: string;
  name: string;
  icon: string;
  color: string;
  remaining: number;
  limit: number;
  used: number;
  progress: number;
  status: string;
  transactions: Transaction[];
}

interface AllowanceDetails {
  user_tenant_id: string;
  policy_group_id: string;
  policy_group_name: string;
  policy_group_description: string;
  policy_group_status: string;
  max_limit: number;
  consumed_amount: number;
  remaining_amount: number;
  transactions: [
    {
      payment_id: string;
      merchant_id: string;
      raw_vendor_name: string;
      amount: number;
      currency: string;
      payment_status: string;
      control_plane_payment_intent_id: string;
      created_at: string;
    },
  ];
}

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
export { spendingCategories };
export type { Allowance, AllowanceDetails, AllowanceType, Transaction };

