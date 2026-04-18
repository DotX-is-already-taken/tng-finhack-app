const pools = [
  {
    id: "medical",
    icon: "🏥",
    name: "Medical Allowance",
    subtitle: "24 employees - RM 600/month each",
    allocated: "RM 14,400",
    used: "RM 3,600",
    remaining: "RM 10,800",
    bg: "#FDECEC",
    border: "#FBCACA",
  },
  {
    id: "gym",
    icon: "💪",
    name: "Gym / Wellness",
    subtitle: "24 employees - RM 300/month each",
    allocated: "RM 7,200",
    used: "RM 2,880",
    remaining: "RM 4,320",
    bg: "#ECFDF3",
    border: "#C5F2D8",
  },
  {
    id: "meals",
    icon: "🍽️",
    name: "Meals Allowance",
    subtitle: "24 employees - RM 500/month each",
    allocated: "RM 12,000",
    used: "RM 6,720",
    remaining: "RM 5,280",
    bg: "#FFF7E8",
    border: "#F9E0B0",
  },
];

const activities = [
  {
    id: "1",
    icon: "👥",
    text: "Added 3 new employees to Medical pool",
    time: "2 hours ago",
    bg: "#E8F5E9",
  },
  {
    id: "2",
    icon: "💰",
    text: "Topped up Meals pool with RM 5,000",
    time: "1 day ago",
    bg: "#E3F2FD",
  },
  {
    id: "3",
    icon: "⚠️",
    text: "Gym pool running low - RM 4,320 remaining",
    time: "2 days ago",
    bg: "#FFF3E0",
  },
];


export { pools, activities };